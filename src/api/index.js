import {AuthResource} from './resources'

export default {
  getApps:function () {
    return AuthResource('get','getApps')
  },
  //article
  getIndexImage:function () {
    return AuthResource('get', 'getIndexImage')
  }
}