const webpack = require('webpack');
const path = require('path');
const Merge = require('webpack-merge');
const CommonConfig = require('./webpack.common.js');

module.exports = Merge(CommonConfig, {
  plugins: [
      new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    host: '0.0.0.0',
    disableHostCheck: true,
    publicPath: '/',
    port: 8000,
    contentBase: path.join(process.cwd(), 'dist'), // static file location
    historyApiFallback: true, // true for index.html upon 404, object for multiple paths
    noInfo: false,
    stats: 'minimal',
    inline:true,
    hot: true  // hot module replacement. Depends on HotModuleReplacementPlugin
  }
});
