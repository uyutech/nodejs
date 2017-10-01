'use strict';

module.exports = appInfo => {
  const config = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = 'circling_1506760927505_8735';

  // add your config here
  config.middleware = [];

  config.view = {
    defaultViewEngine: 'migi',
    defaultExtension: '.js',
  };

  return config;
};
