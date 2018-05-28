import React from 'react'

function SearchResultsPageSelector ({ resultsTotal, currentPage, resultsPerPage, updateResults }) {
  return (
    <div className="pages">
      <div className="summary">
        {_getSummary(resultsTotal, currentPage, resultsPerPage)}
      </div>
      <a
        className="first-page"
        href="#"
        onClick={event => updateResults('page', 1)}
      >
        {'<<'}
      </a>
      <a
        className="previous-page"
        href="#"
        onClick={event => updateResults('page', currentPage - 1)}
      >
        {'<'}
      </a>
      {_renderPageButtons(resultsTotal, currentPage, resultsPerPage, updateResults)}
      <a
        className="next-page"
        href="#"
        onClick={event => updateResults('page', currentPage + 1)}
      >
        {'>'}
      </a>
      <a
        className="last-page"
        href="#"
        onClick={event => updateResults('page', Math.ceil(resultsTotal / resultsPerPage))}
      >
        {'>>'}
      </a>
    </div>
  )
}

function _getSummary (resultsTotal, currentPage, resultsPerPage) {
  const rangeStart = currentPage === 1 ? 1 : (currentPage - 1) * resultsPerPage + 1
  const rangeEnd = (rangeStart + resultsPerPage) - 1

  return `Showing ${rangeStart}-${Math.min(rangeEnd, resultsTotal)} of ${resultsTotal} results`
}

function _renderPageButtons (resultsTotal, currentPage, resultsPerPage, updateResults) {
  const pagesCount = Math.ceil(resultsTotal / resultsPerPage)
  const pageButtonLabels = [...Array(pagesCount).keys()].map(key => key + 1)

  return pageButtonLabels.map(pageButtonLabel => {
    return (
      <a
        className="page-button"
        href="#"
        onClick={event => updateResults('page', pageButtonLabel)}
      >
        {pageButtonLabel}
      </a>
    )
  })
}

export default SearchResultsPageSelector
