/**
 * Created by army8735 on 2018/5/20.
 */

'use strict';

module.exports = () => {
  return async function(ctx, next) {
    if(!ctx.session || !ctx.session.uid) {
      return ctx.body = '没有权限';
    }
    let uid = ctx.session.uid;
    let check = await ctx.app.model.cmsAccount.findOne({
      attributes: [
        'id'
      ],
      where: {
        user_id: uid,
      },
      raw: true,
    });
    if(!check) {
      return ctx.body = '没有权限';
    }
    await next();
  }
};
