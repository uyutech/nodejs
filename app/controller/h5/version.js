/**
 * Created by army8735 on 2017/10/5.
 */

'use strict';

module.exports = app => {
  class Controller extends app.Controller {
    * index(ctx) {
      ctx.body = {
        success: true,
        version: 75,
        url: 'https://circling.net.cn/h5/h5-0.5.29.zip',
        minSdk: 12,
      };
    }
  }
  return Controller;
};
