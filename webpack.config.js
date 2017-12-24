const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractLESS = new ExtractTextPlugin('[name].css');
const webpack = require("webpack");

module.exports = {
  entry: {
    mcommon: './app/assets/m/common/index.js',
    mfind: './app/assets/m/find/index.jsx',
    mworks: './app/assets/m/works/index.jsx',
    mauthor: './app/assets/m/author/index.jsx',
    mmy: './app/assets/m/my/index.jsx',
    mmy_private: './app/assets/m/my/private/index.jsx',
    mmy_message: './app/assets/m/my/message/index.jsx',
    mmy_relation: './app/assets/m/my/relation/index.jsx',
    mmy_post: './app/assets/m/my/post/index.jsx',
    mmy_favor: './app/assets/m/my/favor/index.jsx',
    mmy_favor_pic: './app/assets/m/my/favor/pic/index.jsx',
    mmy_favor_post: './app/assets/m/my/favor/post/index.jsx',
    mlogin: './app/assets/m/login/index.jsx',
    mpost: './app/assets/m/post/index.jsx',
    mcircle: './app/assets/m/circle/index.jsx',
    mcpost: './app/assets/m/circle/mcpost.jsx',
    muser: './app/assets/m/user/index.jsx',
    mcircling: './app/assets/m/circling/index.jsx',
    mfollow: './app/assets/m/follow/index.jsx',
    msubcomment: './app/assets/m/subcomment/index.jsx',
    mmall: './app/assets/m/mall/index.jsx',
    mmall_new: './app/assets/m/mall/new/index.jsx',
    mmall_wait: './app/assets/m/mall/wait/index.jsx',
    mmall_history: './app/assets/m/mall/history/index.jsx',
    mtag: './app/assets/m/tag/index.jsx',
    dcommon: './app/assets/d/common/index.js',
    dindex: './app/assets/d/index/index.jsx',
    dfind: './app/assets/d/find/index.jsx',
    dworks: './app/assets/d/works/index.jsx',
    dauthor: './app/assets/d/author/index.jsx',
    dmy: './app/assets/d/my/index.jsx',
    dmy_message: './app/assets/d/my/message/index.jsx',
    dlogin: './app/assets/d/login/index.jsx',
    dupload: './app/assets/d/upload/index.jsx',
    dguide: './app/assets/d/guide/index.jsx',
    dpost: './app/assets/d/post/index.jsx',
    dcircle: './app/assets/d/circle/index.jsx',
    duser: './app/assets/d/user/index.jsx',
    dcircling: './app/assets/d/circling/index.jsx',
    dfollow: './app/assets/d/follow/index.jsx',
  },
  output: {
    path: __dirname + '/app/public',
    filename: '[name].js'
  },
  devServer: {
    contentBase: './app/public'
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        use: [
          {
            loader: 'babel-loader',
            options: { presets: ['es2015'] }
          },
          {
            loader: 'migi-loader'
          }
        ]
      },
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: { presets: ['es2015'] }
          }
        ]
      },
      {
        test: /\.less$/,
        use: extractLESS.extract(['css-loader', 'autoprefixer-loader', 'less-loader'])
      },
      {
        test: /(\.jpg)|(\.jpeg)|(\.gif)|(\.png)$/,
        use: 'url-loader?limit=10240&name=[path][name].[ext]'
      },
      {
        test: /\.(html?)|(\.mp\d)$/,
        use: 'file-loader?name=[path][name].[ext]'
      }
    ]
  },
  plugins: [
    extractLESS
  ],
  resolve: {
    alias: {
    }
  }
};
