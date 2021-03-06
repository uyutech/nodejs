const webpack = require("webpack");

module.exports = {
  entry: {
    // mfind: './app/view/m/find.jsx',
    mindex: './app/view/m/index.jsx',
    mworks: './app/view/m/works.jsx',
    // mauthor: './app/view/m/author.jsx',
    // msearch: './app/view/m/search.jsx',
    // mmy: './app/view/m/my.jsx',
    // mmy_private: './app/view/m/my/private.jsx',
    // mmy_message: './app/view/m/my/message.jsx',
    // mmy_relation: './app/view/m/my/relation.jsx',
    // mmy_post: './app/view/m/my/post.jsx',
    // mmy_favor: './app/view/m/my/favor.jsx',
    // mmy_favor_pic: './app/view/m/my/favor/pic.jsx',
    // mmy_favor_post: './app/view/m/my/favor/post.jsx',
    // mlogin: './app/view/m/login.jsx',
    mpost: './app/view/m/post.jsx',
    // mcircle: './app/view/m/circle.jsx',
    // mcpost: './app/view/m/mcpost.jsx',
    // muser: './app/view/m/user.jsx',
    // mcircling: './app/view/m/circling.jsx',
    // mfollow: './app/view/m/follow.jsx',
    // msubcomment: './app/view/m/subcomment.jsx',
    // msubpost: './app/view/m/subpost.jsx',
    // mmall: './app/view/m/mall.jsx',
    // mmall_new: './app/view/m/mall/new.jsx',
    // mmall_wait: './app/view/m/mall/wait.jsx',
    // mmall_history: './app/view/m/mall/history.jsx',
    // mtag: './app/view/m/tag.jsx',
    dindex: './app/view/d/index.jsx',
    // dfind: './app/view/d/find.jsx',
    dworks: './app/view/d/works.jsx',
    // dauthor: './app/view/d/author.jsx',
    // dsearch: './app/view/d/search.jsx',
    // dmy: './app/view/d/my.jsx',
    // dmy_message: './app/view/d/my/message.jsx',
    // dlogin: './app/view/d/login.jsx',
    // dupload: './app/view/d/upload.jsx',
    // dguide: './app/view/d/guide.jsx',
    dpost: './app/view/d/post.jsx',
    dupload: './app/view/d/upload.jsx',
    cindex: './app/view/cms/index.jsx',
    // dcircle: './app/view/d/circle.jsx',
    // duser: './app/view/d/user.jsx',
    // dcircling: './app/view/d/circling.jsx',
    // dfollow: './app/view/d/follow.jsx',
    // dmall: './app/view/d/mall.jsx',
    // dmall_new: './app/view/d/mall/new.jsx',
    // dmall_wait: './app/view/d/mall/wait.jsx',
    rhyme: './app/view/rhyme.jsx',
    ysjxy: './app/view/ysjxy.jsx',
    ysjxy2: './app/view/ysjxy2.jsx',
    fc: './app/view/fc.jsx',
    fc_single: './app/view/fc_single.jsx',
    hh: './app/view/hh.jsx',
    hh_single: './app/view/hh_single.jsx',
    jsgm_home: './app/view/jsgm/home.jsx',
    jsgm_detail: './app/view/jsgm/detail.jsx',
    jsgm_works: './app/view/jsgm/works.jsx',
    jsgm_prize: './app/view/jsgm/prize.jsx',
    jsgm_join: './app/view/jsgm/join.jsx',
    jsgm_single: './app/view/jsgm/single.jsx',
    sczl_home: './app/view/sczl/home.jsx',
    sczl_upload: './app/view/sczl/upload.jsx',
    sczl_single: './app/view/sczl/single.jsx',
  },
  output: {
    path: __dirname + '/app/view',
    filename: '[name].js',
    libraryTarget: 'commonjs',
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
      }
    ]
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: 'var migi=global.migi.clone();',
      raw: true,
      entryOnly: true,
    })
  ],
};
