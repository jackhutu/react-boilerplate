import * as types from './types'
import api from 'api'

//获取apps
export const getApps = () =>{
  return {
    type: types.GET_APPS,
    promise: api.getApps()
  }
}
//首页图片success
export const getIndexImage = () => {
  return {
    type: types.GET_INDEX_IMG,
    promise: api.getIndexImage()
  }
}