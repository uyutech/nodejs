'use strict';

module.exports = app => {
  app.get('/m/find', 'm.find.index');
  app.post('/api/find/playList', 'api.find.playList')
};
