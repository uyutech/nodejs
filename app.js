/**
 * Created by army8735 on 2017/9/30.
 */

'use strict';

const Sequelize = require('sequelize');

module.exports = app => {
  app.beforeStart(function* () {
    // app.logger.info('env: %s', app.config.env);
    // app.logger.info('hotDeploy: %s', app.config.hotDeploy);
    if(app.config.hotDeploy) {
      // static的webpack
      const webpack = require('webpack');
      const webpackConfig = require('./webpack.config');
      let compiler = webpack(webpackConfig);
      compiler.watch({
        ignored: /node_modules/,
      }, function(err, status) {
        // app.logger.info('webpack watch: %s', !!status);
      });
      // migi pre
      const webpackConfig2 = require('./webpack.node');
      let compiler2 = webpack(webpackConfig2);
      compiler2.watch({
        ignored: /node_modules/,
      }, function(err, status) {
        // app.logger.info('webpack watch: %s', !!status);
      });
    }
    if(app.config.database) {

    }
  });
};
