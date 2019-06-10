import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { addToCart } from 'actions'
import { getVisibleProducts } from 'reducers/getters'
import ProductItem from './productItem'

const mapStateToProps = state =>({
  products: getVisibleProducts(state.products)
})

const mapDispatchToProps = dispatch =>({
  addToCart: bindActionCreators(addToCart, dispatch)
})

class ProductList extends Component {
  static propTypes = {
    // 可以指定一个数组由某一类型的元素组成
    products: PropTypes.arrayOf(
      // 可以指定一个对象由特定的类型值组成
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        inventory: PropTypes.number.isRequired,
      })
    ),
    addToCart: PropTypes.func.isRequired,
  }

  componentDidMount() {

  }

  render() {
    const { products, addToCart } = this.props

    return (
      <div className="product-list">
        <h3>Products</h3>
        {products.map(product => (
          <ProductItem product={product} key={product.id} onAddToCartClicked={() => addToCart(product.id)} />
        ))}
      </div>
    )
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ProductList)
