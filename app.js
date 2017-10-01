/**
 * Created by army8735 on 2017/9/30.
 */

'use strict';

const fs = require('fs');

module.exports = app => {
  app.beforeStart(function* () {
    app.logger.info('env: %s', app.config.env);
    app.logger.info('hotDeploy: %s', app.config.hotDeploy);
    if(app.config.hotDeploy) {
      // const lefty = require('lefty');
      // const babelCore = require('babel-core');
      // // 侦听view的jsx
      // let viewRoot = app.config.view.root;
      // app.logger.info('viewRoot: %j', viewRoot);
      // if(!Array.isArray(viewRoot)) {
      //   viewRoot = [viewRoot];
      // }
      // viewRoot.forEach(function(file) {
      //   app.watcher.watch(file, (data) => {
      //     if(data.isFile && data.path.endsWith('.jsx')) {
      //       if(data.remove) {
      //         fs.unlink(data.path);
      //       }
      //       else {
      //         let content = fs.readFileSync(data.path, 'utf-8');
      //         let res = babelCore.transform(lefty.parse(content), {
      //           presets: [ 'babel-preset-es2015' ],
      //         }).code;
      //         fs.writeFileSync(data.path.replace(/\.jsx$/, '.js'), res);
      //       }
      //     }
      //   });
      // });
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
  });
};
