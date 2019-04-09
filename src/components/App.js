import React, { Component } from 'react'
import { renderRoutes } from 'react-router-config'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Toaster from 'components/Toaster'
import * as Actions from 'actions'

const mapStateToProps = state =>{
  return {
    local: state.local.toJS(),
    showmsg: state.showmsg.toJS()
  }
}

const mapDispatchToProps = dispatch =>{
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

@connect(mapStateToProps,mapDispatchToProps)
export default class App extends Component {
  constructor(props){
    super(props)
  }

  static propTypes = {
    route: PropTypes.object.isRequired,
    local: PropTypes.object.isRequired,
    showmsg: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  }

  componentWillReceiveProps(nextProps){

  }
  
  render() {
    const { actions,showmsg } = this.props
    return (
      <div>
        {renderRoutes(this.props.route.routes)}
        <Toaster msg={showmsg} hideMsg={actions.hideMsg} />
      </div>
    )
  }
}