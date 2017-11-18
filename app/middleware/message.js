/**
 * Created by army8735 on 2017/11/18.
 */

'use strict';

module.exports = () => {
  return function* (next) {
    let uid = this.session.uid;
    if(uid) {
      let message = yield this.helper.postServiceJSON('api/users/GetUserNotify', {
        uid,
        Skip: 0,
        Take: 1,
      });
      if(message.data.success) {
        this.session.messageNum = message.data.data.Count;
      }
    }
    yield next;
  };
};
