import React from 'react'
import PropTypes from 'prop-types'
import SearchResultsListItem from './SearchResultsListItem'

function SearchResultsList ({ results, resultsTotal, locationSearched }) {
  return (
    <div className="results">
      <div className="results-count">
        {`${resultsTotal} VEHICLES FOUND NEAR ${locationSearched.toUpperCase()}`}
      </div>
      {_renderResults(results)}
    </div>
  )
}

SearchResultsList.propTypes = {
  results: PropTypes.array.isRequired,
  resultsTotal: PropTypes.number.isRequired,
  locationSearched: PropTypes.string.isRequired
}

function _renderResults (results) {
  return results.map(result => {
    return <SearchResultsListItem key={result.id} data={result} />
  })
}

export default SearchResultsList
