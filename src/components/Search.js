import React, { Component } from 'react'
import SearchFiltersList from './SearchFiltersList'
import SearchResultsList from './SearchResultsList'
import SearchResultsPageSelector from './SearchResultsPageSelector'
import fetchSearchResults from '../../lib/api'
import {
  getDefaultQuery,
  getUpdatedQuery,
  getBaseFilterSettings,
  debounce
} from '../../lib/utils'

class Search extends Component {
  constructor () {
    super()

    this.state = {
      query: getDefaultQuery(),
      filters: getBaseFilterSettings(),
      results: [],
      resultsTotal: 0,
      currentPage: 1
    }

    this.updateResults = debounce(this.updateResults.bind(this), 300)
  }

  componentDidMount () {
    this.updateResults()
  }

  updateResults (updatedFilter, newValue) {
    const query = updatedFilter && newValue
      ? getUpdatedQuery(this.state.query, updatedFilter, newValue)
      : this.state.query

    fetchSearchResults(query)
      .then(({ metadata, data: results }) => {
        const {
          vehicle_make: vehicleMake,
          transmission,
          year,
          fuel,
          tags
        } = metadata.aggregations
        const filters = getBaseFilterSettings()

        filters.vehicle_make.options = vehicleMake
        filters.transmission.options = transmission
        filters.year.options = year
        filters.fuel.options = fuel
        filters.tags.options = tags

        this.setState({
          query,
          filters,
          results,
          resultsTotal: metadata.total_count,
          currentPage: updatedFilter === 'page' ? metadata.page : 1
        })
      })
  }

  render () {
    const {
      filters,
      results,
      resultsTotal,
      query,
      currentPage
    } = this.state

    return (
      <div className="search">
        <SearchFiltersList
          filters={filters}
          updateResults={(filter, newValue) => this.updateResults(filter, newValue)}
        />
        <div className="results-container">
          <SearchResultsList
            results={results}
            resultsTotal={resultsTotal}
            locationSearched={query.location}
          />
          {resultsTotal
            ? <SearchResultsPageSelector
              resultsTotal={resultsTotal}
              currentPage={currentPage}
              resultsPerPage={query.per_page}
              updateResults={(filter, newValue) => this.updateResults(filter, newValue)}
            />
            : ''
          }
        </div>
      </div>
    )
  }
}

export default Search
