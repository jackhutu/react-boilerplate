import {ArticleResource} from './resources'

export default {
  getApps:function () {
    return ArticleResource('get','getApps')
  },
  //article
  getIndexImage:function () {
    return ArticleResource('get', 'getIndexImage')
  }
}