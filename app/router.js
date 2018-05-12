'use strict';

module.exports = app => {
  app.get('/app', 'error.c404');
  app.get('/404.html', 'error.c404');
  app.get('/home/qr', 'error.qr');
  app.get('/home/qr/jsgm', 'error.jsgm');
  app.get('/oauth/weibo', 'oauth.weibo');
  app.get('/oauth/login', 'oauth.login');

  app.get('/d', 'd.index.index');
  app.get('/d/works/:worksId', 'd.works.index');
  app.get('/d/works/:worksId/:workId', 'd.works.index');
  app.get('/d/post/:id', 'd.post.index');

  app.get('/m', 'm.index.index');
  app.get('/m/works/:worksId', 'm.works.index');
  app.get('/m/works/:worksId/:workId', 'm.works.index');
  app.get('/m/post/:id', 'm.post.index');

  app.post('/api/login/loginOut', 'api.login.loginOut');
  app.post('/api/works/commentList', 'api.works.commentList');
  app.post('/api/works/like', app.middlewares.needLoginJson(), 'api.works.like');
  app.post('/api/works/unLike', app.middlewares.needLoginJson(), 'api.works.unLike');
  app.post('/api/works/favor', app.middlewares.needLoginJson(), 'api.works.favor');
  app.post('/api/works/unFavor', app.middlewares.needLoginJson(), 'api.works.unFavor');
  app.post('/api/work/addViews', 'api.work.addViews');
  app.post('/api/post/commentList', 'api.post.commentList');

  app.get('/api/count/index', 'api.count.index');

  app.get('/h5/version', 'h5.version.index');
  app.post('/h5/version', 'h5.version.index');
  app.get('/h5/stats/visit', 'h5.stats.visit');

  app.get('/count/authorSkill/:id', app.middlewares.needLoginJson(), 'count.authorSkill');
  app.get('/count/allAuthorSkill', app.middlewares.needLoginJson(), 'count.allAuthorSkill');
  app.get('/count/authorCooperation/:id', app.middlewares.needLoginJson(), 'count.authorCooperation');
  app.get('/count/allAuthorCooperation', app.middlewares.needLoginJson(), 'count.allAuthorCooperation');

  app.post('/h5/works2/index', 'h5.works.index');
  app.post('/h5/works2/commentList', 'h5.works.commentList');
  app.post('/h5/works2/like', app.middlewares.needLoginJson(), 'h5.works.like');
  app.post('/h5/works2/favor', app.middlewares.needLoginJson(), 'h5.works.favor');
  app.post('/h5/works2/unLike', app.middlewares.needLoginJson(), 'h5.works.unLike');
  app.post('/h5/works2/unFavor', app.middlewares.needLoginJson(), 'h5.works.unFavor');

  app.post('/h5/work2/addViews', 'h5.work.addViews');
  app.post('/h5/work2/report', 'h5.work.report');

  app.post('/h5/musicAlbum2/index', 'h5.musicAlbum.index');

  app.post('/h5/imageAlbum2/index', 'h5.imageAlbum.index');
  app.post('/h5/imageAlbum2/imageList', 'h5.imageAlbum.imageList');

  app.post('/h5/author2/index', 'h5.author.index');
  app.post('/h5/author2/dynamicList', 'h5.author.dynamicList');
  app.post('/h5/author2/commentList', 'h5.author.commentList');
  app.post('/h5/author2/kindWorkList', 'h5.author.kindWorkList');
  app.post('/h5/author2/follow', app.middlewares.needLoginJson(), 'h5.author.follow');
  app.post('/h5/author2/unFollow', app.middlewares.needLoginJson(), 'h5.author.unFollow');
  app.post('/h5/author2/all', 'h5.author.all');
  app.post('/h5/author2/report', 'h5.author.report');
  app.post('/h5/author2/black', app.middlewares.needLoginJson(), 'h5.author.black');

  app.post('/h5/circle2/index', 'h5.circle.index');
  app.post('/h5/circle2/postList', 'h5.circle.postList');
  app.post('/h5/circle2/all', 'h5.circle.all');
  app.post('/h5/circle2/popularList', 'h5.circle.popularList');
  app.post('/h5/circle2/follow', app.middlewares.needLoginJson(), 'h5.circle.follow');
  app.post('/h5/circle2/unFollow', app.middlewares.needLoginJson(), 'h5.circle.unFollow');
  app.post('/h5/circle2/block', app.middlewares.needLoginJson(), 'h5.circle.block');

  app.post('/h5/post2/index', 'h5.post.index');
  app.post('/h5/post2/commentList', 'h5.post.commentList');

  app.post('/h5/subPost2/index', 'h5.subPost.index');
  app.post('/h5/subPost2/sub', app.middlewares.needLoginJson(), 'h5.subPost.sub');
  app.post('/h5/subPost2/circleList', app.middlewares.needLoginJson(), 'h5.subPost.circleList');

  app.post('/h5/user2/index', 'h5.user.index');
  app.post('/h5/user2/postList', 'h5.user.postList');
  app.post('/h5/user2/follow', app.middlewares.needLoginJson(), 'h5.user.follow');
  app.post('/h5/user2/unFollow', app.middlewares.needLoginJson(), 'h5.user.unFollow');
  app.post('/h5/user2/report', 'h5.user.report');
  app.post('/h5/user2/black', app.middlewares.needLoginJson(), 'h5.user.black');

  app.post('/h5/find2/index', 'h5.find.index');
  app.post('/h5/find2/tag', 'h5.find.tag');

  app.post('/h5/circling2/index', 'h5.circling.index');
  app.post('/h5/circling2/circleList', 'h5.circling.circleList');
  app.post('/h5/circling2/postList', 'h5.circling.postList');

  app.post('/h5/follow2/index', app.middlewares.needLoginJson(), 'h5.follow.index');
  app.post('/h5/follow2/circleList', app.middlewares.needLoginJson(), 'h5.follow.circleList');
  app.post('/h5/follow2/postList', app.middlewares.needLoginJson(), 'h5.follow.postList');
  app.post('/h5/follow2/friendPostList', app.middlewares.needLoginJson(), 'h5.follow.friendPostList');

  app.post('/h5/my2/index', app.middlewares.needLoginJson(), 'h5.my.index');
  app.post('/h5/my2/postList', app.middlewares.needLoginJson(), 'h5.my.postList');
  app.post('/h5/my2/favorList', app.middlewares.needLoginJson(), 'h5.my.favorList');
  app.post('/h5/my2/favorPostList', app.middlewares.needLoginJson(), 'h5.my.favorPostList');
  app.post('/h5/my2/relationList', app.middlewares.needLoginJson(), 'h5.my.relationList');
  app.post('/h5/my2/messageList', app.middlewares.needLoginJson(), 'h5.my.messageList');
  app.post('/h5/my2/unreadMessageCount', app.middlewares.needLoginJson(), 'h5.my.unreadMessageCount');
  app.post('/h5/my2/sts', app.middlewares.needLoginJson(), 'h5.my.sts');
  app.post('/h5/my2/headUrl', app.middlewares.needLoginJson(), 'h5.my.headUrl');
  app.post('/h5/my2/nickname', app.middlewares.needLoginJson(), 'h5.my.nickname');
  app.post('/h5/my2/sign', app.middlewares.needLoginJson(), 'h5.my.sign');
  app.post('/h5/my2/settle', app.middlewares.needLoginJson(), 'h5.my.settle');
  app.post('/h5/my2/guideNameAndSex', app.middlewares.needLoginJson(), 'h5.my.guideNameAndSex');
  app.post('/h5/my2/guideCircle', app.middlewares.needLoginJson(), 'h5.my.guideCircle');
  app.post('/h5/my2/guideAuthor', app.middlewares.needLoginJson(), 'h5.my.guideAuthor');
  app.post('/h5/my2/address', app.middlewares.needLoginJson(), 'h5.my.address');
  app.post('/h5/my2/updateAddressName', app.middlewares.needLoginJson(), 'h5.my.updateAddressName');
  app.post('/h5/my2/updateAddressPhone', app.middlewares.needLoginJson(), 'h5.my.updateAddressPhone');
  app.post('/h5/my2/updateAddress', app.middlewares.needLoginJson(), 'h5.my.updateAddress');

  app.post('/h5/comment2/like', app.middlewares.needLoginJson(), 'h5.comment.like');
  app.post('/h5/comment2/unLike', app.middlewares.needLoginJson(), 'h5.comment.unLike');
  app.post('/h5/comment2/favor', app.middlewares.needLoginJson(), 'h5.comment.favor');
  app.post('/h5/comment2/unFavor', app.middlewares.needLoginJson(), 'h5.comment.unFavor');
  app.post('/h5/comment2/sub', app.middlewares.needLoginJson(), 'h5.comment.sub');
  app.post('/h5/comment2/report', 'h5.comment.report');
  app.post('/h5/comment2/block', app.middlewares.needLoginJson(), 'h5.comment.block');
  app.post('/h5/comment2/del', app.middlewares.needLoginJson(), 'h5.comment.del');

  app.post('/h5/tag2/index', 'h5.tag.index');
  app.post('/h5/tag2/postList', 'h5.tag.postList');

  app.post('/h5/search2/author', 'h5.search.author');
  app.post('/h5/search2/user', 'h5.search.user');
  app.post('/h5/search2/works', 'h5.search.works');
  app.post('/h5/search2/tag', 'h5.search.tag');

  app.post('/h5/passport2/login', 'h5.passport.login');
  app.post('/h5/passport2/loginWeibo', 'h5.passport.loginWeibo');
  app.post('/h5/passport2/bindList', app.middlewares.needLoginJson(), 'h5.passport.bindList');
  app.post('/h5/passport2/bindWeibo', app.middlewares.needLoginJson(), 'h5.passport.bindWeibo');
  app.post('/h5/passport2/bindCode', app.middlewares.needLoginJson(), 'h5.passport.bindCode');
  app.post('/h5/passport2/bindPhone', app.middlewares.needLoginJson(), 'h5.passport.bindPhone');
  app.post('/h5/passport2/registerCode', 'h5.passport.registerCode');
  app.post('/h5/passport2/register', 'h5.passport.register');
  app.post('/h5/passport2/resetCode', 'h5.passport.resetCode');
  app.post('/h5/passport2/reset', 'h5.passport.reset');
  app.post('/h5/passport2/loginOut', app.middlewares.needLoginJson(), 'h5.passport.loginOut');

  app.post('/h5/mall2/index', 'h5.mall.index');
  app.post('/h5/mall2/prize', app.middlewares.needLoginJson(), 'h5.mall.prize');
  app.post('/h5/mall2/express', app.middlewares.needLoginJson(), 'h5.mall.express');
  app.post('/h5/mall2/applyExpress', app.middlewares.needLoginJson(), 'h5.mall.applyExpress');
  app.post('/h5/mall2/cancelExpress', app.middlewares.needLoginJson(), 'h5.mall.cancelExpress');

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
  app.post('/private/work/typeAll', 'private.work.typeAll');
  app.post('/private/work/update', 'private.work.update');
  app.post('/private/work/delete', 'private.work.delete');
  app.post('/private/work/unDelete', 'private.work.unDelete');
  app.post('/private/work/addAuthor', 'private.work.addAuthor');
  app.post('/private/work/removeAuthor', 'private.work.removeAuthor');
  app.post('/private/work/addViews', 'private.work.addViews');
  app.post('/private/author/find', 'private.author.find');
  app.post('/private/author/create', 'private.author.create');
  app.post('/private/user/find', 'private.user.find');
  app.post('/private/user/increaseCoins', 'private.user.increaseCoins');
  app.post('/private/account', 'private.account.session');
  app.post('/private/comment/like', 'private.comment.like');
  app.post('/private/comment/unLike', 'private.comment.unLike');
  app.post('/private/comment/favor', 'private.comment.favor');
  app.post('/private/comment/unFavor', 'private.comment.unFavor');
};
