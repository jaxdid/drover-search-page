import React from 'react'
import PropTypes from 'prop-types'
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

SearchFiltersList.propTypes = {
  filters: PropTypes.object.isRequired,
  updateResults: PropTypes.func.isRequired
}

export default SearchFiltersList
