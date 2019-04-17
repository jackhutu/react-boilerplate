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
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: (resourcePath, context) => {
                // publicPath is the relative path of the resource to the context
                // e.g. for ./css/admin/main.css the publicPath will be ../../
                // while for ./css/main.css the publicPath will be ../
                return path.relative(path.dirname(resourcePath), context) + '/'
              }
            }
          },
          'css-loader'
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
        }
      }
    }
  },

}


module.exports = merge(baseConfig,config)