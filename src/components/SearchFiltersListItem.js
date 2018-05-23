import React, { Fragment } from 'react'

function SearchFiltersListItem ({ key, data }) {
  const {
    label,
    options,
    defaultValue
  } = data

  return (
    <label key={key}>
      <h4>{label}</h4>
      <select defaultValue={defaultValue}>
        {options.length
          ? _renderRequiredFilterOptions(options)
          : _renderOptionalFilterOptions(options)}
      </select>
    </label>
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
