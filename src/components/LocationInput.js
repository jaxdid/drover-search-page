import React, { Component } from 'react'
import PropTypes from 'prop-types'

class LocationInput extends Component {
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

    this.setState({value}, () => {
      updateResults(filterName, value)
    })
  }

  render () {
    return (
      <input
        className="filter-location"
        type="text"
        value={this.state.value}
        onChange={this.handleChange}
      />
    )
  }
}

LocationInput.propTypes = {
  filterData: PropTypes.object.isRequired,
  filterName: PropTypes.string.isRequired,
  updateResults: PropTypes.func.isRequired
}

export default LocationInput
