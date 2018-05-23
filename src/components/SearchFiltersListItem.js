import React, { Fragment } from 'react'
import LocationInput from './LocationInput'

function SearchFiltersListItem ({ data }) {
  const {
    label,
    options,
    defaultValue
  } = data

  return (
    <label className="filter">
      <h4>{label}</h4>
      {!options
        ? <LocationInput defaultValue={defaultValue} />
        : _renderDropdownFilter(defaultValue, options)}
    </label>
  )
}

function _renderDropdownFilter (defaultValue, options) {
  return (
    <select className="filter-dropdown" defaultValue={defaultValue}>
      {options.length
        ? _renderRequiredFilterOptions(options)
        : _renderOptionalFilterOptions(options)}
    </select>
  )
}

function _renderRequiredFilterOptions (options) {
  return options.map((option, index) => {
    return (
      <option key={index} value={option}>
        {option}
      </option>
    )
  })
}

function _renderOptionalFilterOptions (options) {
  return (
    <Fragment>
      <option value="">Any</option>
      {Object.entries(options).map(([ value, quantity ], index) => {
        return (
          <option key={index} value={value}>
            {`${value} (${quantity})`}
          </option>
        )
      })}
    </Fragment>
  )
}

export default SearchFiltersListItem
