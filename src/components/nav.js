import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

export default class Nav extends Component {

  render() {
    return (
      <ul className="menu-list clearfix">
        <li>
          <NavLink to="/" activeClassName="active" exact>首页</NavLink>
        </li>
        <li>
          <NavLink to="/shopcart" activeClassName="active">shopcart</NavLink>
        </li>
        <li>
          <NavLink to="/async" activeClassName="active">async</NavLink>
        </li>
      </ul>
    )
  }
}