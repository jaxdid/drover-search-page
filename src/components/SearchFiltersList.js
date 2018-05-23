import React from 'react'
import SearchFiltersListItem from './SearchFiltersListItem'

function SearchFiltersList (props) {
  return (
    <form className="filters">
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
