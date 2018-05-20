'use strict';

const path = require('path');

module.exports = appInfo => {
  let config = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = 'circling_1506760927505_8735';

  config.session = {
    key: 'sessionid',
    maxAge: 7 * 24 * 3600 * 1000,
    domain: 'circling.cc',
  };

  // add your config here
  config.middleware = ['d2m', 'm2d', 'crossDomain', 'jsConfig', 'report', 'cmsAccount'];
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
  config.crossDomain = {
    match: function(ctx) {
      if(ctx.request.path.startsWith('/h5/')) {
        return true;
      }
      if(ctx.request.path.startsWith('/h52/')) {
        return true;
      }
      return false;
    },
  };
  config.cmsAccount = {
    match: '/cms',
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
      password: 'uyuTech123',
      db: 0,
    },
    time: 60,
    shortTime: 10,
    mediumTime: 300,
    longTime: 600,
  };

  config.notfound = {
    pageUrl: '/404.html',
  };

  config.onerror = {
    errorPageUrl: '/404.html',
  };

  config.bodyParser = {
    jsonLimit: '20mb',
    formLimit: '20mb',
  };

  config.security = {
    csrf: {
      ignore: function(ctx) {
        if(ctx.request.path.startsWith('/h5')) {
          return true;
        }
        if(ctx.request.path.startsWith('/h52')) {
          return true;
        }
        if(ctx.request.path.startsWith('/mns')) {
          return true;
        }
        if(ctx.request.path.startsWith('/oauth/session')) {
          return true;
        }
        if(ctx.request.path.startsWith('/private')) {
          return true;
        }
        return false;
      },
    },
  };

  config.database = {
    circling: {
      name: 'circling',
      username: 'uyutech',
      password: 'uyuTech2017',
      host: 'rm-uf6qe904j4997hpen.mysql.rds.aliyuncs.com',
    },
    mall: {
      name: 'mall',
      username: 'uyutech',
      password: 'uyuTech2017',
      host: 'rm-uf6qe904j4997hpen.mysql.rds.aliyuncs.com',
    },
    recommend: {
      name: 'recommend',
      username: 'uyutech',
      password: 'uyuTech2017',
      host: 'rm-uf6qe904j4997hpen.mysql.rds.aliyuncs.com',
    },
    stats: {
      name: 'stats',
      username: 'uyutech',
      password: 'uyuTech2017',
      host: 'rm-uf6j2h04az726ui85.mysql.rds.aliyuncs.com',
    },
    cms: {
      name: 'cms',
      username: 'uyutech',
      password: 'uyuTech2017',
      host: 'rm-uf6qe904j4997hpen.mysql.rds.aliyuncs.com',
    },
  };

  config.weibo = {
    appKey: '2345825162',
    appSecret: '262e0bd1f13a614636ad5c748db20f15',
    redirect: 'https://circling.cc/oauth/login',
  };

  return config;
};
