import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { convertValueForApi, capitalize } from '../../lib/utils'

class DropdownFilter extends Component {
  constructor (props) {
    super(props)

    this.state = {
      value: this.props.filterData.defaultValue
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (event) {
    const { value } = event.target
    const { filterName, updateResults } = this.props

    this.setState({value})
    updateResults(filterName, convertValueForApi(filterName, value))
  }

  render () {
    return (
      <select
        className="filter-dropdown"
        value={this.state.value}
        onChange={this.handleChange}
      >
        {this.props.filterData.staticValues
          ? _renderStaticOptions(this.props.filterData.options)
          : _renderVariableOptions(this.props.filterData.options)}
      </select>
    )
  }
}

function _renderStaticOptions (options) {
  return options.map(({ value, label }, index) => {
    return (
      <option key={index} value={value}>
        {label}
      </option>
    )
  })
}

function _renderVariableOptions (options) {
  return (
    <Fragment>
      <option value="*">Any</option>
      {Object.entries(options).map(([ value, quantity ], index) => {
        return (
          <option key={index} value={value}>
            {`${capitalize(value)} (${quantity})`}
          </option>
        )
      })}
    </Fragment>
  )
}

DropdownFilter.propTypes = {
  filterData: PropTypes.object.isRequired,
  filterName: PropTypes.string.isRequired,
  updateResults: PropTypes.func.isRequired
}

export default DropdownFilter
