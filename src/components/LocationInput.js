import React, { Component } from 'react'

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

export default LocationInput
