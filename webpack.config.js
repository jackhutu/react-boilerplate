const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
// const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin')
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const env = process.env.NODE_ENV || 'development'
const debug = env !== 'production'

const config = {
  devtool: debug ? 'cheap-module-source-map' : 'hidden-source-map',
  name: 'browser',
  entry: {
    vendor: ['react','redux','react-redux','react-router-redux','react-router-dom','react-router-config'],
    bundle: './src/index'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: debug? '[name].js':'[hash:8].[name].js',
    chunkFilename: debug? '[name].js':'[name].[chunkhash].js',
    publicPath: '/'
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEVTOOLS__: false,
      __DEVLOGGER__: true,
      'process.env':{
        'NODE_ENV': JSON.stringify('development')
      }
    }),
    new webpack.LoaderOptionsPlugin({
      debug: true
    }),
    // new CommonsChunkPlugin({
    //   name: 'vendor',
    //   minChunks: Infinity //Infinity
    // }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: debug?'[name].style.css':'[hash:8].style.css', 
      chunkFilename: '[id].css'
    }),    
    // new ExtractTextPlugin({ 
    //   filename: debug?'[name].style.css':'[hash:8].style.css', 
    //   disable: false, allChunks: true 
    // }),   
    new HtmlWebpackPlugin({
      favicon:path.join(__dirname,'src/favicon.ico'),
      title: 'react boilerplate',
      template: path.join(__dirname,'src/index.html'),
      inject:'body',
      hash:false,    //为静态资源生成hash值
      minify:{    //压缩HTML文件
        removeComments:false,    //移除HTML中的注释
        collapseWhitespace:false    //删除空白符与换行符
      }
    }), 
  ],
  module: {
    rules: [
      { enforce: 'pre', test: /\.js$|\.jsx$/, exclude: /node_modules/, use: ['eslint-loader'] },
      { 
        test: /\.js$|\.jsx$/,
        loader: 'babel-loader',
        include: path.join(__dirname,'src'),
        exclude: /node_modules/
      },
      { 
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: debug
            }
          },
          'css-loader'
        ]
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      }, {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'images/[hash:8].[name].[ext]'
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                quality: 65
              },
              pngquant:{
                quality: '65-90',
                speed: 4
              },
              svgo:{
                plugins: [
                  {
                    removeViewBox: false
                  },
                  {
                    removeEmptyAttrs: false
                  }
                ]
              },
              gifsicle: {
                optimizationLevel: 7,
                interlaced: false
              },
              optipng: {
                optimizationLevel: 7,
                interlaced: false
              }
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'fonts/[hash:8].[name].[ext]'
          }
        }]
      },      
      { test: /\.json$/, use: ['json-loader'] },
    ],
  },
  resolve: {
    extensions: ['.js','.jsx','.scss','.css', '.less'],
    alias: {
      components: path.resolve(__dirname, 'src/components'),
      actions: path.resolve(__dirname, 'src/actions'),
      reducers: path.resolve(__dirname, 'src/reducers'),
      api: path.resolve(__dirname, 'src/api'),
      assets: path.resolve(__dirname, 'src/assets'),
      utils: path.resolve(__dirname, 'src/utils'),
    }    
  },
  node: {
    global: true,
    crypto: 'empty',
    process: true,
    console: false,
    __filename: 'mock',
    __dirname: 'mock',
    Buffer: true,
    setImmediate: true
  }
}

if (debug) {
  // config.plugins.push(
  //   new webpack.HotModuleReplacementPlugin(),
  //   new webpack.NoEmitOnErrorsPlugin()
  // )
  config.devServer = {
    contentBase: path.join(__dirname, 'src'),
    port: 3000,
    host: 'localhost',
    historyApiFallback: true,
    inline: true,
    hot: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
    },
    proxy: {
      '/api': {
        'target': 'http://yapi.demo.qunar.com/mock/70113/api',
        'changeOrigin': true,
        logLevel: 'debug',
        'pathRewrite': {
          '^/api': ''
        }
      }
    }
  }

} else {
  // config.plugins.push(  
  //   new UglifyJSPlugin()
  // )
}

module.exports = config