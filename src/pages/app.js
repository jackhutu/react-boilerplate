import React, { Component } from 'react'
import { renderRoutes } from 'react-router-config'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from 'actions'

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
class App extends Component {
  constructor(props){
    super(props)
  }

  static propTypes = {
    route: PropTypes.object.isRequired,
    local: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  }
  
  render() {
    return (
      <div>
        {renderRoutes(this.props.route.routes)}
      </div>
    )
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App)