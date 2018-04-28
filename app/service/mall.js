/**
 * Created by army8735 on 2018/4/17.
 */

'use strict';

const egg = require('egg');
const Sequelize = require('sequelize');
const squel = require('squel');

class Service extends egg.Service {
  async allProduct() {
    const { app } = this;
    let cacheKey = 'allProduct';
    let res = await app.redis.get(cacheKey);
    if(res) {
      return JSON.parse(res);
    }
    res = await app.model.product.findAll({
      attributes: [
        'id',
        'name',
        'cover',
        'price',
        'discount'
      ],
      where: {
        is_delete: false,
      },
      raw: true,
    });
    app.redis.setex(cacheKey, app.config.redis.time, JSON.stringify(res));
    return res;
  }

  /**
   * 获取商品列表详情
   * @param idList:int 商品id列表
   * @returns Array<int>
   */
  async productList(idList) {
    if(!idList) {
      return;
    }
    if(!idList.length) {
      return [];
    }
    const { app } = this;
    let cache = await Promise.all(
      idList.map((id) => {
        if(id !== null && id !== undefined) {
          return app.redis.get('product_' + id);
        }
      })
    );
    let noCacheIdList = [];
    let noCacheIdHash = {};
    let noCacheIndexList = [];
    cache.forEach((item, i) => {
      let id = idList[i];
      if(item) {
        cache[i] = JSON.parse(item);
        }
      else if(id !== null && id !== undefined) {
        if(!noCacheIdHash[id]) {
          noCacheIdHash[id] = true;
          noCacheIdList.push(id);
        }
        noCacheIndexList.push(i);
      }
    });
    if(noCacheIdList.length) {
      let res = await app.model.product.findAll({
        attributes: [
          'id',
          'name',
          'cover',
          'price',
          'discount',
          ['is_delete', 'isDelete']
        ],
        where: {
          id: noCacheIdList,
        },
        raw: true,
      });
      let hash = {};
      if(res.length) {
        res.forEach((item) => {
          let id = item.id;
          hash[id] = item;
        });
      }
      noCacheIndexList.forEach((i) => {
        let id = idList[i];
        let temp = hash[id] || null;
        cache[i] = temp;
        app.redis.setex('product_' + id, app.config.redis.time, JSON.stringify(temp));
      });
    }
    return cache;
  }

  /**
   * 新奖品
   * @param uid:int 用户id
   * @returns Array<Object>
   */
  async prize(uid) {
    const { app } = this;
    let cacheKey = 'prize_' + uid;
    let res = await app.redis.get(cacheKey);
    if(res) {
      res = JSON.parse(res);
    }
    else {
      res = await app.model.prize.findAll({
        attributes: [
          'id',
          ['product_id', 'productId']
        ],
        where: {
          user_id: uid,
          is_delete: false,
          state: 1,
        },
        raw: true,
      });
      app.redis.setex(cacheKey, app.config.redis.time, JSON.stringify(res));
    }
    let idList = res.map((item) => {
      return item.productId;
    });
    let productList = await this.productList(idList);
    res.forEach((item, i) => {
      item.product = productList[i];
    });
    return res;
  }

  /**
   * 申请奖品发货
   * @param id:int 奖品id
   * @param uid:int 用户id
   * @returns boolean
   */
  async applyExpress(id, uid) {
    if(!id || !uid) {
      return {
        success: false,
      };
    }
    const { app } = this;
    let [address, prize] = await Promise.all([
      app.model.userAddress.findOne({
        attributes: [
          'name',
          'phone',
          'address'
        ],
        where: {
          user_id: uid,
          is_default: true,
        },
        raw: true,
      }),
      app.model.prize.findOne({
        attributes: [
          ['product_id', 'productId'],
          'state'
        ],
        where: {
          id,
          user_id: uid,
        },
        raw: true,
      })
    ]);
    if(!address) {
      return {
        success: false,
        message: '请先填写收货地址',
      };
    }
    if(!prize) {
      return {
        success: false,
      };
    }
    if(prize.state === 2) {
      return {
        success: false,
        message: '已申请过，无需重复申请~',
      };
    }
    let transaction = await app.sequelizeMall.transaction();
    try {
      let [update, express] = await Promise.all([
        app.model.prize.update({
          state: 2,
        }, {
          where: {
            id,
            user_id: uid,
            state: 1,
          },
          transaction,
        }),
        app.model.express.create({
          user_id: uid,
          product_id: prize.productId,
          name: address.name,
          phone: address.phone,
          address: address.address,
          state: 1,
        }, {
          raw: true,
          transaction,
        })
      ]);
      if(!update.length || !update[0]) {
        await transaction.rollback();
        return {
          success: false,
        };
      }
      let res = await app.model.prizeExpressRelation.create({
        user_id: uid,
        prize_id: id,
        express_id: express.id,
      }, {
        raw: true,
        transaction,
      });
      await transaction.commit();
      app.redis.del('prize_' + uid);
      app.redis.del('express_' + uid);
      return {
        success: true,
        data: res,
      };
    }
    catch(e) {
      await transaction.rollback();
      return {
        success: false,
      };
    }
  }

  /**
   * 获取用户订单
   * @param uid:int 用户id
   * @returns Array<Object>
   */
  async express(uid) {
    if(!uid) {
      return;
    }
    const { app } = this;
    let cacheKey = 'express_' + uid;
    let res = await app.redis.get(cacheKey);
    if(res) {
      res = JSON.parse(res);
    }
    else {
      res = await app.model.express.findAll({
        attributes: [
          'id',
          'state',
          ['product_id', 'productId']
        ],
        where: {
          user_id: uid,
          is_delete: false,
        },
        raw: true,
      });
      app.redis.setex(cacheKey, app.config.redis.time, JSON.stringify(res));
    }
    let idList = res.map((item) => {
      return item.productId;
    });
    let productList = await this.productList(idList);
    res.forEach((item, i) => {
      item.product = productList[i];
    });
    return res;
  }

  /**
   * 申请取消发货
   * @param id:int 快递id
   * @param uid:int 用户id
   * @returns boolean
   */
  async cancelExpress(id, uid) {
    if(!id || !uid) {
      return {
        success: false,
      };
    }
    const { app } = this;
    let [express, prizeExpress] = await Promise.all([
      app.model.express.findOne({
        attributes: [
          'id',
          'state'
        ],
        where: {
          id,
          user_id: uid,
        },
        raw: true,
      }),
      app.model.prizeExpressRelation.findOne({
        attributes: [
          'id',
          ['prize_id', 'prizeId']
        ],
        where: {
          express_id: id,
        },
        raw: true,
      })
    ]);
    if(!express) {
      return {
        success: false,
      };
    }
    if(express.state !== 1) {
      return {
        success: false,
        message: '已发货，无法取消~',
      };
    }
    let transaction = await app.sequelizeMall.transaction();
    try {
      let [update] = await Promise.all([
        app.model.prize.update({
          state: 1,
        }, {
          where: {
            id: prizeExpress.prizeId,
            user_id: uid,
            state: 2,
          },
          transaction,
        }),
        app.model.express.destroy({
          where: {
            id,
          },
          transaction,
        }),
        app.model.prizeExpressRelation.destroy({
          where: {
            id: prizeExpress.id,
          },
          transaction,
        })
      ]);
      if(!update.length || !update[0]) {
        await transaction.rollback();
        return {
          success: false,
        };
      }
      await transaction.commit();
      app.redis.del('prize_' + uid);
      app.redis.del('express_' + uid);
      return {
        success: true,
      };
    }
    catch(e) {
      await transaction.rollback();
      return {
        success: false,
      };
    }
  }
}

module.exports = Service;
