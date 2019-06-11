import * as types from './types'


export function addToCart(productId) {
  return {
    type: types.ADD_TO_CART,
    productId,
  }
}

export function removeFromCart(productId) {
  return {
    type: types.REMOVE_FROM_CART,
    productId,
  }
}

export function checkout() {
  return {
    type: types.CHECKOUT_REQUEST,
  }
}

export function checkoutSuccess(cart) {
  return {
    type: types.CHECKOUT_SUCCESS,
    cart,
  }
}

export function checkoutFailure(error) {
  return {
    type: types.CHECKOUT_FAILURE,
    error,
  }
}
