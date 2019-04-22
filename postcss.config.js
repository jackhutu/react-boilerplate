module.exports = ({ file, options, env }) => ({
  plugins:[
    require('postcss-smart-import')({ /* ...options */ }),
    require('postcss-preset-env')({ 
      browsers: 'last 2 versions'
    }) 
  ]
})