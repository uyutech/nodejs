/**
 * Created by army8735 on 2018/4/16.
 */

'use strict';

const egg = require('egg');
const BigNumber = require('bignumber.js');

class Controller extends egg.Controller {
  async index() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let [user, product] = await Promise.all([
      service.user.info(uid),
      service.mall.allProduct()
    ]);
    ctx.body = ctx.helper.okJSON({
      user,
      product,
    });
  }

  async prize() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let [prize, address, defaultAddress, freePost] = await Promise.all([
      service.mall.prize(uid),
      service.user.address(uid),
      service.user.defaultAddress(uid),
      service.user.freePost(uid)
    ]);
    let o = address.length ? address[0] : null;
    for(let i = 0; i < address.length; i++) {
      if(address[i].id === defaultAddress) {
        o = address[i];
        break;
      }
    }
    ctx.body = ctx.helper.okJSON({
      prize,
      address: o,
      freePost,
    });
  }

  async applyExpress() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let id = parseInt(body.id);
    if(!id) {
      return;
    }
    let res = await service.mall.applyExpress(id, uid);
    if(res.success) {
      ctx.body = ctx.helper.okJSON(res);
    }
    else {
      ctx.body = ctx.helper.errorJSON(res.message);
    }
  }

  async applyExpressList() {
    const { app, ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let ids = body.ids;
    let addressId = parseInt(body.addressId);
    let message = body.message;
    let res = await service.mall.applyExpressList(ids, uid, addressId, message);
    if(res.success) {
      ctx.body = ctx.helper.okJSON(res);
    }
    else {
      ctx.body = ctx.helper.errorJSON(res.message);
    }
  }

  async express() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let res = await service.mall.express(uid);
    if(!res) {
      return;
    }
    ctx.body = ctx.helper.okJSON(res);
  }

  async cancelExpress() {
    const { ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let id = parseInt(body.id);
    if(!id) {
      return;
    }
    let res = await service.mall.cancelExpress(id, uid);
    if(res.success) {
      ctx.body = ctx.helper.okJSON(res);
    }
    else {
      ctx.body = ctx.helper.errorJSON(res.message);
    }
  }

  async exchange() {
    const { app, ctx, service } = this;
    let uid = ctx.session.uid;
    let body = ctx.request.body;
    let id = parseInt(body.id);
    if(!id) {
      return;
    }
    let [user, product] = await Promise.all([
      service.user.info(uid),
      service.mall.product(id)
    ]);
    if(!product || product.isDelete || !product.state) {
      return ctx.body = ctx.helper.errorJSON('产品已下架~');
    }
    if(product.amount <= 0) {
      return ctx.body = ctx.helper.errorJSON('产品暂无库存~');
    }
    let price = new BigNumber(product.price).times(product.discount).ceil().toNumber();
    if(user.coins <= price) {
      return ctx.body = ctx.helper.errorJSON('圈币不够哦~');
    }
    let [transaction, transactionMall] = await Promise.all([
      app.sequelizeCircling.transaction(),
      app.sequelizeMall.transaction()
    ]);
    try {
      let query = [
        app.model.user.decrement({
          coins: price,
        }, {
          where: {
            id: uid,
            coins: {
              $gte: price,
            },
          },
          transaction,
        }),
        app.model.product.decrement({
          amount: 1,
        }, {
          where: {
            id,
            amount: {
              $gt: 0,
            },
          },
          transaction: transactionMall,
        }),
      ];
      // 免邮特殊商品
      if(id === 99) {
        query.push(
          app.model.user.increment({
            free_post: 1,
          }, {
            where: {
              id: uid,
            },
            transaction,
          })
        )
      }
      else {
        query.push(
          app.model.prize.create({
            user_id: uid,
            product_id: id,
            state: 1,
          }, {
            raw: true,
            transaction: transactionMall,
          })
        );
      }
      let [r1, r2] = await Promise.all(query);
      if(!r1 || !r2 || r1[0][1] !== 1 || r2[0][1] !== 1) {
        await transaction.rollback();
        await transactionMall.rollback();
        return ctx.body = ctx.helper.errorJSON('商品圈币数据已更新，请重试~');
      }
      await Promise.all([
        transaction.commit(),
        transactionMall.commit()
      ]);
      await Promise.all([
        service.user.clearInfoCache(uid),
        service.mall.clearProductCache(id),
        app.redis.del('prize_' + uid),
        app.redis.del('freePost_' + uid)
      ]);
      [user, product] = await Promise.all([
        service.user.info(uid),
        service.mall.product(id)
      ]);
      ctx.body = ctx.helper.okJSON({
        user,
        product,
      });
    }
    catch(e) {
      await transaction.rollback();
      await transactionMall.rollback();
      ctx.body = ctx.helper.errorJSON('商品圈币数据已更新，请重试~');
    }
  }
}

module.exports = Controller;
