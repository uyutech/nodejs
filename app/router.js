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

  app.get('/m', 'm.find.index');
  app.get('/m/find', 'm.find.index');
  app.get('/m/works/:worksID', 'm.works.index');
  app.get('/m/works/:worksID/:workID', 'm.works.index');
  app.get('/m/author/:authorID', 'm.author.index');
  // app.get('/m/search/:kw', 'm.search.index');
  app.get('/m/my', app.middlewares.needLogin(), 'm.my.index');
  app.get('/m/my/message', app.middlewares.needLogin(), 'm.my.message');
  app.get('/m/login', 'm.login.index');
  app.get('/m/circle/:circleID', 'm.circle.index');
  app.get('/m/circle/post', app.middlewares.needLogin(), 'm.circle.post');
  app.get('/m/post/:id', 'm.post.index');
  app.get('/m/user/:userID', 'm.user.index');

  app.post('/api/login/loginOut', 'api.login.loginOut');

  app.post('/api/find/hotWorkList', 'api.find.hotWorkList');
  app.post('/api/find/hotPostList', 'api.find.hotPostList');

  app.post('/api/user/settle', app.middlewares.needLoginJson(), 'api.user.settle');
  app.post('/api/user/settleShadowName', app.middlewares.needLoginJson(), 'api.user.settleShadowName');
  app.post('/api/user/settleShadow', app.middlewares.needLoginJson(), 'api.user.settleShadow');
  app.post('/api/user/guideSuggest', app.middlewares.needLoginJson(), 'api.user.guideSuggest');
  app.post('/api/user/guideSave', app.middlewares.needLoginJson(), 'api.user.guideSave');
  app.post('/api/user/altSettle', app.middlewares.needLoginJson(), 'api.user.altSettle');
  app.post('/api/user/uploadPic', app.middlewares.needLoginJson(), 'api.user.uploadPic');
  app.post('/api/user/postList', 'api.user.postList');
  // app.post('/api/user/labelList', app.middlewares.needLoginJson(), 'api.user.labelList');
  // app.post('/api/user/addLabel', app.middlewares.needLoginJson(), 'api.user.addLabel');

  app.post('/api/my/updateNickName', app.middlewares.needLoginJson(), 'api.my.updateNickName');
  app.post('/api/my/uploadHead', app.middlewares.needLoginJson(), 'api.my.uploadHead');
  app.post('/api/my/updateSign', app.middlewares.needLoginJson(), 'api.my.updateSign');
  app.post('/api/my/message', app.middlewares.needLoginJson(), 'api.my.message');
  app.post('/api/my/readMessage', app.middlewares.needLoginJson(), 'api.my.readMessage');
  app.post('/api/my/postList', app.middlewares.needLoginJson(), 'api.my.postList');

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

  app.post('/api/author/tagB', 'api.author.tagB');
  app.post('/api/author/playList', 'api.author.playList');
  app.post('/api/author/commentList', 'api.author.commentList');
  app.post('/api/author/follow', app.middlewares.needLoginJson(), 'api.author.follow');
  app.post('/api/author/unFollow', app.middlewares.needLoginJson(), 'api.author.unFollow');
  app.post('/api/author/addComment', app.middlewares.needLoginJson(), 'api.author.addComment');
  app.post('/api/author/likeComment', app.middlewares.needLoginJson(), 'api.author.likeComment');
  app.post('/api/author/subCommentList', 'api.author.subCommentList');
  app.post('/api/author/delComment', app.middlewares.needLoginJson(), 'api.author.delComment');
  app.post('/api/author/singleComment', 'api.author.singleComment');
  app.post('/api/author/searchWorks', 'api.author.searchWorks');

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

  app.get('/h5/version', 'h5.version.index');
  app.post('/h5/version', 'h5.version.index');
};
