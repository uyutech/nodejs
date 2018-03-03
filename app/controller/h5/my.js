/**
 * Created by army8735 on 2017/11/28.
 */

'use strict';

const OSS = require('ali-oss');
const Spark = require('spark-md5');

module.exports = app => {
  class Controller extends app.Controller {
    * index(ctx) {
      let uid = ctx.session.uid;
      let userInfo = {};
      let oauthInfo = [];
      let bonusPoint = {};
      let lastUpdateNickNameTime;
      let lastUpdateHeadTime;
      let coins = {};
      let res = yield {
        userInfo: ctx.helper.postServiceJSON2('api/users/GetUserInfo', {
          uid,
        }),
        oauthInfo: ctx.helper.postServiceJSON2('api/users/GetUserOauthInfo', {
          uid,
        }),
        bonusPoint: ctx.helper.postServiceJSON2('api/users/GetUserRank', {
          uid,
        }),
        lastUpdateNickNameTime: ctx.helper.postServiceJSON2('api/users/GetUpdateNickNameLastTime', {
          uid,
        }),
        lastUpdateHeadTime: ctx.helper.postServiceJSON2('api/users/GetUpdateHead_UrlLastTime', {
          uid,
        }),
        coins: ctx.helper.postServiceJSON2('api/users/GetUserCirclingCoins', {
          uid,
        }),
      };
      if(res.userInfo.data.success) {
        userInfo = res.userInfo.data.data;
      }
      if(res.oauthInfo.data.success) {
        oauthInfo = res.oauthInfo.data.data;
      }
      if(res.bonusPoint.data.success) {
        bonusPoint = res.bonusPoint.data.data || {};
      }
      if(res.lastUpdateNickNameTime.data.success) {
        lastUpdateNickNameTime = res.lastUpdateNickNameTime.data.data;
      }
      if(res.lastUpdateHeadTime.data.success) {
        lastUpdateHeadTime = res.lastUpdateHeadTime.data.data;
      }
      if(res.coins.data.success) {
        coins = res.coins.data.data;
      }
      ctx.session.uname = userInfo.NickName;
      ctx.session.head = userInfo.Head_Url;
      if(userInfo.ISAuthor) {
        ctx.session.authorId = ctx.session.authorID = userInfo.AuthorID;
        ctx.session.authorName = userInfo.AuthorName;
        ctx.session.authorHead = userInfo.AuthorHead_Url;
      }
      ctx.body = ctx.helper.okJSON({
        userInfo,
        oauthInfo,
        bonusPoint,
        lastUpdateNickNameTime,
        lastUpdateHeadTime,
        coins,
      });
    }
    * relation(ctx) {
      let uid = ctx.session.uid;
      let follows = {};
      let userFriends = {};
      let userFollows = {};
      let userFollowers = {};
      let res = yield {
        follows: ctx.helper.postServiceJSON2('api/users/GetLikeAuthorList', {
          uid,
          Skip: 0,
          Take: 30,
        }),
        userFriends: ctx.helper.postServiceJSON2('api/users/User_Friends', {
          uid,
          Skip: 0,
          Take: 30,
        }),
        userFollows: ctx.helper.postServiceJSON2('api/users/User_FollowList', {
          uid,
          Skip: 0,
          Take: 30,
        }),
        userFollowers: ctx.helper.postServiceJSON2('api/users/User_FansList', {
          uid,
          Skip: 0,
          Take: 30,
        }),
      };
      if(res.follows.data.success) {
        follows = res.follows.data.data;
      }
      if(res.userFriends.data.success) {
        userFriends = res.userFriends.data.data;
      }
      if(res.userFollows.data.success) {
        userFollows = res.userFollows.data.data;
      }
      if(res.userFollowers.data.success) {
        userFollowers = res.userFollowers.data.data;
      }
      ctx.body = ctx.helper.okJSON({
        follows,
        userFriends,
        userFollows,
        userFollowers,
      });
    }
    * friendList(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let res = yield ctx.helper.postServiceJSON2('api/users/User_Friends', {
        uid,
        Skip: body.skip,
        Take: body.take,
      });
      ctx.body = res.data;
    }
    * followList(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let res = yield ctx.helper.postServiceJSON2('api/users/User_FollowList', {
        uid,
        Skip: body.skip,
        Take: body.take,
      });
      ctx.body = res.data;
    }
    * followerList(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let res = yield ctx.helper.postServiceJSON2('api/users/User_FansList', {
        uid,
        Skip: body.skip,
        Take: body.take,
      });
      ctx.body = res.data;
    }
    * followerAuthor(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let res = yield ctx.helper.postServiceJSON2('api/users/GetLikeAuthorList', {
        uid,
        Skip: body.skip,
        Take: body.take,
      });
      ctx.body = res.data;
    }
    * message(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let res = yield ctx.helper.postServiceJSON2('api/users/GetUserNotify', {
        uid,
        Skip: body.skip,
        Take: body.take,
      });
      ctx.body = res.data;
    }
    * readMessage(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let res = yield ctx.helper.postServiceJSON2('api/users/UserNotifyIsRead', {
        uid,
        NotifyIDList: (body.ids || []).join(','),
      });
      ctx.body = res.data;
    }
    * postList(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let res = yield ctx.helper.postServiceJSON2('api/users/User_Post_List', {
        uid,
        Skip: body.skip,
        Take: body.take,
        currentUid: uid,
      });
      ctx.body = res.data;
    }
    * favor(ctx) {
      let uid = ctx.session.uid;
      let res = yield {
        favorVideo: ctx.helper.postServiceJSON2('api/users/GetUserFavor', {
          uid,
          ItemsType: 4,
          Skip: 0,
          Take: 20,
        }),
        favorMV: ctx.helper.postServiceJSON2('api/users/GetUserFavor', {
          uid,
          ItemsType: 1,
          Skip: 0,
          Take: 20,
        }),
        favorPic: ctx.helper.postServiceJSON2('api/users/GetUserFavor', {
          uid,
          ItemsType: 2,
          Skip: 0,
          Take: 10,
        }),
        favorPost: ctx.helper.postServiceJSON2('api/users/GetUserFavor', {
          uid,
          ItemsType: 3,
          Skip: 0,
          Take: 10,
        }),
      };
      let favorVideo = {};
      let favorMV = {};
      let favorPic = {};
      let favorPost = {};
      if(res.favorVideo.data.success) {
        favorVideo = res.favorVideo.data.data;
      }
      if(res.favorMV.data.success) {
        favorMV = res.favorMV.data.data;
      }
      if(res.favorPic.data.success) {
        favorPic = res.favorPic.data.data;
      }
      if(res.favorPost.data.success) {
        favorPost = res.favorPost.data.data;
      }
      ctx.body = ctx.helper.okJSON({
        favorVideo,
        favorAudio: favorMV,
        favorMV,
        favorPic,
        favorPost,
      });
    }
    * favorType(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let res = yield ctx.helper.postServiceJSON2('api/users/GetUserFavor', {
        uid,
        ItemsType: body.type,
        Skip: body.skip,
        Take: body.take,
      });
      ctx.body = res.data;
    }
    // TODO: del
    * favorMV(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let res = yield ctx.helper.postServiceJSON2('api/users/GetUserFavor', {
        uid,
        ItemsType: 1,
        Skip: body.skip,
        Take: body.take,
      });
      ctx.body = res.data;
    }
    // TODO: del
    * favorPic(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let res = yield ctx.helper.postServiceJSON2('api/users/GetUserFavor', {
        uid,
        ItemsType: 2,
        Skip: body.skip,
        Take: body.take,
      });
      ctx.body = res.data;
    }
    // TODO: del
    * favorPost(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let res = yield ctx.helper.postServiceJSON2('api/users/GetUserFavor', {
        uid,
        ItemsType: 3,
        Skip: body.skip,
        Take: body.take,
      });
      ctx.body = res.data;
    }
    * altSettle(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let res = yield ctx.helper.postServiceJSON2('api/users/SaveAuthorSettled', {
        uid,
        AuthorID: ctx.session.authorID,
        SettledType: body.public === 'true' ? 0 : 1,
      });
      if(!res.data.success) {
        return ctx.body = res.data;
      }
      if(ctx.session.authorID) {
        ctx.session.isPublic = body.public === 'true';
      }
      let userInfo = yield ctx.helper.postServiceJSON2('api/users/GetUserInfo', {
        uid,
      });
      if(userInfo.data.success) {
        ctx.session.uname = userInfo.data.data.NickName;
        ctx.session.head = userInfo.data.data.Head_Url;
        ctx.session.authorId = ctx.session.authorID = userInfo.data.data.AuthorID;
        ctx.session.authorName = userInfo.data.data.AuthorName;
        ctx.session.authorHead = userInfo.data.data.AuthorHead_Url;
      }
      ctx.body = res.data;
    }
    * uploadPic(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let img = body.img;
      let suffix = 'jpg';
      if(/^data:image\/(\w+);base64,/.test(img)) {
        let file = /^data:image\/(\w+);base64,(.*)$/.exec(img);
        if(!file) {
          return ctx.body = {
            success: false,
          };
        }
        img = file[2];
        suffix = file[1];
      }

      let equalIndex = img.indexOf('=');
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
    * uploadHead(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let img = body.img;
      let suffix = 'jpg';
      if(/^data:image\/(\w+);base64,/.test(img)) {
        let file = /^data:image\/(\w+);base64,(.*)$/.exec(img);
        if(!file) {
          return ctx.body = {
            success: false,
          };
        }
        img = file[2];
        suffix = file[1];
      }

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

      let lastUpdateHeadTime = yield ctx.helper.postServiceJSON2('api/users/GetUpdateHead_UrlLastTime', {
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
            let res = yield ctx.helper.postServiceJSON2('api/users/UpdateHead_Url', {
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
          let res = yield ctx.helper.postServiceJSON2('api/users/UpdateHead_Url', {
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
      let nickName = body.nickName || '';
      nickName = nickName.trim();
      let length = nickName.length;
      if(length < 4 || length > 8) {
        return ctx.body = {
          success: false,
          message: '昵称长度需要在4~8个字之间哦~',
        };
      }
      let lastUpdateNickNameTime = yield ctx.helper.postServiceJSON2('api/users/GetUpdateNickNameLastTime', {
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
        if(nickName.indexOf('转圈') === 0) {
          return ctx.body = {
            success: false,
            message: '昵称不能以"转圈"开头哦！',
          };
        }

        let scan = yield ctx.service.green.textScan(nickName);
        if(scan.data.code === 200 && scan.data.data[0].code === 200) {
          let suggestion = scan.data.data[0].results[0].suggestion;
          if(suggestion !== 'pass') {
            return ctx.body = {
              success: false,
              message: '昵称中可能含有违规信息，请尝试换一个哦~',
            };
          }
          let res = yield ctx.helper.postServiceJSON2('api/users/UpdateNickName', {
            uid,
            NickName: nickName,
          });
          if(res.data.success) {
            ctx.session.uname = nickName;
          }
          else if(res.data.code === 1006) {
            return ctx.body = {
              success: false,
              message: '昵称已被占用，换个名字试试吧~',
            }
          }
          return ctx.body = res.data;
        }
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
      let res = yield ctx.helper.postServiceJSON2('api/users/UpdateUserSign', {
        uid,
        sign: body.sign || '',
      });
      ctx.body = res.data;
    }
    * private(ctx) {
      let uid = ctx.session.uid;
      let res = yield ctx.helper.postServiceJSON2('api/users/GetUserAddressInfo', {
        uid,
      });
      ctx.body = res.data;
    }
    * updatePrivate(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let realName = body.realName;
      let phone = body.phone;
      let address = body.address;
      if(realName && realName.length > 8) {
        return ctx.body = {
          success: false,
          message: '姓名不能超过8个字哦~',
        };
      }
      if(phone && !/^1\d{10}$/.test(phone) && !/^09\d{8}$/.test(phone)) {
        return ctx.body = {
          success: false,
          message: '手机号码不合法~',
        };
      }
      if(address && address.length > 256) {
        return ctx.body = {
          success: false,
          message: '地址不能超过256个字哦~',
        };
      }
      let res = yield ctx.helper.postServiceJSON2('api/users/SaveUserAddressInfo', {
        uid,
        Name: realName,
        Phone: phone,
        Address: address,
      });
      ctx.body = res.data;
    }
    * sendPrize(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      return ctx.body = {
        success: false,
        message: '考虑到小伙伴们寒假的地址和开学以后的地址不相同以及春节快递停止发货。所以发货将于3月份开始，在此之间，发货功能将被锁定。具体发货时间将会在转圈微博通知，请小伙伴谅解。',
      };
      let res = yield ctx.helper.postServiceJSON2('api/users/SendProduct', {
        uid,
        cartID: body.cartID,
      });
      ctx.body = res.data;
    }
    * cancelPrize(ctx) {
      let uid = ctx.session.uid;
      let body = ctx.request.body;
      let res = yield ctx.helper.postServiceJSON2('api/users/DelOrder', {
        uid,
        cartID: body.cartID,
      });
      ctx.body = res.data;
    }
  }
  return Controller;
};
