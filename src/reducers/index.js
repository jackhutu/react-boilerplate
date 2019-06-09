import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { reducer as formReducer } from 'redux-form'
import apps from './apps'
import local from './local'
import { default as cart, getQuantity, getAddedIds } from './cart'
import { default as products, getProduct } from './products'

const rootReducer = (history) => combineReducers({
  form: formReducer,
  local,
  apps,
  cart,
  products,
  router: connectRouter(history)
})

export function getCart(state) {
  return state.cart
}

export function getCheckoutError(state) {
  return state.cart.checkoutStatus.error
}

export function isCheckoutPending(state) {
  return state.cart.checkoutStatus.checkoutPending
}

export function getTotal(state) {
  return getAddedIds(state.cart)
    .reduce((total, id) => total + getProduct(state.products, id).price * getQuantity(state.cart, id), 0)
    .toFixed(2)
}

export function getCartProducts(state) {
  return getAddedIds(state.cart).map(id => ({
    ...getProduct(state.products, id),
    quantity: getQuantity(state.cart, id),
  }))
}

export default rootReducer

