import * as types from './types'


export function selectReddit(nextReddit) {
  return {
    type: types.SELECT_REDDIT,
    reddit: nextReddit,
  }
}


export function requestPosts(reddit){
  return {
    type: types.REQUEST_POSTS,
    reddit,
  }
}

export function receivePosts(reddit, posts){
  return {
    type: types.RECEIVE_POSTS,
    reddit,
    posts,
    receivedAt: new Date().setMilliseconds(0),
  }
}

export function invalidateReddit(reddit) {  
  return {
    type: types.INVALIDATE_REDDIT,
    reddit,
  }
}