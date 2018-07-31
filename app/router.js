'use strict';

module.exports = app => {
  app.get('/app', 'error.c404');
  app.get('/404.html', 'error.c404');
  app.get('/home/qr', 'error.qr');
  app.get('/home/qr/jsgm', 'error.jsgm');
  app.get('/oauth/weibo', 'oauth.weibo');
  app.get('/oauth/login', 'oauth.login');
  app.get('/rhymes', 'rhyme.index');
  app.get('/rhymes/qr/index', 'rhyme.index');
  app.get('/rhymes/qr/Index', 'rhyme.index');
  app.get('/rhymes/ysjxy', 'rhyme.ysjxy');

  app.get('/d', 'd.index.index');
  app.get('/d/works/:worksId', 'd.works.index');
  app.get('/d/works/:worksId/:workId', 'd.works.index');
  app.get('/d/post/:id', 'd.post.index');
  app.get('/d/ysjxy', 'd.ysjxy.index');
  app.get('/m/ysjxy', 'd.ysjxy.index');
  app.get('/d/ysjxy/fc', app.middlewares.needLogin(), 'd.ysjxy.fc');
  app.get('/m/ysjxy/fc', app.middlewares.needLogin(), 'd.ysjxy.fc');
  app.get('/d/ysjxy/fc/:id', 'd.ysjxy.fcSingle');
  app.get('/m/ysjxy/fc/:id', 'd.ysjxy.fcSingle');
  app.post('/d/ysjxy/fcUpload', app.middlewares.needLoginJson(), 'd.ysjxy.fcUpload');
  app.post('/m/ysjxy/fcUpload', app.middlewares.needLoginJson(), 'd.ysjxy.fcUpload');
  app.post('/d/ysjxy/vote', app.middlewares.needLoginJson(), 'd.ysjxy.vote');
  app.post('/m/ysjxy/vote', app.middlewares.needLoginJson(), 'd.ysjxy.vote');
  app.post('/d/ysjxy/fcList', 'd.ysjxy.fcList');
  app.post('/m/ysjxy/fcList', 'd.ysjxy.fcList');
  app.get('/d/ysjxy/hh', app.middlewares.needLogin(), 'd.ysjxy.hh');
  app.get('/m/ysjxy/hh', app.middlewares.needLogin(), 'd.ysjxy.hh');
  app.post('/d/ysjxy/hhUpload', app.middlewares.needLoginJson(), 'd.ysjxy.hhUpload');
  app.post('/m/ysjxy/hhUpload', app.middlewares.needLoginJson(), 'd.ysjxy.hhUpload');
  app.get('/d/ysjxy/hh/:id', 'd.ysjxy.hhSingle');
  app.get('/m/ysjxy/hh/:id', 'd.ysjxy.hhSingle');
  app.post('/d/ysjxy/hhList', 'd.ysjxy.hhList');
  app.post('/m/ysjxy/hhList', 'd.ysjxy.hhList');

  app.get('/d/jsgm', 'jsgm.index');
  app.get('/m/jsgm', 'jsgm.index');
  app.get('/d/jsgm/detail', 'jsgm.detail');
  app.get('/m/jsgm/detail', 'jsgm.detail');
  app.get('/d/jsgm/works', 'jsgm.works');
  app.get('/m/jsgm/works', 'jsgm.works');
  app.get('/d/jsgm/works/:id', 'jsgm.single');
  app.get('/m/jsgm/works/:id', 'jsgm.single');
  app.post('/d/jsgm/worksList', 'jsgm.worksList');
  app.post('/m/jsgm/worksList', 'jsgm.worksList');
  app.get('/d/jsgm/prize', 'jsgm.prize');
  app.get('/m/jsgm/prize', 'jsgm.prize');
  app.get('/d/jsgm/join', app.middlewares.needLogin(), 'jsgm.join');
  app.get('/m/jsgm/join', app.middlewares.needLogin(), 'jsgm.join');
  app.post('/d/jsgm/add', app.middlewares.needLoginJson(), 'jsgm.add');
  app.post('/m/jsgm/add', app.middlewares.needLoginJson(), 'jsgm.add');
  app.post('/d/jsgm/update', app.middlewares.needLoginJson(), 'jsgm.update');
  app.post('/m/jsgm/update', app.middlewares.needLoginJson(), 'jsgm.update');

  app.get('/m', 'm.index.index');
  app.get('/m/works/:worksId', 'm.works.index');
  app.get('/m/works/:worksId/:workId', 'm.works.index');
  app.get('/m/post/:id', 'm.post.index');

  app.post('/api/passport/login', 'api.passport.login');
  app.post('/api/passport/loginOut', 'api.passport.loginOut');
  app.post('/api/passport/resetCode', 'api.passport.resetCode');
  app.post('/api/passport/reset', 'api.passport.reset');
  app.post('/api/passport/registerCode', 'api.passport.registerCode');
  app.post('/api/passport/register', 'api.passport.register');

  app.post('/api/works/commentList', 'api.works.commentList');
  app.post('/api/works/like', app.middlewares.needLoginJson(), 'api.works.like');
  app.post('/api/works/unLike', app.middlewares.needLoginJson(), 'api.works.unLike');
  app.post('/api/works/favor', app.middlewares.needLoginJson(), 'api.works.favor');
  app.post('/api/works/unFavor', app.middlewares.needLoginJson(), 'api.works.unFavor');
  app.post('/api/work/addViews', 'api.work.addViews');
  app.post('/api/post/commentList', 'api.post.commentList');

  app.post('/api/my/allIdentities', app.middlewares.needLoginJson(), 'api.my.allIdentities');

  app.get('/api/count/index', 'api.count.index');

  app.get('/cms/index', 'cms.index');
  app.post('/cms/authorSkillWorks', 'cms.authorSkillWorks');
  app.post('/cms/allAuthor', 'cms.allAuthor');
  app.post('/cms/sendLetter', 'cms.sendLetter');
  app.post('/cms/allUser', 'cms.allUser');
  app.post('/cms/setRecommend', 'cms.setRecommend');
  app.post('/cms/setCirclingType', 'cms.setCirclingType');

  app.get('/h5/version', 'h5.version.index');
  app.post('/h5/version', 'h5.version.index');
  app.get('/h5/stats/visit', 'h5.stats.visit');
  app.get('/h5/stats/action', 'h5.stats.action');

  app.post('/h5/works/index', 'h5.works.index');
  app.post('/h5/works/commentList', 'h5.works.commentList');
  app.post('/h5/works/like', app.middlewares.needLoginJson(), 'h5.works.like');
  app.post('/h5/works/favor', app.middlewares.needLoginJson(), 'h5.works.favor');
  app.post('/h5/works/unLike', app.middlewares.needLoginJson(), 'h5.works.unLike');
  app.post('/h5/works/unFavor', app.middlewares.needLoginJson(), 'h5.works.unFavor');

  app.post('/h5/work/addViews', 'h5.work.addViews');
  app.post('/h5/work/report', 'h5.work.report');
  app.post('/h5/work/updateSize', 'h5.work.updateSize');
  app.post('/h5/work/updateDuration', 'h5.work.updateDuration');

  app.post('/h5/musicAlbum/index', 'h5.musicAlbum.index');

  app.post('/h5/imageAlbum/index', 'h5.imageAlbum.index');
  app.post('/h5/imageAlbum/imageList', 'h5.imageAlbum.imageList');

  app.post('/h5/author/index', 'h5.author.index');
  app.post('/h5/author/skillWorks', 'h5.author.skillWorks');
  app.post('/h5/author/dynamicList', 'h5.author.dynamicList');
  app.post('/h5/author/commentList', 'h5.author.commentList');
  app.post('/h5/author/kindWorkList', 'h5.author.kindWorkList');
  app.post('/h5/author/follow', app.middlewares.needLoginJson(), 'h5.author.follow');
  app.post('/h5/author/unFollow', app.middlewares.needLoginJson(), 'h5.author.unFollow');
  app.post('/h5/author/all', 'h5.author.all');
  app.post('/h5/author/report', 'h5.author.report');
  app.post('/h5/author/black', app.middlewares.needLoginJson(), 'h5.author.black');

  app.post('/h5/circle/index', 'h5.circle.index');
  app.post('/h5/circle/postList', 'h5.circle.postList');
  app.post('/h5/circle/all', 'h5.circle.all');
  app.post('/h5/circle/popularList', 'h5.circle.popularList');
  app.post('/h5/circle/follow', app.middlewares.needLoginJson(), 'h5.circle.follow');
  app.post('/h5/circle/unFollow', app.middlewares.needLoginJson(), 'h5.circle.unFollow');
  app.post('/h5/circle/block', app.middlewares.needLoginJson(), 'h5.circle.block');

  app.post('/h5/post/index', 'h5.post.index');
  app.post('/h5/post/commentList', 'h5.post.commentList');

  app.post('/h5/subPost/index', 'h5.subPost.index');
  app.post('/h5/subPost/index2', 'h5.subPost.index2');
  app.post('/h5/subPost/sub', app.middlewares.needLoginJson(), 'h5.subPost.sub');
  app.post('/h5/subPost/circleList', app.middlewares.needLoginJson(), 'h5.subPost.circleList');

  app.post('/h5/article/index', 'h5.article.index');
  app.post('/h5/article/worksType', 'h5.article.worksType');
  app.post('/h5/article/profession', 'h5.article.profession');

  app.post('/h5/user/index', 'h5.user.index');
  app.post('/h5/user/postList', 'h5.user.postList');
  app.post('/h5/user/follow', app.middlewares.needLoginJson(), 'h5.user.follow');
  app.post('/h5/user/unFollow', app.middlewares.needLoginJson(), 'h5.user.unFollow');
  app.post('/h5/user/report', 'h5.user.report');
  app.post('/h5/user/black', app.middlewares.needLoginJson(), 'h5.user.black');

  app.post('/h5/find/index', 'h5.find.index');
  app.post('/h5/find/tag', 'h5.find.tag');

  app.post('/h5/circling/index', 'h5.circling.index');
  app.post('/h5/circling/index2', 'h5.circling.index2');
  app.post('/h5/circling/index3', 'h5.circling.index3');
  app.post('/h5/circling/circleList', 'h5.circling.circleList');
  app.post('/h5/circling/postList', 'h5.circling.postList');
  app.post('/h5/circling/postList2', 'h5.circling.postList2');
  app.post('/h5/circling/postList3', 'h5.circling.postList3');
  app.post('/h5/circling/read', app.middlewares.needLoginJson(), 'h5.circling.read');
  app.post('/h5/circling/read2', app.middlewares.needLoginJson(), 'h5.circling.read2');
  app.post('/h5/circling/all', 'h5.circling.all');

  app.post('/h5/follow/index', app.middlewares.needLoginJson(), 'h5.follow.index');
  app.post('/h5/follow/circleList', app.middlewares.needLoginJson(), 'h5.follow.circleList');
  app.post('/h5/follow/postList', app.middlewares.needLoginJson(), 'h5.follow.postList');
  app.post('/h5/follow/friendPostList', app.middlewares.needLoginJson(), 'h5.follow.friendPostList');

  app.post('/h5/my/index', app.middlewares.needLoginJson(), 'h5.my.index');
  app.post('/h5/my/postList', app.middlewares.needLoginJson(), 'h5.my.postList');
  app.post('/h5/my/favorList', app.middlewares.needLoginJson(), 'h5.my.favorList');
  app.post('/h5/my/favorPostList', app.middlewares.needLoginJson(), 'h5.my.favorPostList');
  app.post('/h5/my/relationList', app.middlewares.needLoginJson(), 'h5.my.relationList');
  // TODO: del
  app.post('/h5/my/messageList', app.middlewares.needLoginJson(), 'h5.my.commentList');
  app.post('/h5/my/commentList', app.middlewares.needLoginJson(), 'h5.my.commentList');
  app.post('/h5/my/recentLetter', app.middlewares.needLoginJson(), 'h5.my.recentLetter');
  app.post('/h5/my/letterList', app.middlewares.needLoginJson(), 'h5.my.letterList');
  app.post('/h5/my/dialogList', app.middlewares.needLoginJson(), 'h5.my.dialogList');
  app.post('/h5/my/unreadMessageCount', app.middlewares.needLoginJson(), 'h5.my.unreadMessageCount');
  app.post('/h5/my/unreadNotifyCount', app.middlewares.needLoginJson(), 'h5.my.unreadNotifyCount');
  app.post('/h5/my/unreadMessageCountWithRecentLetter', app.middlewares.needLoginJson(), 'h5.my.unreadMessageCountWithRecentLetter');
  app.post('/h5/my/unReadLetterCount', app.middlewares.needLoginJson(), 'h5.my.unReadLetterCount');
  app.post('/h5/my/readLetter', app.middlewares.needLoginJson(), 'h5.my.readLetter');
  app.post('/h5/my/sts', app.middlewares.needLoginJson(), 'h5.my.sts');
  app.post('/h5/my/stsAudio', app.middlewares.needLoginJson(), 'h5.my.stsAudio');
  app.post('/h5/my/stsVideo', app.middlewares.needLoginJson(), 'h5.my.stsVideo');
  app.post('/h5/my/headUrl', app.middlewares.needLoginJson(), 'h5.my.headUrl');
  app.post('/h5/my/nickname', app.middlewares.needLoginJson(), 'h5.my.nickname');
  app.post('/h5/my/sign', app.middlewares.needLoginJson(), 'h5.my.sign');
  app.post('/h5/my/settle', app.middlewares.needLoginJson(), 'h5.my.settle');
  app.post('/h5/my/guideNameAndSex', app.middlewares.needLoginJson(), 'h5.my.guideNameAndSex');
  app.post('/h5/my/guideCircle', app.middlewares.needLoginJson(), 'h5.my.guideCircle');
  app.post('/h5/my/guideAuthor', app.middlewares.needLoginJson(), 'h5.my.guideAuthor');
  app.post('/h5/my/address', app.middlewares.needLoginJson(), 'h5.my.address');
  app.post('/h5/my/addAddress', app.middlewares.needLoginJson(), 'h5.my.addAddress');
  app.post('/h5/my/updateAddressName', app.middlewares.needLoginJson(), 'h5.my.updateAddressName');
  app.post('/h5/my/updateAddressPhone', app.middlewares.needLoginJson(), 'h5.my.updateAddressPhone');
  app.post('/h5/my/updateAddress', app.middlewares.needLoginJson(), 'h5.my.updateAddress');
  app.post('/h5/my/checkIn', app.middlewares.needLoginJson(), 'h5.my.checkIn');

  app.post('/h5/guide/tag', app.middlewares.needLoginJson(), 'h5.guide.tag');
  app.post('/h5/guide/followTag', app.middlewares.needLoginJson(), 'h5.guide.followTag');

  app.post('/h5/comment/like', app.middlewares.needLoginJson(), 'h5.comment.like');
  app.post('/h5/comment/unLike', app.middlewares.needLoginJson(), 'h5.comment.unLike');
  app.post('/h5/comment/favor', app.middlewares.needLoginJson(), 'h5.comment.favor');
  app.post('/h5/comment/unFavor', app.middlewares.needLoginJson(), 'h5.comment.unFavor');
  app.post('/h5/comment/sub', app.middlewares.needLoginJson(), 'h5.comment.sub');
  app.post('/h5/comment/report', 'h5.comment.report');
  app.post('/h5/comment/block', app.middlewares.needLoginJson(), 'h5.comment.block');
  app.post('/h5/comment/del', app.middlewares.needLoginJson(), 'h5.comment.del');

  app.post('/h5/tag/index', 'h5.tag.index');
  app.post('/h5/tag/postList', 'h5.tag.postList');

  app.post('/h5/search/author', 'h5.search.author');
  app.post('/h5/search/user', 'h5.search.user');
  app.post('/h5/search/works', 'h5.search.works');
  app.post('/h5/search/tag', 'h5.search.tag');

  app.post('/h5/passport/login', 'h5.passport.login');
  app.post('/h5/passport/loginWeibo', 'h5.passport.loginWeibo');
  app.post('/h5/passport/bindList', app.middlewares.needLoginJson(), 'h5.passport.bindList');
  app.post('/h5/passport/bindWeibo', app.middlewares.needLoginJson(), 'h5.passport.bindWeibo');
  app.post('/h5/passport/bindCode', app.middlewares.needLoginJson(), 'h5.passport.bindCode');
  app.post('/h5/passport/bindPhone', app.middlewares.needLoginJson(), 'h5.passport.bindPhone');
  app.post('/h5/passport/registerCode', 'h5.passport.registerCode');
  app.post('/h5/passport/register', 'h5.passport.register');
  app.post('/h5/passport/resetCode', 'h5.passport.resetCode');
  app.post('/h5/passport/reset', 'h5.passport.reset');
  app.post('/h5/passport/loginOut', app.middlewares.needLoginJson(), 'h5.passport.loginOut');

  app.post('/h5/mall/index', 'h5.mall.index');
  app.post('/h5/mall/prize', app.middlewares.needLoginJson(), 'h5.mall.prize');
  app.post('/h5/mall/express', app.middlewares.needLoginJson(), 'h5.mall.express');
  app.post('/h5/mall/applyExpress', app.middlewares.needLoginJson(), 'h5.mall.applyExpress');
  app.post('/h5/mall/cancelExpress', app.middlewares.needLoginJson(), 'h5.mall.cancelExpress');

  app.post('/private/profession/all', 'private.profession.all');
  app.post('/private/skill/all', 'private.skill.all');
  app.post('/private/works/typeAll', 'private.works.typeAll');
  app.post('/private/works/stateAll', 'private.works.stateAll');
  app.post('/private/works/create', 'private.works.create');
  app.post('/private/works/addWork', 'private.works.addWork');
  app.post('/private/works/removeWork', 'private.works.removeWork');
  app.post('/private/works/like', 'private.works.like');
  app.post('/private/works/unLike', 'private.works.unLike');
  app.post('/private/works/favor', 'private.works.favor');
  app.post('/private/works/unFavor', 'private.works.unFavor');
  app.post('/private/works/update', 'private.works.update');
  app.post('/private/works/delete', 'private.works.delete');
  app.post('/private/works/unDelete', 'private.works.unDelete');
  app.post('/private/works/addAuthor', 'private.works.addAuthor');
  app.post('/private/works/removeAuthor', 'private.works.removeAuthor');
  app.post('/private/works/info', 'private.works.info');
  app.post('/private/work/typeAll', 'private.work.typeAll');
  app.post('/private/work/update', 'private.work.update');
  app.post('/private/work/delete', 'private.work.delete');
  app.post('/private/work/unDelete', 'private.work.unDelete');
  app.post('/private/work/addAuthor', 'private.work.addAuthor');
  app.post('/private/work/removeAuthor', 'private.work.removeAuthor');
  app.post('/private/work/addViews', 'private.work.addViews');
  app.post('/private/work/relation', 'private.work.relation');
  app.post('/private/work/addRelation', 'private.work.addRelation');
  app.post('/private/work/removeRelation', 'private.work.removeRelation');
  app.post('/private/author/find', 'private.author.find');
  app.post('/private/author/create', 'private.author.create');
  app.post('/private/user/find', 'private.user.find');
  app.post('/private/user/increaseCoins', 'private.user.increaseCoins');
  app.post('/private/account', 'private.account.session');
  app.post('/private/comment/like', 'private.comment.like');
  app.post('/private/comment/unLike', 'private.comment.unLike');
  app.post('/private/comment/favor', 'private.comment.favor');
  app.post('/private/comment/unFavor', 'private.comment.unFavor');
  app.post('/private/tag/create', 'private.tag.create');
  app.post('/private/post/create', 'private.post.create');
  app.post('/private/recommend/createContent', 'private.recommend.createContent');
  app.post('/private/recommend/deleteContent', 'private.recommend.deleteContent');
};
