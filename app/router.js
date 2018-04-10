'use strict';

module.exports = app => {
  app.get('/404.html', 'error.c404');
  app.get('/home/qr', 'error.qr');
  app.get('/oauth/weibo', 'oauth.weibo');
  app.get('/oauth/login', 'oauth.login');
  app.post('/oauth/session', 'oauth.session');

  app.get('/d', 'd.index.newIndex');
  app.get('/d/find', 'd.find.index');
  app.get('/d/works/:worksID', 'd.works.index');
  app.get('/d/works/:worksID/:workID', 'd.works.index');
  app.get('/d/musicalbum/:collectionID', 'd.collection.index');
  app.get('/d/author/:authorID', 'd.author.index');
  // app.get('/d/search/:kw', 'd.search.index');
  app.get('/d/my', app.middlewares.needLogin(), 'd.my.index');
  app.get('/d/my/message', app.middlewares.needLogin(), 'd.my.message');
  app.get('/d/login', 'd.login.index');
  // app.get('/d/upload', 'd.upload.index');
  // app.get('/d/guide.index', 'd.guide.index');
  app.get('/d/circle/:circleID', 'd.circle.index');
  app.get('/d/post/:id', 'd.post.index');
  app.get('/d/user/:userID', 'd.user.index');
  app.get('/d/circling', 'd.circling.index');
  app.get('/d/follow', app.middlewares.needLogin(), 'd.follow.index');
  app.get('/d/mall', 'd.mall.index');
  app.get('/d/mall/new', 'd.mall.new');
  app.get('/d/mall/wait', 'd.mall.wait');

  app.get('/m', 'm.index.newIndex');
  app.get('/m/find', 'm.find.index');
  app.get('/m/works/:worksID', 'm.works.index');
  app.get('/m/works/:worksID/:workID', 'm.works.index');
  app.get('/m/author/:authorID', 'm.author.index');
  // app.get('/m/search/:kw', 'm.search.index');
  app.get('/m/my', app.middlewares.needLogin(), 'm.my.index');
  app.get('/m/my/private', app.middlewares.needLogin(), 'm.my.private');
  app.get('/m/my/relation', app.middlewares.needLogin(), 'm.my.relation');
  app.get('/m/my/message', app.middlewares.needLogin(), 'm.my.message');
  app.get('/m/my/post', app.middlewares.needLogin(), 'm.my.post');
  app.get('/m/my/favor', app.middlewares.needLogin(), 'm.my.favor');
  app.get('/m/my/favorPic', app.middlewares.needLogin(), 'm.my.favorPic');
  app.get('/m/my/favorPost', app.middlewares.needLogin(), 'm.my.favorPost');
  app.get('/m/login', 'm.login.index');
  app.get('/m/circle/:circleID', 'm.circle.index');
  app.get('/m/circle/post', app.middlewares.needLogin(), 'm.circle.post');
  app.get('/m/post/:id', 'm.post.index');
  app.get('/m/user/:userID', 'm.user.index');
  app.get('/m/circling', 'm.circling.index');
  app.get('/m/follow', app.middlewares.needLogin(), 'm.follow.index');
  app.get('/m/subComment', app.middlewares.needLogin(), 'm.subComment.index');
  app.get('/m/subPost/:circleID', app.middlewares.needLogin(), 'm.subPost.index');
  app.get('/m/subPost', app.middlewares.needLogin(), 'm.subPost.index');
  app.get('/m/mall', 'm.mall.index');
  app.get('/m/mall/new', 'm.mall.new');
  app.get('/m/mall/wait', 'm.mall.wait');
  app.get('/m/mall/history', 'm.mall.history');
  app.get('/m/tag/:tag', 'm.tag.index');

  app.post('/api/login/loginOut', 'api.login.loginOut');

  app.post('/api/find/hotWorkList', 'api.find.hotWorkList');
  //TODO: del
  app.post('/api/find/hotPostList', 'api.find.hotPostList');
  app.post('/api/find/hotPlayList', 'api.find.hotPlayList');
  app.post('/api/find/hotPicList', 'api.find.hotPicList');

  app.post('/api/user/settle', app.middlewares.needLoginJson(), 'api.user.settle');
  app.post('/api/user/settleShadowName', app.middlewares.needLoginJson(), 'api.user.settleShadowName');
  app.post('/api/user/settleShadow', app.middlewares.needLoginJson(), 'api.user.settleShadow');
  app.post('/api/user/guideSuggest', app.middlewares.needLoginJson(), 'api.user.guideSuggest');
  app.post('/api/user/guideSave', app.middlewares.needLoginJson(), 'api.user.guideSave');
  app.post('/api/user/uploadPic', app.middlewares.needLoginJson(), 'api.user.uploadPic');
  app.post('/api/user/postList', 'api.user.postList');
  app.post('/api/user/follow', app.middlewares.needLoginJson(), 'api.user.follow');
  app.post('/api/user/unFollow', app.middlewares.needLoginJson(), 'api.user.unFollow');

  app.post('/api/my/updateNickName', app.middlewares.needLoginJson(), 'api.my.updateNickName');
  app.post('/api/my/uploadHead', app.middlewares.needLoginJson(), 'api.my.uploadHead');
  app.post('/api/my/updateSign', app.middlewares.needLoginJson(), 'api.my.updateSign');
  app.post('/api/my/updatePrivate', app.middlewares.needLoginJson(), 'api.my.updatePrivate');
  app.post('/api/my/message', app.middlewares.needLoginJson(), 'api.my.message');
  app.post('/api/my/readMessage', app.middlewares.needLoginJson(), 'api.my.readMessage');
  app.post('/api/my/altSettle', app.middlewares.needLoginJson(), 'api.my.altSettle');
  app.post('/api/my/friendList', app.middlewares.needLoginJson(), 'api.my.friendList');
  app.post('/api/my/followList', app.middlewares.needLoginJson(), 'api.my.followList');
  app.post('/api/my/followerList', app.middlewares.needLoginJson(), 'api.my.followerList');
  app.post('/api/my/followerAuthor', app.middlewares.needLoginJson(), 'api.my.followerAuthor');
  app.post('/api/my/postList', app.middlewares.needLoginJson(), 'api.my.postList');
  app.post('/api/my/favor', app.middlewares.needLoginJson(), 'api.my.favor');
  app.post('/api/my/favorPic', app.middlewares.needLoginJson(), 'api.my.favorPic');
  app.post('/api/my/favorPost', app.middlewares.needLoginJson(), 'api.my.favorPost');
  app.post('/api/my/sendPrize', app.middlewares.needLoginJson(), 'api.my.sendPrize');
  app.post('/api/my/cancelPrize', app.middlewares.needLoginJson(), 'api.my.cancelPrize');

  app.post('/api/works/commentList', 'api.works.commentList');
  app.post('/api/works/likeWork', app.middlewares.needLoginJson(), 'api.works.likeWork');
  app.post('/api/works/favorWork', app.middlewares.needLoginJson(), 'api.works.favorWork');
  app.post('/api/works/unFavorWork', app.middlewares.needLoginJson(), 'api.works.unFavorWork');
  app.post('/api/works/addComment', app.middlewares.needLoginJson(), 'api.works.addComment');
  app.post('/api/works/likeComment', app.middlewares.needLoginJson(), 'api.works.likeComment');
  app.post('/api/works/subCommentList', 'api.works.subCommentList');
  app.post('/api/works/delComment', app.middlewares.needLoginJson(), 'api.works.delComment');
  app.post('/api/works/photoList', 'api.works.photoList');
  app.post('/api/works/addPlayCount', 'api.works.addPlayCount');

  app.post('/api/author/commentList', 'api.author.commentList');
  app.post('/api/author/follow', app.middlewares.needLoginJson(), 'api.author.follow');
  app.post('/api/author/unFollow', app.middlewares.needLoginJson(), 'api.author.unFollow');
  app.post('/api/author/addComment', app.middlewares.needLoginJson(), 'api.author.addComment');
  app.post('/api/author/likeComment', app.middlewares.needLoginJson(), 'api.author.likeComment');
  app.post('/api/author/subCommentList', 'api.author.subCommentList');
  app.post('/api/author/delComment', app.middlewares.needLoginJson(), 'api.author.delComment');
  app.post('/api/author/maList', 'api.author.maList');
  app.post('/api/author/picList', 'api.author.picList');

  app.post('/api/circle/join', app.middlewares.needLoginJson(), 'api.circle.join');
  app.post('/api/circle/post', app.middlewares.needLoginJson(), 'api.circle.post');
  app.post('/api/circle/list', 'api.circle.list');

  app.post('/api/post/commentList', 'api.post.commentList');
  app.post('/api/post/addComment', app.middlewares.needLoginJson(), 'api.post.addComment');
  app.post('/api/post/likeComment', app.middlewares.needLoginJson(), 'api.post.likeComment');
  app.post('/api/post/subCommentList', 'api.post.subCommentList');
  app.post('/api/post/delComment', app.middlewares.needLoginJson(), 'api.post.delComment');
  app.post('/api/post/like', app.middlewares.needLoginJson(), 'api.post.like');
  app.post('/api/post/favor', app.middlewares.needLoginJson(), 'api.post.favor');
  app.post('/api/post/unFavor', app.middlewares.needLoginJson(), 'api.post.unFavor');
  app.post('/api/post/del', app.middlewares.needLoginJson(), 'api.post.del');

  app.post('/api/circling/list', 'api.circling.list');

  app.post('/api/follow/postList', 'api.follow.postList');

  app.post('/api/subComment', app.middlewares.needLogin(), 'api.subComment.index');

  app.get('/api/count/index', 'api.count.index');

  app.post('/api/subPost/tag', 'api.subPost.tag');
  app.post('/api/subPost/sub', app.middlewares.needLoginJson(), 'api.subPost.sub');

  app.post('/api/tag/list', 'api.tag.list');

  app.get('/app', 'h5.index.index');
  app.get('/h5/index', 'h5.index.index');
  app.get('/h5/version', 'h5.version.index');
  app.post('/h5/version', 'h5.version.index');

  app.post('/h5/oauth/weibo', 'h5.oauth.weibo');
  app.post('/h5/login/loginOut', app.middlewares.needLoginJson(), 'h5.login.loginOut');

  app.post('/h5/find/index', 'h5.find.index');
  app.post('/h5/find/hotWorkList', 'h5.find.hotWorkList');
  app.post('/h5/find/hotPlayList', 'h5.find.hotPlayList');
  app.post('/h5/find/hotPicList', 'h5.find.hotPicList');
  app.post('/h5/find/allWorks', 'h5.find.allWorks');
  app.post('/h5/find/allAlbums', 'h5.find.allAlbums');
  app.post('/h5/find/allAuthors', 'h5.find.allAuthors');
  app.post('/h5/find/allCircles', 'h5.find.allCircles');
  app.post('/h5/find/newIndex', 'h5.find.newIndex');
  app.post('/h5/find/recommendList', 'h5.find.recommendList');
  app.post('/h5/find/typeList', 'h5.find.typeList');
  app.post('/h5/find/itemList', 'h5.find.itemList');
  app.post('/h5/find/search', 'h5.find.search');

  app.post('/h5/circling/index', 'h5.circling.index');
  app.post('/h5/circling/circleList', 'h5.circling.circleList');
  app.post('/h5/circling/postList', 'h5.circling.postList');

  app.post('/h5/follow/index', app.middlewares.needLoginJson(), 'h5.follow.index');
  app.post('/h5/follow/postList', app.middlewares.needLoginJson(), 'h5.follow.postList');

  app.post('/h5/my/index', app.middlewares.needLoginJson(), 'h5.my.index');
  app.post('/h5/my/message', app.middlewares.needLoginJson(), 'h5.my.message');
  app.post('/h5/my/relation', app.middlewares.needLoginJson(), 'h5.my.relation');
  app.post('/h5/my/readMessage', app.middlewares.needLoginJson(), 'h5.my.readMessage');
  app.post('/h5/my/postList', app.middlewares.needLoginJson(), 'h5.my.postList');
  app.post('/h5/my/altIdentity', app.middlewares.needLoginJson(), 'h5.my.altIdentity');
  app.post('/h5/my/friendList', app.middlewares.needLoginJson(), 'h5.my.friendList');
  app.post('/h5/my/followList', app.middlewares.needLoginJson(), 'h5.my.followList');
  app.post('/h5/my/followerList', app.middlewares.needLoginJson(), 'h5.my.followerList');
  app.post('/h5/my/followerAuthor', app.middlewares.needLoginJson(), 'h5.my.followerAuthor');
  app.post('/h5/my/favor', app.middlewares.needLoginJson(), 'h5.my.favor');
  app.post('/h5/my/favorType', app.middlewares.needLoginJson(), 'h5.my.favorType');
  app.post('/h5/my/favorMV', app.middlewares.needLoginJson(), 'h5.my.favorMV');
  app.post('/h5/my/uploadPic', app.middlewares.needLoginJson(), 'h5.my.uploadPic');
  app.post('/h5/my/updateNickName', app.middlewares.needLoginJson(), 'h5.my.updateNickName');
  app.post('/h5/my/updateSign', app.middlewares.needLoginJson(), 'h5.my.updateSign');
  app.post('/h5/my/uploadHead', app.middlewares.needLoginJson(), 'h5.my.uploadHead');
  app.post('/h5/my/private', app.middlewares.needLoginJson(), 'h5.my.private');
  app.post('/h5/my/updatePrivate', app.middlewares.needLoginJson(), 'h5.my.updatePrivate');
  app.post('/h5/my/sendPrize', app.middlewares.needLoginJson(), 'h5.my.sendPrize');
  app.post('/h5/my/cancelPrize', app.middlewares.needLoginJson(), 'h5.my.cancelPrize');
  app.post('/h5/my/settle', app.middlewares.needLoginJson(), 'h5.my.settle');
  app.post('/h5/my/authorRelevant', app.middlewares.needLoginJson(), 'h5.my.authorRelevant');
  app.post('/h5/my/shield', app.middlewares.needLoginJson(), 'h5.my.shield');
  app.post('/h5/my/shieldUser', app.middlewares.needLoginJson(), 'h5.my.shieldUser');
  app.post('/h5/my/shieldCircle', app.middlewares.needLoginJson(), 'h5.my.shieldCircle');
  app.post('/h5/my/identity', app.middlewares.needLoginJson(), 'h5.my.identity');
  app.get('/h5/my/identity', app.middlewares.needLoginJson(), 'h5.my.identity');
  app.post('/h5/my/sts', 'h5.my.sts');

  app.post('/h5/works/index', 'h5.works.index');
  app.post('/h5/works/commentList', 'h5.works.commentList');
  app.post('/h5/works/likeWork', app.middlewares.needLoginJson(), 'h5.works.likeWork');
  app.post('/h5/works/favorWork', app.middlewares.needLoginJson(), 'h5.works.favorWork');
  app.post('/h5/works/unFavorWork', app.middlewares.needLoginJson(), 'h5.works.unFavorWork');
  app.post('/h5/works/likeComment', app.middlewares.needLoginJson(), 'h5.works.likeComment');
  app.post('/h5/works/subCommentList', 'h5.works.subCommentList');
  app.post('/h5/works/delComment', app.middlewares.needLoginJson(), 'h5.works.delComment');
  app.post('/h5/works/photoList', 'h5.works.photoList');
  app.post('/h5/works/addPlayCount', 'h5.works.addPlayCount');

  app.post('/h5/circle/index', 'h5.circle.index');
  app.post('/h5/circle/postList', 'h5.circle.postList');
  app.post('/h5/circle/join', app.middlewares.needLoginJson(), 'h5.circle.join');
  app.post('/h5/circle/post', app.middlewares.needLoginJson(), 'h5.circle.post');
  app.post('/h5/circle/shield', app.middlewares.needLoginJson(), 'h5.circle.shield');
  app.post('/h5/circle/unShield', app.middlewares.needLoginJson(), 'h5.circle.unShield');

  app.post('/h5/author/index', 'h5.author.index');
  app.post('/h5/author/newIndex', 'h5.author.newIndex');
  app.post('/h5/author/itemList', 'h5.author.itemList');
  app.post('/h5/author/addComment', app.middlewares.needLoginJson(), 'h5.author.addComment');
  app.post('/h5/author/likeComment', app.middlewares.needLoginJson(), 'h5.author.likeComment');
  app.post('/h5/author/subCommentList', 'h5.author.subCommentList');
  app.post('/h5/author/delComment', app.middlewares.needLoginJson(), 'h5.author.delComment');
  app.post('/h5/author/follow', app.middlewares.needLoginJson(), 'h5.author.follow');
  app.post('/h5/author/unFollow', app.middlewares.needLoginJson(), 'h5.author.unFollow');
  app.post('/h5/author/commentList', 'h5.author.commentList');
  app.post('/h5/author/maList', 'h5.author.maList');
  app.post('/h5/author/picList', 'h5.author.picList');
  app.post('/h5/author/dynamic', 'h5.author.dynamic');

  app.post('/h5/works/addComment', app.middlewares.needLoginJson(), 'h5.works.addComment');

  app.post('/h5/subpost/index', 'h5.subpost.index');
  app.post('/h5/subpost/tag', 'h5.subpost.tag');
  app.post('/h5/subpost/moreTag', 'h5.subpost.moreTag');
  app.post('/h5/subpost/list', 'h5.subpost.list');

  app.post('/h5/post/index', 'h5.post.index');
  app.post('/h5/post/like', app.middlewares.needLoginJson(), 'h5.post.like');
  app.post('/h5/post/favor', app.middlewares.needLoginJson(), 'h5.post.favor');
  app.post('/h5/post/unFavor', app.middlewares.needLoginJson(), 'h5.post.unFavor');
  app.post('/h5/post/del', app.middlewares.needLoginJson(), 'h5.post.del');
  app.post('/h5/post/commentList', 'h5.post.commentList');
  app.post('/h5/post/subCommentList', 'h5.post.subCommentList');
  app.post('/h5/post/addComment', app.middlewares.needLoginJson(), 'h5.post.addComment');
  app.post('/h5/post/likeComment', app.middlewares.needLoginJson(), 'h5.post.likeComment');
  app.post('/h5/post/delComment', app.middlewares.needLoginJson(), 'h5.post.delComment');
  app.post('/h5/post/recommend', app.middlewares.needLoginJson(), 'h5.post.recommend');
  app.post('/h5/post/unRecommend', app.middlewares.needLoginJson(), 'h5.post.unRecommend');
  app.post('/h5/post/clean', app.middlewares.needLoginJson(), 'h5.post.clean');

  app.post('/h5/user/index', 'h5.user.index');

  app.post('/h5/user/postList', 'h5.user.postList');
  app.post('/h5/user/follow', app.middlewares.needLoginJson(), 'h5.user.follow');
  app.post('/h5/user/unFollow', app.middlewares.needLoginJson(), 'h5.user.unFollow');
  app.post('/h5/user/shield', app.middlewares.needLoginJson(), 'h5.user.shield');
  app.post('/h5/user/unShield', app.middlewares.needLoginJson(), 'h5.user.unShield');

  app.post('/h5/comment/sub', app.middlewares.needLoginJson(), 'h5.comment.sub');

  app.post('/h5/mall', 'h5.mall.index');
  app.post('/h5/mall/new', 'h5.mall.new');
  app.post('/h5/mall/wait', 'h5.mall.wait');

  app.post('/h5/tag/list', 'h5.tag.list');

  app.post('/h5/passport/code', 'h5.passport.code');
  app.post('/h5/passport/login', 'h5.passport.login');
  app.post('/h5/passport/register', 'h5.passport.register');
  app.post('/h5/passport/reset', 'h5.passport.reset');
  app.post('/h5/passport/bindPhone', app.middlewares.needLoginJson(), 'h5.passport.bindPhone');
  app.post('/h5/passport/bindOauth', app.middlewares.needLoginJson(), 'h5.passport.bindOauth');
  app.post('/h5/passport/guideNameAndSex', app.middlewares.needLoginJson(), 'h5.passport.guideNameAndSex');
  app.post('/h5/passport/guideCircleList', app.middlewares.needLoginJson(), 'h5.passport.guideCircleList');
  app.post('/h5/passport/guideCircle', app.middlewares.needLoginJson(), 'h5.passport.guideCircle');
  app.post('/h5/passport/guideAuthorList', app.middlewares.needLoginJson(), 'h5.passport.guideAuthorList');
  app.post('/h5/passport/guideAuthor', app.middlewares.needLoginJson(), 'h5.passport.guideAuthor');
  app.post('/h5/passport/merge', app.middlewares.needLoginJson(), 'h5.passport.merge');
  app.post('/h5/passport/mergeOauth', app.middlewares.needLoginJson(), 'h5.passport.mergeOauth');

  app.post('/h5/playlist/index', 'h5.playlist.index');

  app.post('/h5/report/index', app.middlewares.needLoginJson(), 'h5.report.index');

  app.get('/h5/stats/visit', 'h5.stats.visit');

  app.post('/mns/mts/job', 'mns.mts.job');

  app.get('/d/works2/:worksId', 'd2.works.index');
  app.get('/d/works2/:worksId/:workId', 'd2.works.index');

  app.get('/d/author2/:authorId', 'd2.author.index');

  app.get('/d/post2/:postId', 'd2.post.index');

  app.post('/d/api2/works/comment', 'api2.works.comment');
  app.post('/d/api2/works/like', app.middlewares.needLoginJson(), 'api2.works.like');
  app.post('/d/api2/works/favor', app.middlewares.needLoginJson(), 'api2.works.favor');

  app.post('/d/api2/author/comment', 'api2.author.comment');

  app.post('/d/api2/post/comment', 'api2.post.comment');

  app.get('/count/worksCommentNum', app.middlewares.needLoginJson(), 'count.worksCommentNum');
  app.get('/count/authorCommentNum', app.middlewares.needLoginJson(), 'count.authorCommentNum');

  app.post('/h5/works2/index', 'h52.works.index');
  app.post('/h5/works2/commentList', 'h52.works.commentList');
  app.post('/h5/works2/like', app.middlewares.needLoginJson(), 'h52.works.like');
  app.post('/h5/works2/favor', app.middlewares.needLoginJson(), 'h52.works.favor');
  app.post('/h5/works2/unLike', app.middlewares.needLoginJson(), 'h52.works.unLike');
  app.post('/h5/works2/unFavor', app.middlewares.needLoginJson(), 'h52.works.unFavor');

  app.post('/h5/author2/index', 'h52.author.index');
  app.post('/h5/author2/commentList', 'h52.author.commentList');
  app.post('/h5/author2/kindWork', 'h52.author.kindWork');
  app.post('/h5/author2/follow', app.middlewares.needLoginJson(), 'h52.author.follow');
  app.post('/h5/author2/unFollow', app.middlewares.needLoginJson(), 'h52.author.unFollow');

  app.post('/h5/circle2/index', 'h52.circle.index');
  app.post('/h5/circle2/postList', 'h52.circle.postList');
  app.post('/h5/circle2/all', 'h52.circle.all');

  app.post('/h5/post2/index', 'h52.post.index');
  app.post('/h5/post2/commentList', 'h52.post.commentList');

  app.post('/h5/subpost2/index', 'h52.subpost.index');
  app.post('/h5/subpost2/sub', app.middlewares.needLoginJson(), 'h52.subpost.sub');

  app.post('/h5/user2/index', 'h52.user.index');
  app.post('/h5/user2/postList', 'h52.user.postList');
  app.post('/h5/user2/follow', app.middlewares.needLoginJson(), 'h52.user.follow');
  app.post('/h5/user2/unFollow', app.middlewares.needLoginJson(), 'h52.user.unFollow');


  app.post('/h5/find2/index', 'h52.find.index');
  app.post('/h5/find2/tag', 'h52.find.tag');

  app.post('/h5/circling2/index', 'h52.circling.index');
  app.post('/h5/circling2/circleList', 'h52.circling.circleList');
  app.post('/h5/circling2/postList', 'h52.circling.postList');

  app.post('/h5/follow2/index', app.middlewares.needLoginJson(), 'h52.follow.index');
  app.post('/h5/follow2/circle', app.middlewares.needLoginJson(), 'h52.follow.circle');
  app.post('/h5/follow2/postList', app.middlewares.needLoginJson(), 'h52.follow.postList');

  app.post('/h5/my2/index', app.middlewares.needLoginJson(), 'h52.my.index');
  app.post('/h5/my2/postList', app.middlewares.needLoginJson(), 'h52.my.postList');
  app.post('/h5/my2/favorList', app.middlewares.needLoginJson(), 'h52.my.favorList');
  app.post('/h5/my2/relation2', app.middlewares.needLoginJson(), 'h52.my.relation');
  app.post('/h5/my2/nickname', app.middlewares.needLoginJson(), 'h52.my.nickname');
  app.post('/h5/my2/sign', app.middlewares.needLoginJson(), 'h52.my.sign');

  app.post('/h5/comment2/like', app.middlewares.needLoginJson(), 'h52.comment.like');
  app.post('/h5/comment2/unLike', app.middlewares.needLoginJson(), 'h52.comment.unLike');
  app.post('/h5/comment2/favor', app.middlewares.needLoginJson(), 'h52.comment.favor');
  app.post('/h5/comment2/unFavor', app.middlewares.needLoginJson(), 'h52.comment.unFavor');
  app.post('/h5/comment2/sub', app.middlewares.needLoginJson(), 'h52.comment.sub');

  app.post('/h5/tag2/index', 'h52.tag.index');
  app.post('/h5/tag2/postList', 'h52.tag.postList');

  app.post('/h5/search2/author', 'h52.search.author');
  app.post('/h5/search2/user', 'h52.search.user');
  app.post('/h5/search2/works', 'h52.search.works');
  app.post('/h5/search2/tag', 'h52.search.tag');
};
