import * as types from './types'
import api from 'api'


//首页图片success
export const getImage = () => {
  return {
    type: types.GET_IMG,
  }
}

export const getImageSuccess = (img) => {
  return {
    type: types.GET_IMG_SUCCESS,
    img
  }
}

export const getImageRequest = () => {
  return {
    type: types.GET_IMG_REQUEST,
  }
}

export const getImageFailure = () => {
  return {
    type: types.GET_IMG_FAILURE,
  }
}