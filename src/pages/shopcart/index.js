import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from 'actions'
import './index.less'

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

// @connect(mapStateToProps,mapDispatchToProps)
class ShopCart extends Component {
  constructor(props){
    super(props)
  }

  static propTypes = {
    local: PropTypes.object.isRequired
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="shopcart-box">
        shopcart
      </div>
    )
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ShopCart)