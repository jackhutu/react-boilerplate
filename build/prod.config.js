const path = require('path')
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
    })
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
          'less-loader',
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
          test: /\.scss|css|less$/,
          chunks: 'all',    // merge all the css chunk to one file
          enforce: true
        },
        commons: {
          // test: /[\\/]node_modules[\\/](react-router|react-router-dom|react-router-config|react-router-redux|redux-form)[\\/]/,
          name: 'vendors',
          chunks: 'all'
        },
        reacts: {
          test: /[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom)[\\/]/,
          priority: 10,
          chunks: 'all'
        },
      }
    }
  },

}


module.exports = merge(baseConfig,config)