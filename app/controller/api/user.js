/**
 * Created by army8735 on 2017/10/17.
 */

'use strict';

const OSS = require('ali-oss');
const Spark = require('spark-md5');

module.exports = app => {
  class Controller extends app.Controller {
    * lastUpdateNickNameTime(ctx) {
      let uid = ctx.session.uid;
      let res = yield ctx.helper.postServiceJSON('api/users/GetUpdateNickNameLastTime', {
        uid,
      });
      ctx.body = res.data;
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

      let equalIndex =  img.indexOf('=');
      if(equalIndex > 0) {
        let temp = img.slice(0, equalIndex);
        let strLen = temp.length;
        let fileLen = Math.ceil(strLen - (strLen / 8) * 2);
        if(fileLen > 1024 * 300) {
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
              return ctx.body = {
                success: true,
                url,
              };
            }
          }
        }
        else {
          return ctx.body = {
            success: true,
            url,
          };
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
    * settle(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      // 不入驻，设置状态为10走普通用户流程
      if(body.settle === 'false') {
        let res = yield ctx.helper.postServiceJSON('api/users/SaveUser_Reg_Stat', {
          uid,
          User_Reg_Stat: 10,
        });
        return ctx.body = res.data;
      }
      // 入驻，设置状态为1，走设置马甲昵称流程
      else if(body.settle === 'true') {
        let res = yield ctx.helper.postServiceJSON('api/users/SaveAuthorSettled', {
          uid,
          AuthorID: ctx.session.authorID,
          SettledType: body.public === 'true' ? 0 : 1,
        });
        if(res.data.success) {
          let res2 = yield ctx.helper.postServiceJSON('api/users/SaveUser_Reg_Stat', {
            uid,
            User_Reg_Stat: 1,
          });
          return ctx.body = res2.data;
        }
      }
      ctx.body = {
        success: false,
      };
    }
    * settleShadowName(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let length = (body.nickName || '').length;
      if(length < 4 || length > 8) {
        return ctx.body = {
          success: false,
          message: '昵称长度需要在4~8个字之间哦！',
        };
      }
      if(body.nickName.indexOf('转圈') === 0) {
        return ctx.body = {
          success: false,
          message: '昵称不能以"转圈"开头哦！',
        };
      }
      let scan = yield ctx.service.green.textScan(body.nickName);
      if(scan.data.code === 200 && scan.data.data[0].code === 200) {
        let suggestion = scan.data.data[0].results[0].suggestion;
        if(suggestion !== 'pass') {
          return ctx.body = {
            success: false,
            message: '昵称中可能含有违规信息，请尝试换一个哦~',
          };
        }
        let res = yield ctx.helper.postServiceJSON('api/users/UpdateNickName', {
          uid,
          NickName: body.nickName,
        });
        if(res.data.success) {
          let res2 = yield ctx.helper.postServiceJSON('api/users/SaveUser_Reg_Stat', {
            uid,
            User_Reg_Stat: 10,
          });
          return ctx.body = res2.data;
        }
        else if(res.data.code === 1006) {
          return ctx.body = {
            success: false,
            message: '昵称已被占用，换个名字试试吧~',
          }
        }
        else {
          return ctx.body = res.data;
        }
      }
      ctx.body = {
        success: false,
      };
    }
    * settleShadow(ctx) {
      let uid = ctx.session.uid;
      let res = yield ctx.helper.postServiceJSON('api/users/SaveAuthorSettled', {
        uid,
        AuthorID: ctx.session.authorID,
        SettledType: 1,
      });
      if(res.data.success) {
        let res2 = yield ctx.helper.postServiceJSON('api/users/SaveUser_Reg_Stat', {
          uid,
          User_Reg_Stat: 10,
        });
        return ctx.body = res2.data;
      }
      ctx.body = {
        success: false,
      };
    }
    * guideSuggest(ctx) {
      let uid = ctx.session.uid;
      let res = yield {
        tags: ctx.helper.postServiceJSON('api/users/GetTag', {
          uid,
          Skip: 0,
          Take: 99,
        }),
        authors: ctx.helper.postServiceJSON('api/users/GetAuthor', {
          uid,
          Skip: 0,
          Take: 30,
        }),
      };
      ctx.body = {
        success: true,
        data: {
          tags: res.tags.data.data || {},
          authors: res.authors.data.data || {},
        },
      };
    }
    * guideSave(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let tags = body.tags || [];
      let authors = body.authors || [];
      // 关注接口降级
      if(tags.length) {
        yield ctx.helper.postServiceJSON('api/users/SaveTagToUser', {
          uid,
          TaglID: tags.join(',')
        });
      }
      if(authors.length) {
        yield ctx.helper.postServiceJSON('api/users/SaveAuthorToUser', {
          uid,
          AuthorID: authors.join(',')
        });
      }
      let res = yield ctx.helper.postServiceJSON('api/users/SaveUser_Reg_Stat', {
        uid,
        User_Reg_Stat: body.isAuthor ? 100 : 99,
      });
      return ctx.body = res.data;
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
      ctx.body = res.data;
    }

    * uploadPic(ctx) {
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
        if(fileLen > 1024 * 1024 * 15) {
          return ctx.body = {
            success: false,
            message: '图片体积太大啦，不能超过15M！',
          };
        }
      }

      // md5
      let spark = new Spark();
      spark.append(img);
      let md5 = spark.end();

      let name = 'pic/' + md5 + '.' + suffix;
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
        }
        return ctx.body = {
          success: true,
          data: url,
        };
      }
      ctx.body = {
        success: false,
      };
    }
    * myPost(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let res = yield ctx.helper.postServiceJSON('api/find/Hot_Post_List', {
        uid,
        Skip: body.skip,
        Take: body.take,
        MyPost: 1,
      });
      ctx.body = res.data;
    }
  }
  return Controller;
};
