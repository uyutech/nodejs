module.exports = {
  entry: {
    mfind: './app/view/m/find.jsx',
    mworks: './app/view/m/works.jsx',
    mauthor: './app/view/m/author.jsx',
    msearch: './app/view/m/search.jsx',
    dindex: './app/view/d/index.jsx',
    dfind: './app/view/d/find.jsx',
    dworks: './app/view/d/works.jsx',
    dauthor: './app/view/d/author.jsx',
    dsearch: './app/view/d/search.jsx',
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
};
