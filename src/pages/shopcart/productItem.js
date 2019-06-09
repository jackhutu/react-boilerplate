import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Product from './product'

export default class ProductItem extends Component {

  static propTypes = {
    product: PropTypes.shape({
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      inventory: PropTypes.number.isRequired,
    }).isRequired,
    onAddToCartClicked: PropTypes.func.isRequired
  }

  componentDidMount() {

  }

  render() {
    const { product } = this.props
    const addToCartAction = (
      <button onClick={this.props.onAddToCartClicked} disabled={product.inventory > 0 ? '' : 'disabled'}>
        {product.inventory > 0 ? 'Add to cart' : 'Sold Out'}
      </button>
    )

    return (
      <div className="product-item">
        <Product title={product.title} price={product.price} action={addToCartAction} />
      </div>
    )
  }
}


