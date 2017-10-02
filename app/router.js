'use strict';

module.exports = app => {
  app.get('/404.html', 'error.c404');
  app.get('/m/find', 'm.find.index');
  app.post('/api/find/playList', 'api.find.playList')
};
