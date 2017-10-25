'use strict';

const path = require('path');

module.exports = appInfo => {
  let config = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = 'circling_1506760927505_8735';

  config.session = {
    key: 'sessionid',
    maxAge: 30 * 24 * 3600 * 1000,
    domain: '.circling.cc',
  };

  // add your config here
  config.middleware = ['report', 'd2m', 'm2d', 'jsConfig', 'migiReset'];
  config.d2m = {
    match: '/d',
  };
  config.m2d = {
    match: '/m',
  };
  config.jsConfig = {
    match: function(ctx) {
      if(ctx.request.path.startsWith('/m/')) {
        return true;
      }
      if(ctx.request.path.startsWith('/d/')) {
        return true;
      }
      return false;
    },
  };
  config.migiReset = {
    match: function(ctx) {
      if(ctx.request.path.startsWith('/m/')) {
        return true;
      }
      if(ctx.request.path.startsWith('/d/')) {
        return true;
      }
      return false;
    },
  };

  config.view = {
    defaultViewEngine: 'migi',
    defaultExtension: '.js',
    mapping: {
      '.html': 'nunjucks',
      '.htm': 'nunjucks'
    },
  };

  config.customLogger = {
    serviceLogger: {
      file: path.join(appInfo.root, 'service.log'),
    },
  };

  config.redis = {
    client: {
      port: 6379,
      host: '127.0.0.1',
      password: 'army8735',
      db: 0,
    },
  };

  config.notfound = {
    pageUrl: '/404.html',
  };

  config.onerror = {
    errorPageUrl: '/404.html',
  };

  return config;
};
