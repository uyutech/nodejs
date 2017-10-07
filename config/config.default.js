'use strict';

module.exports = appInfo => {
  const config = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = 'circling_1506760927505_8735';

  config.session = {
    key: 'sessionid',
    maxAge: 30 * 24 * 3600 * 1000,
  };

  // add your config here
  config.middleware = ['d2m', 'm2d', 'user'];
  config.d2m = {
    match: '/d',
  };
  config.m2d = {
    match: '/m',
  };
  config.user = {
    match: function(ctx) {
      if(ctx.request.path.startsWith('/m/')) {
        return true;
      }
      if(ctx.request.path.startsWith('/d/')) {
        return true;
      }
      if(ctx.request.path.startsWith('/api/')) {
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

  config.security = {
    csrf: {
      ignoreJSON: true, // 默认为 false，当设置为 true 时，将会放过所有 content-type 为 `application/json` 的请求
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
