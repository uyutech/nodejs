'use strict';

module.exports = app => {
  app.get('/404.html', 'error.c404');
  app.get('/home/qr', 'error.qr');
  app.get('/oauth/weibo', 'oauth.weibo');
  app.get('/oauth/login', 'oauth.login');

  app.get('/d', 'd.index.index');
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

  app.get('/m', 'm.find.index');
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
  // app.post('/api/user/labelList', app.middlewares.needLoginJson(), 'api.user.labelList');
  // app.post('/api/user/addLabel', app.middlewares.needLoginJson(), 'api.user.addLabel');

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

  app.post('/api/works/detail', 'api.works.detail');
  app.post('/api/works/commentList', 'api.works.commentList');
  app.post('/api/works/likeWork', app.middlewares.needLoginJson(), 'api.works.likeWork');
  app.post('/api/works/favorWork', app.middlewares.needLoginJson(), 'api.works.favorWork');
  app.post('/api/works/unFavorWork', app.middlewares.needLoginJson(), 'api.works.unFavorWork');
  app.post('/api/works/addComment', app.middlewares.needLoginJson(), 'api.works.addComment');
  app.post('/api/works/likeComment', app.middlewares.needLoginJson(), 'api.works.likeComment');
  app.post('/api/works/subCommentList', 'api.works.subCommentList');
  app.post('/api/works/delComment', app.middlewares.needLoginJson(), 'api.works.delComment');
  app.post('/api/works/photoList', 'api.works.photoList');
  app.post('/api/works/addTempLink', app.middlewares.needLoginJson(), 'api.works.addTempLink');

  app.post('/api/author/commentList', 'api.author.commentList');
  app.post('/api/author/follow', app.middlewares.needLoginJson(), 'api.author.follow');
  app.post('/api/author/unFollow', app.middlewares.needLoginJson(), 'api.author.unFollow');
  app.post('/api/author/addComment', app.middlewares.needLoginJson(), 'api.author.addComment');
  app.post('/api/author/likeComment', app.middlewares.needLoginJson(), 'api.author.likeComment');
  app.post('/api/author/subCommentList', 'api.author.subCommentList');
  app.post('/api/author/delComment', app.middlewares.needLoginJson(), 'api.author.delComment');
  app.post('/api/author/maList', 'api.author.maList');

  app.post('/api/circle/join', app.middlewares.needLoginJson(), 'api.circle.join');
  app.post('/api/circle/add', app.middlewares.needLoginJson(), 'api.circle.add');
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

  app.get('/h5/version', 'h5.version.index');
  app.post('/h5/version', 'h5.version.index');

  app.post('/h5/oauth/weibo', 'h5.oauth.weibo');
  app.post('/h5/login/loginOut', app.middlewares.needLoginJson(), 'h5.login.loginOut');

  app.post('/h5/find/index', 'h5.find.index');
  app.post('/h5/find/hotWorkList', 'h5.find.hotWorkList');

  app.post('/h5/circling/index', 'h5.circling.index');
  app.post('/h5/circling/postList', 'h5.circling.postList');

  app.post('/h5/follow/index', app.middlewares.needLoginJson(), 'h5.follow.index');
  app.post('/h5/follow/postList', app.middlewares.needLoginJson(), 'h5.follow.postList');

  app.post('/h5/my/index', app.middlewares.needLoginJson(), 'h5.my.index');
  app.post('/h5/my/message', app.middlewares.needLoginJson(), 'h5.my.message');
  app.post('/h5/my/relation', app.middlewares.needLoginJson(), 'h5.my.relation');
  app.post('/h5/my/readMessage', app.middlewares.needLoginJson(), 'h5.my.readMessage');
  app.post('/h5/my/postList', app.middlewares.needLoginJson(), 'h5.my.postList');
  app.post('/h5/my/altSettle', app.middlewares.needLoginJson(), 'h5.my.altSettle');
  app.post('/h5/my/friendList', app.middlewares.needLoginJson(), 'h5.my.friendList');
  app.post('/h5/my/followList', app.middlewares.needLoginJson(), 'h5.my.followList');
  app.post('/h5/my/followerList', app.middlewares.needLoginJson(), 'h5.my.followerList');
  app.post('/h5/my/followerAuthor', app.middlewares.needLoginJson(), 'h5.my.followerAuthor');
  app.post('/h5/my/favor', app.middlewares.needLoginJson(), 'h5.my.favor');
  app.post('/h5/my/favorMV', app.middlewares.needLoginJson(), 'h5.my.favorMV');
  app.post('/h5/my/favorPic', app.middlewares.needLoginJson(), 'h5.my.favorPic');
  app.post('/h5/my/favorPost', app.middlewares.needLoginJson(), 'h5.my.favorPost');
  app.post('/h5/my/uploadPic', app.middlewares.needLoginJson(), 'h5.my.uploadPic');
  app.post('/h5/my/updateNickName', app.middlewares.needLoginJson(), 'h5.my.updateNickName');
  app.post('/h5/my/updateSign', app.middlewares.needLoginJson(), 'h5.my.updateSign');
  app.post('/h5/my/uploadHead', app.middlewares.needLoginJson(), 'h5.my.uploadHead');

  app.post('/h5/works/index', 'h5.works.index');
  app.post('/h5/works/commentList', 'h5.works.commentList');
  app.post('/h5/works/likeWork', 'h5.works.likeWork');
  app.post('/h5/works/favorWork', 'h5.works.favorWork');
  app.post('/h5/works/unFavorWork', 'h5.works.unFavorWork');
  app.post('/h5/works/likeComment', app.middlewares.needLoginJson(), 'api.works.likeComment');
  app.post('/h5/works/subCommentList', 'api.works.subCommentList');
  app.post('/h5/works/delComment', app.middlewares.needLoginJson(), 'api.works.delComment');
  app.post('/h5/works/photoList', 'api.works.photoList');

  app.post('/h5/circle/index', 'h5.circle.index');
  app.post('/h5/circle/postList', 'h5.circle.postList');
  app.post('/h5/circle/join', 'h5.circle.join');
  app.post('/h5/circle/post', app.middlewares.needLoginJson(), 'h5.circle.post');

  app.post('/h5/author/index', 'h5.author.index');
  app.post('/h5/author/addComment', app.middlewares.needLoginJson(), 'h5.author.addComment');
  app.post('/h5/author/likeComment', app.middlewares.needLoginJson(), 'h5.author.likeComment');
  app.post('/h5/author/subCommentList', 'h5.author.subCommentList');
  app.post('/h5/author/delComment', app.middlewares.needLoginJson(), 'h5.author.delComment');
  app.post('/h5/works/addComment', app.middlewares.needLoginJson(), 'h5.works.addComment');

  app.post('/h5/subpost/index', 'h5.subpost.index');

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

  app.post('/h5/user/index', 'h5.user.index');

  app.post('/h5/user/postList', 'h5.user.postList');
  app.post('/h5/user/follow', app.middlewares.needLoginJson(), 'h5.user.follow');
  app.post('/h5/user/unFollow', app.middlewares.needLoginJson(), 'h5.user.unFollow');

  app.post('/h5/comment/sub', app.middlewares.needLoginJson(), 'h5.comment.sub');
};
