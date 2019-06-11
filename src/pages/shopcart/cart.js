import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { checkout, removeFromCart } from 'actions'
import { getTotal, getCartProducts, getCheckoutError, isCheckoutPending } from 'reducers/getters'
import CartItem from './cartItem'

const mapStateToProps = state =>({
  products: getCartProducts(state),
  total: getTotal(state),
  error: getCheckoutError(state),
  checkoutPending: isCheckoutPending(state),
})

const mapDispatchToProps = dispatch =>({
  checkout: bindActionCreators(checkout, dispatch),
  removeFromCart: bindActionCreators(removeFromCart, dispatch),
})

@connect(mapStateToProps, mapDispatchToProps)
export default class Cart extends Component {

  static propTypes = {
    products: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        quantity: PropTypes.number.isRequired,
      }),
    ).isRequired,
    total: PropTypes.string,
    error: PropTypes.string,
    checkoutPending: PropTypes.bool,

    // actions
    checkout: PropTypes.func.isRequired,
    removeFromCart: PropTypes.func.isRequired,
  }

  componentDidMount() {

  }

  render() {
    const { products, total, error, checkoutPending, checkout, removeFromCart } = this.props

    const hasProducts = products.length > 0
    const checkoutAllowed = hasProducts && !checkoutPending

    const nodes = !hasProducts ? (
      <em>Please add some products to cart.</em>
    ) : (
      products.map(product => (
        <CartItem
          title={product.title}
          price={product.price}
          quantity={product.quantity}
          key={product.id}
          onRemove={() => removeFromCart(product.id)}
        />
      ))
    )

    return (
      <div className="product-list">
        <h3>Your Cart</h3>
        <div>{nodes}</div>
        <p>Total: &#36;{total}</p>
        <button onClick={checkout} disabled={checkoutAllowed ? '' : 'disabled'}>
          Checkout
        </button>
        <div style={{ color: 'red' }}>{error}</div>
      </div>
    )
  }
}

