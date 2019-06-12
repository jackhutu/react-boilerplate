import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Product extends Component {

  static propTypes = {
    title: PropTypes.string,
    price: PropTypes.number,
    quantity: PropTypes.number,
    action: PropTypes.node,
  }

  componentDidMount() {

  }

  render() {
    const { title, quantity, price, action } = this.props

    return (
      <div className="product-content">
        {title} - &#36;{price} {quantity ? `x ${quantity}` : null} {action}
      </div>
    )
  }
}


