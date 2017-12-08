/**
 * Created by army8735 on 2017/10/5.
 */

'use strict';

module.exports = app => {
  class Controller extends app.Controller {
    * index(ctx) {
      ctx.body = {
        success: true,
        version: 0,
        url: 'http://army8735.circling.cc/github/uyutech/h5/dist/h5.zip',
      };
    }
  }
  return Controller;
};
