const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractLESS = new ExtractTextPlugin('[name].css');
const webpack = require("webpack");

module.exports = {
  entry: {
    mcommon: './app/assets/m/common/index.js',
    mfind: './app/assets/m/find/index.jsx',
    mworks: './app/assets/m/works/index.jsx',
    mauthor: './app/assets/m/author/index.jsx',
    msearch: './app/assets/m/search/index.jsx',
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
        use: extractLESS.extract([ 'css-loader', 'autoprefixer-loader', 'less-loader' ])
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
