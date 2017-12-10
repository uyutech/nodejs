/**
 * Created by army8735 on 2017/10/5.
 */

'use strict';

module.exports = app => {
  class Controller extends app.Controller {
    * index(ctx) {
      ctx.body = {
        success: true,
        version: 3,
        url: 'http://circling.net.cn/h5/h5-0.1.3.zip',
      };
    }
  }
  return Controller;
};
