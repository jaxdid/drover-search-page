import React, { Fragment } from 'react'

function SearchFiltersList (props) {
  return (
    <form className="filters">
      <label className="filter">
        <h4>Location</h4>
        <input type="text" />
      </label>
      {_renderFilters(props.filters)}
    </form>
  )
}

function _renderFilters (filters) {
  return Object.entries(filters).map(([ key, filter ]) => {
    const { label, options, defaultValue } = filter

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
  })
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

export default SearchFiltersList
