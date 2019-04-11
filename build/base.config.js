const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const config = {
  context: path.join(__dirname, '..'),
  entry: {
    vendor: ['react','react-dom','react-router', 'redux','react-redux','react-router-redux','react-router-dom','react-router-config'],
    bundle: './src/index', 
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name].js',
    chunkFilename: '[name].js',
    publicPath: '/'
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].style.css', 
      chunkFilename: '[id].css'
    }),     
    new HtmlWebpackPlugin({
      favicon: path.join(__dirname, '../src/favicon.ico'),
      title: 'react boilerplate',
      template: path.join(__dirname, '../src/index.html'),
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
        include: path.join(__dirname, '../src'),
        exclude: /node_modules/
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
      components: path.join(__dirname, '../src/components'),
      actions: path.join(__dirname, '../src/actions'),
      reducers: path.join(__dirname, '../src/reducers'),
      api: path.join(__dirname, '../src/api'),
      assets: path.join(__dirname, '../src/assets'),
      utils: path.join(__dirname, '../src/utils'),
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

module.exports = config