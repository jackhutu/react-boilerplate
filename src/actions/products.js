
import * as types from './types'

export function getAllProducts() {
  return {
    type: types.GET_ALL_PRODUCTS,
  }
}

export function receiveProducts(products) {
  return {
    type: types.RECEIVE_PRODUCTS,
    products: products,
  }
}
