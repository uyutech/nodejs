/**
 * Created by army8735 on 2017/11/18.
 */

'use strict';

const OSS = require('ali-oss');
const Spark = require('spark-md5');

module.exports = app => {
  class Controller extends app.Controller {
    * message(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let res = yield ctx.helper.postServiceJSON('api/users/GetUserNotify', {
        uid,
        Skip: body.skip,
        Take: body.take,
      });
      ctx.body = res.data;
    }
    * readMessage(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let res = yield ctx.helper.postServiceJSON('api/users/UserNotifyIsRead', {
        uid,
        NotifyIDList: (body.ids || []).join(','),
      });
      ctx.body = res.data;
    }
    * uploadHead(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let file = /^data:image\/(\w+);base64,(.*)$/.exec(body.img);
      let img = file[2];
      let suffix = file[1];

      let equalIndex =  img.indexOf('=');
      if(equalIndex > 0) {
        let temp = img.slice(0, equalIndex);
        let strLen = temp.length;
        let fileLen = Math.ceil(strLen - (strLen / 8) * 2);
        if(fileLen > 1024 * 500) {
          return ctx.body = {
            success: false,
            message: '图片体积太大啦，不能超过500k！',
          };
        }
      }

      let lastUpdateHeadTime = yield ctx.helper.postServiceJSON('api/users/GetUpdateHead_UrlLastTime', {
        uid,
      });
      if(lastUpdateHeadTime.data && lastUpdateHeadTime.data.success) {
        let now = Date.now();
        lastUpdateHeadTime = lastUpdateHeadTime.data.data;
        if(lastUpdateHeadTime) {
          lastUpdateHeadTime = new Date(lastUpdateHeadTime);
        }
        else {
          lastUpdateHeadTime = 0;
        }
        let updateHeadTimeDiff = now - lastUpdateHeadTime;
        if(updateHeadTimeDiff < 24 * 60 * 60 * 1000) {
          return ctx.body = {
            success: false,
            message: '头像一天只能修改一次哦~',
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
        if(!objects || objects.length === 0) {
          let upload = yield client.put(name, b);
          if(upload.res && upload.res.status === 200) {
            let res = yield ctx.helper.postServiceJSON('api/users/UpdateHead_Url', {
              uid,
              Head_Url: url,
            });
            if(res.data && res.data.success) {
              ctx.session.head = url;
              return ctx.body = {
                success: true,
                url,
              };
            }
          }
        }
        else {
          let res = yield ctx.helper.postServiceJSON('api/users/UpdateHead_Url', {
            uid,
            Head_Url: url,
          });
          if(res.data && res.data.success) {
            ctx.session.head = url;
            return ctx.body = {
              success: true,
              url,
            };
          }
        }
      }
      ctx.body = {
        success: false,
      };
    }
    * updateNickName(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let length = (body.nickName || '').length;
      if(length < 4 || length > 8) {
        return ctx.body = {
          success: false,
          message: '昵称长度需要在4~8个字之间哦~',
        };
      }
      let lastUpdateNickNameTime = yield ctx.helper.postServiceJSON('api/users/GetUpdateNickNameLastTime', {
        uid,
      });
      if(lastUpdateNickNameTime.data && lastUpdateNickNameTime.data.success) {
        let now = Date.now();
        lastUpdateNickNameTime = lastUpdateNickNameTime.data.data;
        if(lastUpdateNickNameTime) {
          lastUpdateNickNameTime = new Date(lastUpdateNickNameTime);
        }
        else {
          lastUpdateNickNameTime = 0;
        }
        let updateNickNameTimeDiff = now - lastUpdateNickNameTime;
        if(updateNickNameTimeDiff < 24 * 60 * 60 * 1000) {
          return ctx.body = {
            success: false,
            message: '昵称一天只能修改一次哦~',
          };
        }
        if(body.nickName.indexOf('转圈') === 0) {
          return ctx.body = {
            success: false,
            message: '昵称不能以"转圈"开头哦！',
          };
        }
        let res = yield ctx.helper.postServiceJSON('api/users/UpdateNickName', {
          uid,
          NickName: body.nickName,
        });
        ctx.session.uname = body.nickName;
        return ctx.body = res.data;
      }
      ctx.body = {
        success: false,
      };
    }
    * updateSign(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let length = (body.sign || '').length;
      if(length > 16) {
        return ctx.body = {
          success: false,
          message: '签名长度不能超过16个字哦~',
        };
      }
      let res = yield ctx.helper.postServiceJSON('api/users/UpdateUserSign', {
        uid,
        sign: body.sign || '',
      });
      ctx.body = res.data;
    }
    * updateAddress(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let length = (body.address || '').length;
      if(length > 256) {
        return ctx.body = {
          success: false,
          message: '地址长度不能超过256个字哦~',
        };
      }
      let res = yield ctx.helper.postServiceJSON('api/users/UpdateUserAddress', {
        uid,
        address: body.address || '',
      });
      ctx.body = res.data;
    }
    * altSettle(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let res = yield ctx.helper.postServiceJSON('api/users/SaveAuthorSettled', {
        uid,
        AuthorID: ctx.session.authorID,
        SettledType: body.public === 'true' ? 0 : 1,
      });
      if(ctx.session.authorID) {
        ctx.session.isPublic = body.public === 'true';
      }
      let userInfo = yield ctx.helper.postServiceJSON('api/users/GetUserInfo', {
        uid,
      });
      if(userInfo.data.success) {
        ctx.session.uname = userInfo.data.data.NickName;
        ctx.session.head = userInfo.data.data.Head_Url;
        ctx.session.authorID = userInfo.data.data.AuthorID;
        ctx.session.authorName = userInfo.data.data.AuthorName;
        ctx.session.authorHead = userInfo.data.data.AuthorHead_Url;
      }
      ctx.body = res.data;
    }
    * friendList(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let res = yield ctx.helper.postServiceJSON('api/users/User_Friends', {
        uid,
        Skip: body.skip,
        Take: body.take,
      });
      ctx.body = res.data;
    }
    * followList(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let res = yield ctx.helper.postServiceJSON('api/users/User_FollowList', {
        uid,
        Skip: body.skip,
        Take: body.take,
      });
      ctx.body = res.data;
    }
    * followerList(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let res = yield ctx.helper.postServiceJSON('api/users/User_FansList', {
        uid,
        Skip: body.skip,
        Take: body.take,
      });
      ctx.body = res.data;
    }
    * postList(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let res = yield ctx.helper.postServiceJSON('api/users/User_Post_List', {
        uid,
        Skip: body.skip,
        Take: body.take,
        currentUid: uid,
      });
      ctx.body = res.data;
    }
    * favor(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let res = yield ctx.helper.postServiceJSON('api/users/GetUserFavor', {
        uid,
        ItemsType: 1,
        Skip: body.skip,
        Take: body.take,
      });
      ctx.body = res.data;
    }
    * favorPic(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let res = yield ctx.helper.postServiceJSON('api/users/GetUserFavor', {
        uid,
        ItemsType: 2,
        Skip: body.skip,
        Take: body.take,
      });
      ctx.body = res.data;
    }
    * favorPost(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let res = yield ctx.helper.postServiceJSON('api/users/GetUserFavor', {
        uid,
        ItemsType: 3,
        Skip: body.skip,
        Take: body.take,
      });
      ctx.body = res.data;
    }
  }

  return Controller;
};
