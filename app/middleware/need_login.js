/**
 * Created by army8735 on 2017/10/9.
 */

'use strict';

module.exports = () => {
  return async function(ctx, next) {
    if(!ctx.session.uid) {
      return ctx.redirect('/login');
    }
    await next();
  };
};
