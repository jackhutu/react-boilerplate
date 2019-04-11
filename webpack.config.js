const devConfig = require('./build/dev.config')
const prodCofnig = require('./build/prod.config')

module.exports = (env, args)=>{
  var mode = args.mode || 'development', config = prodCofnig
  
  if(mode === 'development'){
    config = devConfig
  }
  return config
}