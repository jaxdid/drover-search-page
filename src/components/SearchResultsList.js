import React from 'react'
import SearchResultsListItem from './SearchResultsListItem'

function SearchResultsList ({ results, resultsTotal, locationSearched }) {
  return (
    <div className="results">
      <h3>
        {`${resultsTotal} VEHICLES FOUND NEAR ${locationSearched.toUpperCase()}`}
      </h3>
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
