import React, { Component } from 'react'

class SearchResultsPageSelector extends Component {
  constructor (props) {
    super(props)

    const {
      resultsTotal,
      resultsPerPage,
      currentPage
    } = this.props
    const numberedButtonsCount = Math.ceil(resultsTotal / resultsPerPage)
    const numberedButtons = _getNumberedButtons(numberedButtonsCount)

    this.state = {
      buttons: [
        {
          label: '«',
          pageNumber: 1
        },
        {
          label: '‹',
          className: 'previous-page',
          pageNumber: currentPage - 1
        },
        ...numberedButtons,
        {
          label: '›',
          className: 'next-page',
          pageNumber: currentPage + 1
        },
        {
          label: '»',
          pageNumber: numberedButtonsCount
        }
      ]
    }
  }

  renderButtons () {
    return this.state.buttons.map(({ className, pageNumber, label }) => {
      return (
        <a
          className={`page-button ${className} ${this.props.currentPage === pageNumber ? 'selected' : ''}`}
          href="#"
          onClick={() => this.props.updateResults('page', pageNumber)}
        >
          {label}
        </a>
      )
    })
  }

  render () {
    return (
      <div className="pages">
        <div className="summary">
          {_getSummary(this.props.resultsTotal, this.props.currentPage, this.props.resultsPerPage)}
        </div>
        {this.renderButtons()}
      </div>
    )
  }
}

function _getNumberedButtons (count) {
  return [...Array(count).keys()].map(index => {
    const pageNumber = index + 1
    return {
      label: pageNumber,
      pageNumber
    }
  })
}

function _getSummary (resultsTotal, currentPage, resultsPerPage) {
  const rangeStart = currentPage === 1 ? 1 : (currentPage - 1) * resultsPerPage + 1
  const rangeEnd = (rangeStart + resultsPerPage) - 1

  return `Showing ${rangeStart}-${Math.min(rangeEnd, resultsTotal)} of ${resultsTotal} results`
}

export default SearchResultsPageSelector
