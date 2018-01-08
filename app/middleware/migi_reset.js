/**
 * Created by army8735 on 2017/10/18.
 */

'use strict';

module.exports = () => {
  return async function(ctx, next) {
    ctx.app.migi.Element.resetUid && ctx.app.migi.Element.resetUid();
    await next();
  };
};
