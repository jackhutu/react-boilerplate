import {AuthResource, PublicResource} from './resources'
import _products from './mockdata'

const TIMEOUT = 100
const MAX_CHECKOUT = 2 // max different items

export default {
  getApps:function () {
    return AuthResource('get','getApps')
  },

  getIndexImage:function () {
    return AuthResource('get', 'getIndexImage')
  }, 

  getRedditData: reddit => PublicResource('get', `https://www.reddit.com/r/${reddit}.json`),

  getProducts() {
    return new Promise(resolve => {
      setTimeout(() => resolve(_products), TIMEOUT)
    })
  },

  buyProducts(cart) {
    return new Promise((resolve, reject) =>
      setTimeout(() => {
        if (Object.keys(cart.quantityById).length <= MAX_CHECKOUT) resolve(cart)
        else reject(`You can buy ${MAX_CHECKOUT} items at maximum in a checkout`)
      }, TIMEOUT),
    )
  },
}

