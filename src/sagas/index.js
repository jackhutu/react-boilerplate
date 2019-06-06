import { take, put, call, fork, select, takeEvery, all } from 'redux-saga/effects'

export function* getAllProducts() {
  yield 'hello'
  yield 'world'
  return 'ending'
}


export default function* root() {
  yield all([fork(getAllProducts)])
}