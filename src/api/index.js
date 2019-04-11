import {AuthResource} from './resources'

export default {
  getApps:function () {
    return AuthResource('get','getApps')
  },

  getIndexImage:function () {
    return AuthResource('get', 'getIndexImage')
  }
}