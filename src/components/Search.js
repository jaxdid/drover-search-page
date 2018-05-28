import React, { Component } from 'react'
import SearchFiltersList from './SearchFiltersList'
import SearchResultsList from './SearchResultsList'
import SearchResultsPageSelector from './SearchResultsPageSelector'
import fetchSearchResults from '../../lib/api'
import {
  getDefaultQuery,
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
    this.runSearch()
  }

  runSearch () {
    fetchSearchResults(this.state.query)
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
          filters,
          results,
          resultsTotal: metadata.total_count,
          currentPage: metadata.page
        })
      })
  }

  updateResults (filter, newValue) {
    this.setState(previousState => {
      const newState = previousState
      newState.query[filter] = newValue
      return newState
    }, this.runSearch)
  }

  render () {
    console.log('current (query): ', this.state.query.page)
    console.log('current: ', this.state.currentPage)
    return (
      <div className="search">
        <SearchFiltersList
          filters={this.state.filters}
          updateResults={(filter, newValue) => this.updateResults(filter, newValue)}
        />
        <div className="results-container">
          <SearchResultsList
            results={this.state.results}
            resultsTotal={this.state.resultsTotal}
            locationSearched={this.state.query.location}
          />
          {this.state.resultsTotal
            ? <SearchResultsPageSelector
              resultsTotal={this.state.resultsTotal}
              currentPage={this.state.currentPage}
              resultsPerPage={this.state.query.per_page}
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
