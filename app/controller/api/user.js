/**
 * Created by army8735 on 2017/10/17.
 */

'use strict';

const OSS = require('ali-oss');
const Spark = require('spark-md5');

module.exports = app => {
  class Controller extends app.Controller {
    * updateNickName(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let res = yield ctx.helper.postServiceJSON('api/users/UpdateNickName', {
        uid,
        NickName: body.nickName,
      });
      ctx.body = res.data;
    }
    * checkExistHead(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let file = /^data:image\/(\w+);base64,(.*)$/.exec(body.img);
      let img = file[2];
      let suffix = file[1];
      let client = new OSS({
        region: 'oss-cn-shanghai',
        accessKeyId: 'LTAIbZSVA2e931EB',
        accessKeySecret: '5v756TGc1Gv3gkg4rhzoe0OYyLe8Xc',
        bucket: 'circling-assets',
      });
      let res = yield client.list('head/' + md5 + '.' + suffix, b);
      ctx.body = res;
    }
    * uploadHead(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let file = /^data:image\/(\w+);base64,(.*)$/.exec(body.img);
      let img = file[2];
      let suffix = file[1];
      let spark = new Spark();
      spark.append(img);
      let md5 = spark.end();
      let name = 'head/' + md5 + '.' + suffix;
      let b = new Buffer(img, 'base64');
      let client = new OSS({
        region: 'oss-cn-shanghai',
        accessKeyId: 'LTAIbZSVA2e931EB',
        accessKeySecret: '5v756TGc1Gv3gkg4rhzoe0OYyLe8Xc',
        bucket: 'circling-assets',
      });
      let check = yield client.list({
        prefix: name,
      });
      if(check.res && check.res.status === 200) {
        let objects = check.objects;console.log(objects);
        if(objects && objects.length === 1) {
          return ctx.body = {
            success: true,
            name,
          };
        }
        let upload = yield client.put(name, b);
        if(upload.res && upload.res.status === 200) {
          return ctx.body = {
            success: true,
            name,
          };
        }
      }
      ctx.body = {
        success: false,
      };
    }
  }
  return Controller;
};