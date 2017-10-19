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

      // 超过100k
      let equalIndex =  img.indexOf('=');
      if(equalIndex > 0) {
        let temp = img.slice(0, equalIndex);
        let strLen = temp.length;
        let fileLen = Math.ceil(strLen - (strLen / 8) * 2);
        if(fileLen > 1024 * 100) {
          return ctx.body = {
            success: false,
            message: '图片体积太大啦，不能超过100k！',
          };
        }
      }

      // md5
      let spark = new Spark();
      spark.append(img);
      let md5 = spark.end();

      let name = 'head/' + md5 + '.' + suffix;
      let url = '//zhuanquan.xin/' + name;
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
        let objects = check.objects;
        if(!objects || objects.length) {
          let upload = yield client.put(name, b);
          if(upload.res && upload.res.status === 200) {
            let res = yield ctx.helper.postServiceJSON('api/users/UpdateHead_Url', {
              uid,
              Head_Url: url,
            });
            if(res.data && res.data.success) {
              return ctx.body = {
                success: true,
                url,
              };
            }
          }
        }
      }
      ctx.body = {
        success: false,
      };
    }
    * labelList(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let res = yield ctx.helper.postServiceJSON('api/users/GetLabelList', {
        uid,
        workid: body.worksID,
      });
      ctx.body = res.data;
    }
    * addLabel(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let res = yield ctx.helper.postServiceJSON('api/users/UserAddWorkLabel', {
        uid,
        workid: body.worksID,
        labelID: body.labelID || '',
      });
      ctx.body = res.data;
    }
  }
  return Controller;
};
