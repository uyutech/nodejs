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
        'describe',
        'price',
        'discount',
        'state',
        'amount'
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
   * 获取商品详情
   * @param id:int 商品id列表
   * @returns Array<int>
   */
  async product(id) {
    if(!id) {
      return;
    }
    const { app } = this;
    let cacheKey = 'product_' + id;
    let res = await app.redis.get(cacheKey);
    if(res) {
      return JSON.parse(res);
    }
    res = await app.model.product.findOne({
      attributes: [
        'id',
        'name',
        'cover',
        'describe',
        'price',
        'discount',
        ['is_delete', 'isDelete'],
        'state',
        'amount'
      ],
      where: {
        id,
      },
      raw: true,
    });
    app.redis.setex(cacheKey, app.config.redis.time, JSON.stringify(res));
    return res;
  }

  /**
   * 获取商品列表详情
   * @param idList:Array<int> 商品id列表
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
          'describe',
          'price',
          'discount',
          ['is_delete', 'isDelete'],
          'state',
          'amount'
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
   * 清除商品缓存
   * @param id:int 商品id
   * @returns void
   */
  async clearProductCache(id) {
    if(!id) {
      return;
    }
    const { app } = this;
    await app.redis.del('product_' + id);
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
   * 申请奖品发货
   * @param ids:Array<int> 奖品id
   * @param uid:int 用户id
   * @param addressId:int 地址id
   * @param message:String 留言说明
   * @returns boolean
   */
  async applyExpressList(ids, uid, addressId, message) {
    if(!ids || !Array.isArray(ids) || !ids.length || !uid || !addressId) {
      return {
        success: false,
      };
    }
    const { app } = this;
    let address = await app.model.userAddress.findOne({
      attributes: [
        'id',
        'name',
        'phone',
        'address'
      ],
      where: {
        user_id: uid,
        id: addressId,
      },
      raw: true,
    });
    if(!address) {
      return {
        success: false,
        message: '地址不匹配~',
      };
    }
    let res = await app.model.prize.findAll({
      attributes: [
        'id',
        ['user_id', 'userId'],
        ['product_id', 'productId'],
        'state'
      ],
      where: {
        id: ids,
      },
      raw: true,
    });
    for(let i = 0; i < res.length; i++) {
      if(res[i].state === 2) {
        return {
          success: false,
          message: '已申请过发货，无需重复申请~',
        };
      }
      if(res[i].userId !== uid) {
        return {
          success: false,
          message: '用户不匹配~',
        };
      }
    }
    let productIdList = res.map((item) => {
      return item.productId;
    });
    let transaction = await app.sequelizeCircling.transaction();
    let transactionMall = await app.sequelizeMall.transaction();
    try {
      let query = [
        app.model.prize.update({
          state: 2,
        }, {
          where: {
            id: ids,
            state: 1,
          },
          transaction: transactionMall,
        })
      ];
      query.push(
        app.model.user.decrement({
          free_post: 1,
        }, {
          where: {
            id: uid,
            free_post: {
              $gt: 0,
            },
          },
          transaction,
        })
      );
      productIdList.forEach((productId) => {
        query.push(
          app.model.express.create({
            user_id: uid,
            product_id: productId,
            name: address.name,
            phone: address.phone,
            address: address.address,
            message,
            state: 1,
          }, {
            raw: true,
            transaction: transactionMall,
          })
        );
      });
      let res2 = await Promise.all(query);
      let num = res2[0][0];
      let num2 = res2[1][0][1];
      if(num < ids.length || num2 !== 1) {
        await transaction.rollback();
        await transactionMall.rollback();
        return {
          success: false,
          message: '商品圈币数据已更新，请重试~',
        };
      }
      query = [];
      res.forEach((item, i) => {
        query.push(
          app.model.prizeExpressRelation.create({
            user_id: uid,
            prize_id: item.id,
            express_id: res2[i + 2].id,
          }, {
            raw: true,
            transaction: transactionMall,
          })
        );
      });
      await Promise.all(query);
      await transaction.commit();
      await transactionMall.commit();
      app.redis.del('prize_' + uid);
      app.redis.del('freePost_' + uid);
      app.redis.del('express_' + uid);
      return {
        success: true,
      };
    }
    catch(e) {
      await transaction.rollback();
      await transactionMall.rollback();
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
