import React, { Component } from 'react'
import { renderRoutes } from 'react-router-config'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from 'actions'
import Nav from 'components/nav'

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
export default class App extends Component {

  static propTypes = {
    route: PropTypes.object.isRequired,
    local: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  }
  
  render() {
    return (
      <div>
        <Nav />
        {renderRoutes(this.props.route.routes)}
      </div>
    )
  }
}