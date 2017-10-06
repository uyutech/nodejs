'use strict';

module.exports = app => {
  app.get('/404.html', 'error.c404');

  app.get('/m', 'm.index.index');
  app.get('/m/find', 'm.find.index');
  app.get('/m/works/:worksID', 'm.works.index');
  app.get('/m/author/:authorID', 'm.author.index');
  app.get('/m/search/:kw', 'm.search.index');

  app.post('/api/find/tagB', 'api.find.tagB');
  app.post('/api/find/playList', 'api.find.playList');
  app.post('/api/works/commentList', 'api.works.commentList');
  app.post('/api/author/tagB', 'api.author.tagB');
  app.post('/api/author/playList', 'api.author.playList');
  app.post('/api/author/commentList', 'api.author.commentList');

  app.get('/h5/version', 'h5.version.index');
  app.post('/h5/version', 'h5.version.index');
};
