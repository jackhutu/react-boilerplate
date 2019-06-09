import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Product from './product'

export default class CartItem extends Component {
  render() {
    const { price, quantity, title, onRemove } = this.props

    return (
      <Product price={price} quantity={quantity} title={title} action={<button onClick={onRemove}>{' X '}</button>} />
    )
  }
}

CartItem.propTypes = {
  price: PropTypes.number,
  quantity: PropTypes.number,
  title: PropTypes.string,
  onRemove: PropTypes.func.isRequired,
}
