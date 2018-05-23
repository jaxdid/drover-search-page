import React from 'react'
import SearchFiltersListItem from './SearchFiltersListItem'

function SearchFiltersList ({ filters, updateResults }) {
  return (
    <form className="filters">
      {_renderFilters(filters, updateResults)}
    </form>
  )
}

function _renderFilters (filters, updateResults) {
  return Object.entries(filters).map(([ filterName, filterData ]) => {
    return (
      <SearchFiltersListItem
        key={filterName}
        filterName={filterName}
        filterData={filterData}
        updateResults={updateResults}
      />
    )
  })
}

export default SearchFiltersList
