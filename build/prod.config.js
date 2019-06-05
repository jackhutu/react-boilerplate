const path = require('path')
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const merge = require('webpack-merge')
const baseConfig = require('./base.config')

const config = {
  mode: 'production',
  devtool: 'hidden-source-map',
  output: {
    path: path.join(__dirname, '..', 'dist'),
    filename: '[hash:8].[name].js',
    chunkFilename: '[name].[chunkhash].js',
    publicPath: '/'
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].style.css', 
      chunkFilename: '[id].[contenthash:12].css'
    }),
    new webpack.DefinePlugin({
      __DEVTOOLS__: false,
      __DEVLOGGER__: false
    }),
  ],
  module: {
    rules: [
      { 
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: (resourcePath, context) => {
                return path.relative(path.dirname(resourcePath), context) + '/'
              }
            }
          },
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ]
      },
      { 
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: (resourcePath, context) => {
                return path.relative(path.dirname(resourcePath), context) + '/'
              }
            }
          },
          'css-loader',
          'postcss-loader',
          {
            loader: 'less-loader',
            options: { javascriptEnabled: true }
          }
        ]
      },
    ],
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true 
      }),
      new OptimizeCSSAssetsPlugin({})  // use OptimizeCSSAssetsPlugin
    ],
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        styles: {            
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',    // merge all the css chunk to one file
          enforce: true
        },
        // commons: {
        //   test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
        //   name: 'reacts',
        //   chunks: 'all'
        // },
      }
    }
  },

}


module.exports = merge(baseConfig,config)