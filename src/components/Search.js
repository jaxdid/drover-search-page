import React, { Component } from 'react'
import SearchFiltersList from './SearchFiltersList'
import SearchResultsList from './SearchResultsList'
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
      resultsTotal: 0
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
          resultsTotal: metadata.total_count
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
    return (
      <div className="search">
        <SearchFiltersList
          filters={this.state.filters}
          updateResults={(filter, newValue) => this.updateResults(filter, newValue)}
        />
        <SearchResultsList
          results={this.state.results}
          resultsTotal={this.state.resultsTotal}
          locationSearched={this.state.query.location}
        />
      </div>
    )
  }
}

export default Search
