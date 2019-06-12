import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from 'actions'
import './index.less'
import Picker from './picker'
import Posts from './posts'

const mapStateToProps = state =>{
  const {selectedReddit,postsByReddit } = state.async
  const { isFetching, lastUpdated, items: posts } = postsByReddit[selectedReddit]|| {
    isFetching: true,
    items: [],
  }
  return {
    selectedReddit,
    posts,
    isFetching,
    lastUpdated
  }
}

const mapDispatchToProps = dispatch =>({
  actions: bindActionCreators(Actions, dispatch)
})

@connect(mapStateToProps,mapDispatchToProps)
export default class Async extends Component {

  static propTypes = {
    selectedReddit: PropTypes.string.isRequired,
    actions: PropTypes.object.isRequired,
    posts: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
  }

  componentDidMount() {
    const { selectedReddit,actions } = this.props
    actions.selectReddit(selectedReddit)
  }

  handleChange = (nextReddit)=>{
    this.props.actions.selectReddit(nextReddit)
  }

  handleRefreshClick = (e)=>{
    e.preventDefault()
    const { actions, selectedReddit } = this.props
    actions.invalidateReddit(selectedReddit)
  }

  render() {
    const { selectedReddit,posts,isFetching,lastUpdated } = this.props
    return (
      <div className="async-box">
        <h2>Async Example</h2>
        <hr />
        <Picker value={selectedReddit} onChange={this.handleChange} options={['reactjs', 'frontend']} />
        <p>
          {lastUpdated && <span>Last updated at {new Date(lastUpdated).toLocaleTimeString()}. </span>}
          {!isFetching && (
            <a href="#" onClick={this.handleRefreshClick}>
              Refresh
            </a>
          )}
        </p>
        {isFetching && posts.length === 0 && <h2>Loading...</h2>}
        {!isFetching && posts.length === 0 && <h2>Empty.</h2>}
        {posts.length > 0 && (
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <Posts posts={posts} />
          </div>
        )}
      </div>
    )
  }
}