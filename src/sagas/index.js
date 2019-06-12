/* eslint-disable no-constant-condition */

import { take, put, call, fork, select, takeEvery, all } from 'redux-saga/effects'
import * as actions from 'actions'
import * as types from 'actions/types'
import { getCart,selectedRedditSelector, postsByRedditSelector } from 'reducers/getters'
import api from 'api'

export function* getAllProducts() {
  const products = yield call(api.getProducts)
  // put 会立即执行 actions.receiveProducts
  yield put(actions.receiveProducts(products))
}

export function* checkout() {
  try {
    //  在当前 Store 的 state 上调用指定的选择器（即返回 selector(getState(), ...args) 的结果）。 相当于调用了getCart(state)
    const cart = yield select(getCart)
    // call 即调用api.buyProducts(cart)
    yield call(api.buyProducts, cart)
    yield put(actions.checkoutSuccess(cart))
  } catch (error) {
    yield put(actions.checkoutFailure(error))
  }
}

export function* watchGetProducts() {
  /*
    takeEvery will fork a new `getAllProducts` task on each GET_ALL_PRODUCTS actions
    i.e. concurrent GET_ALL_PRODUCTS actions are allowed
    我们在每次 GET_ALL_PRODUCTS action 被发起时，使用 takeEvery 来启动一个新的 getAllProducts 任务。
  */
  yield takeEvery(types.GET_ALL_PRODUCTS, getAllProducts)
}

export function* watchCheckout() {
  while (true) {
    // 在 Store 上等待指定的 action。 在发起与 pattern 匹配的 action 之前，Generator 将暂停。
    yield take(types.CHECKOUT_REQUEST)
    /*
      ***THIS IS A BLOCKING CALL***
      It means that watchCheckout will ignore any CHECKOUT_REQUEST event until
      the current checkout completes, either by success or by Error.
      i.e. concurrent CHECKOUT_REQUEST are not allowed
      TODO: This needs to be enforced by the UI (disable checkout button)
    */
    yield call(checkout)
  }
}

function fetchPostsApi(reddit){
  return api.getRedditData(reddit).then(response => response.data)
    .then(json => json.data.children.map(child => child.data))
}

export function* fetchPosts(reddit){
  // 请求的结果还是从Action走
  yield put(actions.requestPosts(reddit))
  const posts = yield call(fetchPostsApi, reddit)
  yield put(actions.receivePosts(reddit, posts))
}

// 监控async上的切换选项
export function* watchAsyncOption(){
  while (true){
    const prevReddit = yield select(selectedRedditSelector)
    yield take(types.SELECT_REDDIT)
    const newReddit = yield select(selectedRedditSelector)
    const postsByReddit = yield select(postsByRedditSelector)
    // 调用接口
    if(!postsByReddit[newReddit]) yield fork(fetchPosts, newReddit)
  }
}

export function* invalidateReddit(){
  while(true){
    const { reddit } = yield take(types.INVALIDATE_REDDIT)
    yield call(fetchPosts, reddit)
  }
}

export default function* root() {
  yield all([
    fork(getAllProducts), 
    fork(watchGetProducts), 
    fork(watchCheckout),
    fork(watchAsyncOption),
    fork(invalidateReddit)
  ])
}
