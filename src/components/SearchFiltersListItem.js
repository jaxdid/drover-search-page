import React from 'react'
import LocationInput from './LocationInput'
import DropdownFilter from './DropdownFilter'

function SearchFiltersListItem ({ filterName, filterData, updateResults }) {
  return (
    <label className="filter">
      <div className="label-text">{filterData.label}</div>
      {!filterData.options
        ? _renderLocationInput(filterName, filterData, updateResults)
        : _renderDropdownFilter(filterName, filterData, updateResults)}
    </label>
  )
}

function _renderLocationInput (filterName, filterData, updateResults) {
  return (
    <LocationInput
      filterName={filterName}
      filterData={filterData}
      updateResults={updateResults}
    />
  )
}

function _renderDropdownFilter (filterName, filterData, updateResults) {
  return (
    <DropdownFilter
      filterName={filterName}
      filterData={filterData}
      updateResults={updateResults}
    />
  )
}

export default SearchFiltersListItem
