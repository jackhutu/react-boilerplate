import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from 'actions'
import './index.less'
import ProductList from './productList'
import Cart from './cart'

const mapStateToProps = state =>{
  return {
    local: state.local
  }
}

const mapDispatchToProps = dispatch =>{
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

@connect(mapStateToProps,mapDispatchToProps)
export default class ShopCart extends Component {

  static propTypes = {
    local: PropTypes.object.isRequired
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="shopcart-box">
        <h2>Shopping Cart Example</h2>
        <hr />
        <ProductList />
        <hr />
        <Cart />      
      </div>
    )
  }
}