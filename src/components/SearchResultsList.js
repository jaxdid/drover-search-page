import React from 'react'
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

function _renderResults (results) {
  return results.map(result => {
    return <SearchResultsListItem key={result.id} data={result} />
  })
}

export default SearchResultsList
