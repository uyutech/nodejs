/**
 * Created by army8735 on 2017/10/9.
 */

'use strict';

module.exports = () => {
  return function* (next) {
    let ctx = this;
    if(!ctx.session.uid) {
      return ctx.redirect('/404.html');
    }
    yield next;
  };
};
