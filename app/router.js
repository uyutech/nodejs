'use strict';

module.exports = app => {
  app.get('/404.html', 'error.c404');

  app.get('/m', 'm.index.index');
  app.get('/m/find', 'm.find.index');
  app.get('/m/works/:worksID', 'm.works.index');
  app.get('/m/author/:authorID', 'm.author.index');

  app.post('/api/find/playList', 'api.find.playList');
  app.post('/api/works/commentList', 'api.works.commentList');
};
