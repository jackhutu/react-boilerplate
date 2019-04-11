import React, { Component } from 'react'
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
class Home extends Component {
  constructor(props){
    super(props)
  }

  static propTypes = {
    local: PropTypes.object.isRequired
  }

  componentDidMount() {

  }

  render() {
    const {local} = this.props
    let styles = { backgroundImage: 'url(' + local.indexImg + ')'}
    return (
      <div className="home-box">
        Hello World
        <div className="cover-img" style={styles}></div>

      </div>
    )
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home)