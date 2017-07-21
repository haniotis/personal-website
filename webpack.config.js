const webpack = require('webpack')
const path = require('path')
const Clean = require('clean-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
  entry: {
    main: './source/scripts/main.js'
  },

  resolve: {
    modules: [
      path.join(__dirname, '/source/scripts'),
      'node_modules'
    ]
  },

  output: {
    path: path.join(__dirname, '/.tmp/dist'),
    publicPath: '/',
    filename: 'scripts/[name].js',
    chunkFilename: 'scripts/[id].[hash].js'
  },

  module: {
    rules: [
      {
        test: /source\/scripts\/.*\.js$/,
        exclude: /node_modules|\.tmp|vendor/,
        loader: 'babel-loader',
        options: {
          plugins: ['transform-runtime'],
          presets: ['es2015', 'stage-0']
        }
      }
    ]
  },

  plugins: [
    new Clean(['.tmp']),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'scripts/vendor.js',
      minChunks: 2
    }),
    // new BundleAnalyzerPlugin()
  ],

  stats: {
    colors: true
  }
}