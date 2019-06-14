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

@connect(mapStateToProps,mapDispatchToProps)
export default class Home extends Component {

  static propTypes = {
    local: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  }

  componentDidMount() {
    const { actions } = this.props
    actions.getImage()
  }

  render() {
    const {local} = this.props
    let styles = { backgroundImage: 'url(' + local.indexImg.value + ')'}
    return (
      <div className="home-box">
        Hello World
        <hr />
        {local.indexImg.loading&&<span>图片加载中.....</span>}
        <div className="cover-img" style={styles}></div>

      </div>
    )
  }
}
