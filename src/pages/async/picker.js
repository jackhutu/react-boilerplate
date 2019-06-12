import React, { Component } from 'react'
import PropTypes from 'prop-types'


export default class Picker extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.array.isRequired
  }

  render() {
    const { value,onChange,options } = this.props
    return (
      <div className="picker-box">
        <h1>{value}</h1>
        <select onChange={e => onChange(e.target.value)} value={value}>
          {options.map(option => (
            <option value={option} key={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    )
  }
}