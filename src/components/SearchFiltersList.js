import React from 'react'
import SearchFiltersListItem from './SearchFiltersListItem'

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
    return <SearchFiltersListItem key={key} data={filter} />
  })
}

export default SearchFiltersList
