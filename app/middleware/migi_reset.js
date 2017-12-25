/**
 * Created by army8735 on 2017/10/18.
 */

'use strict';

module.exports = () => {
  return function* (next) {
    this.app.migi.Element.resetUid && this.app.migi.Element.resetUid();
    yield next;
  };
};
