import React from 'react'
import SearchResultsListItem from './SearchResultsListItem'

function SearchResultsList ({ results }) {
  return (
    <div className="results">
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
