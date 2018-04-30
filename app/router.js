'use strict';

module.exports = app => {
  app.get('/404.html', 'error.c404');
  app.get('/home/qr', 'error.qr');
  app.get('/oauth/weibo', 'oauth.weibo');
  app.get('/oauth/login', 'oauth.login');

  app.get('/d', 'd.index.index');
  app.get('/d/works/:worksId', 'd.works.index');
  app.get('/d/works/:worksId/:workId', 'd.works.index');

  app.get('/m', 'm.index.index');
  app.get('/m/works/:worksId', 'm.works.index');
  app.get('/m/works/:worksId/:workId', 'm.works.index');

  app.post('/api/login/loginOut', 'api.login.loginOut');
  app.post('/api/works/commentList', 'api.works.commentList');
  app.post('/api/work/addViews', 'api.work.addViews');

  app.get('/api/count/index', 'api.count.index');

  app.get('/app', 'h5.index.index');
  app.get('/h5/index', 'h5.index.index');
  app.get('/h5/version', 'h5.version.index');
  app.post('/h5/version', 'h5.version.index');
  app.get('/h5/stats/visit', 'h5.stats.visit');

  app.get('/count/authorSkill/:id', app.middlewares.needLoginJson(), 'count.authorSkill');
  app.get('/count/allAuthorSkill', app.middlewares.needLoginJson(), 'count.allAuthorSkill');
  app.get('/count/authorCooperation/:id', app.middlewares.needLoginJson(), 'count.authorCooperation');
  app.get('/count/allAuthorCooperation', app.middlewares.needLoginJson(), 'count.allAuthorCooperation');

  app.post('/h5/works2/index', 'h52.works.index');
  app.post('/h5/works2/commentList', 'h52.works.commentList');
  app.post('/h5/works2/like', app.middlewares.needLoginJson(), 'h52.works.like');
  app.post('/h5/works2/favor', app.middlewares.needLoginJson(), 'h52.works.favor');
  app.post('/h5/works2/unLike', app.middlewares.needLoginJson(), 'h52.works.unLike');
  app.post('/h5/works2/unFavor', app.middlewares.needLoginJson(), 'h52.works.unFavor');

  app.post('/h5/work2/addViews', 'h52.work.addViews');
  app.post('/h5/work2/report', 'h52.work.report');

  app.post('/h5/musicAlbum2/index', 'h52.musicAlbum.index');

  app.post('/h5/imageAlbum2/index', 'h52.imageAlbum.index');
  app.post('/h5/imageAlbum2/imageList', 'h52.imageAlbum.imageList');

  app.post('/h5/author2/index', 'h52.author.index');
  app.post('/h5/author2/dynamicList', 'h52.author.dynamicList');
  app.post('/h5/author2/commentList', 'h52.author.commentList');
  app.post('/h5/author2/kindWorkList', 'h52.author.kindWorkList');
  app.post('/h5/author2/follow', app.middlewares.needLoginJson(), 'h52.author.follow');
  app.post('/h5/author2/unFollow', app.middlewares.needLoginJson(), 'h52.author.unFollow');
  app.post('/h5/author2/all', 'h52.author.all');
  app.post('/h5/author2/report', 'h52.author.report');
  app.post('/h5/author2/black', app.middlewares.needLoginJson(), 'h52.author.black');

  app.post('/h5/circle2/index', 'h52.circle.index');
  app.post('/h5/circle2/postList', 'h52.circle.postList');
  app.post('/h5/circle2/all', 'h52.circle.all');
  app.post('/h5/circle2/popularList', 'h52.circle.popularList');
  app.post('/h5/circle2/follow', app.middlewares.needLoginJson(), 'h52.circle.follow');
  app.post('/h5/circle2/unFollow', app.middlewares.needLoginJson(), 'h52.circle.unFollow');
  app.post('/h5/circle2/block', app.middlewares.needLoginJson(), 'h52.circle.block');

  app.post('/h5/post2/index', 'h52.post.index');
  app.post('/h5/post2/commentList', 'h52.post.commentList');

  app.post('/h5/subPost2/index', 'h52.subPost.index');
  app.post('/h5/subPost2/sub', app.middlewares.needLoginJson(), 'h52.subPost.sub');
  app.post('/h5/subPost2/circleList', app.middlewares.needLoginJson(), 'h52.subPost.circleList');

  app.post('/h5/user2/index', 'h52.user.index');
  app.post('/h5/user2/postList', 'h52.user.postList');
  app.post('/h5/user2/follow', app.middlewares.needLoginJson(), 'h52.user.follow');
  app.post('/h5/user2/unFollow', app.middlewares.needLoginJson(), 'h52.user.unFollow');
  app.post('/h5/user2/report', 'h52.user.report');
  app.post('/h5/user2/black', app.middlewares.needLoginJson(), 'h52.user.black');

  app.post('/h5/find2/index', 'h52.find.index');
  app.post('/h5/find2/tag', 'h52.find.tag');

  app.post('/h5/circling2/index', 'h52.circling.index');
  app.post('/h5/circling2/circleList', 'h52.circling.circleList');
  app.post('/h5/circling2/postList', 'h52.circling.postList');

  app.post('/h5/follow2/index', app.middlewares.needLoginJson(), 'h52.follow.index');
  app.post('/h5/follow2/circleList', app.middlewares.needLoginJson(), 'h52.follow.circleList');
  app.post('/h5/follow2/postList', app.middlewares.needLoginJson(), 'h52.follow.postList');
  app.post('/h5/follow2/friendPostList', app.middlewares.needLoginJson(), 'h52.follow.friendPostList');

  app.post('/h5/my2/index', app.middlewares.needLoginJson(), 'h52.my.index');
  app.post('/h5/my2/postList', app.middlewares.needLoginJson(), 'h52.my.postList');
  app.post('/h5/my2/favorList', app.middlewares.needLoginJson(), 'h52.my.favorList');
  app.post('/h5/my2/favorPostList', app.middlewares.needLoginJson(), 'h52.my.favorPostList');
  app.post('/h5/my2/relationList', app.middlewares.needLoginJson(), 'h52.my.relationList');
  app.post('/h5/my2/messageList', app.middlewares.needLoginJson(), 'h52.my.messageList');
  app.post('/h5/my2/unreadMessageCount', app.middlewares.needLoginJson(), 'h52.my.unreadMessageCount');
  app.post('/h5/my2/sts', app.middlewares.needLoginJson(), 'h52.my.sts');
  app.post('/h5/my2/headUrl', app.middlewares.needLoginJson(), 'h52.my.headUrl');
  app.post('/h5/my2/nickname', app.middlewares.needLoginJson(), 'h52.my.nickname');
  app.post('/h5/my2/sign', app.middlewares.needLoginJson(), 'h52.my.sign');
  app.post('/h5/my2/settle', app.middlewares.needLoginJson(), 'h52.my.settle');
  app.post('/h5/my2/guideNameAndSex', app.middlewares.needLoginJson(), 'h52.my.guideNameAndSex');
  app.post('/h5/my2/guideCircle', app.middlewares.needLoginJson(), 'h52.my.guideCircle');
  app.post('/h5/my2/guideAuthor', app.middlewares.needLoginJson(), 'h52.my.guideAuthor');
  app.post('/h5/my2/address', app.middlewares.needLoginJson(), 'h52.my.address');
  app.post('/h5/my2/updateAddressName', app.middlewares.needLoginJson(), 'h52.my.updateAddressName');
  app.post('/h5/my2/updateAddressPhone', app.middlewares.needLoginJson(), 'h52.my.updateAddressPhone');
  app.post('/h5/my2/updateAddress', app.middlewares.needLoginJson(), 'h52.my.updateAddress');

  app.post('/h5/comment2/like', app.middlewares.needLoginJson(), 'h52.comment.like');
  app.post('/h5/comment2/unLike', app.middlewares.needLoginJson(), 'h52.comment.unLike');
  app.post('/h5/comment2/favor', app.middlewares.needLoginJson(), 'h52.comment.favor');
  app.post('/h5/comment2/unFavor', app.middlewares.needLoginJson(), 'h52.comment.unFavor');
  app.post('/h5/comment2/sub', app.middlewares.needLoginJson(), 'h52.comment.sub');
  app.post('/h5/comment2/report', 'h52.comment.report');
  app.post('/h5/comment2/block', app.middlewares.needLoginJson(), 'h52.comment.block');
  app.post('/h5/comment2/del', app.middlewares.needLoginJson(), 'h52.comment.del');

  app.post('/h5/tag2/index', 'h52.tag.index');
  app.post('/h5/tag2/postList', 'h52.tag.postList');

  app.post('/h5/search2/author', 'h52.search.author');
  app.post('/h5/search2/user', 'h52.search.user');
  app.post('/h5/search2/works', 'h52.search.works');
  app.post('/h5/search2/tag', 'h52.search.tag');

  app.post('/h5/passport2/login', 'h52.passport.login');
  app.post('/h5/passport2/loginWeibo', 'h52.passport.loginWeibo');
  app.post('/h5/passport2/bindList', app.middlewares.needLoginJson(), 'h52.passport.bindList');
  app.post('/h5/passport2/bindWeibo', app.middlewares.needLoginJson(), 'h52.passport.bindWeibo');
  app.post('/h5/passport2/bindCode', app.middlewares.needLoginJson(), 'h52.passport.bindCode');
  app.post('/h5/passport2/bindPhone', app.middlewares.needLoginJson(), 'h52.passport.bindPhone');
  app.post('/h5/passport2/registerCode', 'h52.passport.registerCode');
  app.post('/h5/passport2/register', 'h52.passport.register');
  app.post('/h5/passport2/resetCode', 'h52.passport.resetCode');
  app.post('/h5/passport2/reset', 'h52.passport.reset');
  app.post('/h5/passport2/loginOut', app.middlewares.needLoginJson(), 'h52.passport.loginOut');

  app.post('/h5/mall2/index', 'h52.mall.index');
  app.post('/h5/mall2/prize', app.middlewares.needLoginJson(), 'h52.mall.prize');
  app.post('/h5/mall2/express', app.middlewares.needLoginJson(), 'h52.mall.express');
  app.post('/h5/mall2/applyExpress', app.middlewares.needLoginJson(), 'h52.mall.applyExpress');
  app.post('/h5/mall2/cancelExpress', app.middlewares.needLoginJson(), 'h52.mall.cancelExpress');

  app.post('/private/profession/all', 'private.profession.all');
  app.post('/private/skill/all', 'private.skill.all');
  app.post('/private/works/typeAll', 'private.works.typeAll');
  app.post('/private/works/stateAll', 'private.works.stateAll');
  app.post('/private/works/create', 'private.works.create');
  app.post('/private/work/typeAll', 'private.work.typeAll');
  app.post('/private/author/find', 'private.author.find');
  app.post('/private/author/create', 'private.author.create');
  app.post('/private/user/find', 'private.user.find');
  app.post('/private/user/increaseCoins', 'private.user.increaseCoins');
  app.post('/private/account', 'private.account.session');
};
