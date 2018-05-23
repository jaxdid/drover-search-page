import React, { Component } from 'react'
import SearchFiltersList from './SearchFiltersList'
import SearchResultsList from './SearchResultsList'
import fetchSearchResults from '../../lib/api'

class Search extends Component {
  constructor () {
    super()

    this.state = {
      query: {
        'location': 'London, UK',
        'max_distance': 50,
        'order_by': 'price',
        'order_direction': 'asc',
        'page': 1,
        'per_page': 15,
        'price_max': 2500,
        'price_min': 100,
        'subscription_start_days': 30,
        'vehicle_type': 'Consumer'
      },
      filters: {
        location: {
          label: 'Location',
          defaultValue: 'London, UK'
        },
        startDate: {
          label: 'Subscription starts within the next',
          options: [2, 14, 30],
          defaultValue: 30
        },
        maxDistance: {
          label: 'Distance (radius in miles)',
          options: [25, 50, 75, 100, 150, 200],
          defaultValue: 50
        },
        vehicleMake: {
          label: 'Vehicle Make',
          options: {},
          defaultValue: ''
        },
        transmission: {
          label: 'Gearbox',
          options: {},
          defaultValue: ''
        },
        year: {
          label: 'Year',
          options: {},
          defaultValue: ''
        },
        fuel: {
          label: 'Fuel Type',
          options: {},
          defaultValue: ''
        },
        tags: {
          label: 'Car Type',
          options: {},
          defaultValue: ''
        }
      },
      results: []
    }

    this.updateResults = this.updateResults.bind(this)
  }

  componentDidMount () {
    this.runSearch()
  }

  runSearch () {
    fetchSearchResults(this.state.query)
      .then(({ metadata, data }) => {
        const filters = {
          location: {
            label: 'Location',
            defaultValue: 'London, UK',
            staticValues: true
          },
          subscription_start_days: {
            label: 'Subscription starts within the next',
            options: [
              {label: '2 Days', value: 2},
              {label: '14 Days', value: 14},
              {label: '30 Days', value: 30}
            ],
            staticValues: true
          },
          max_distance: {
            label: 'Distance (radius in miles)',
            options: [
              {label: '25', value: 25},
              {label: '50', value: 50},
              {label: '75', value: 75},
              {label: '100', value: 100},
              {label: '150', value: 150},
              {label: '200', value: 200}
            ],
            staticValues: true
          },
          vehicle_make: {
            label: 'Vehicle Make',
            options: metadata.aggregations.vehicle_make,
            staticValues: false
          },
          transmission: {
            label: 'Gearbox',
            options: metadata.aggregations.transmission,
            staticValues: false
          },
          year: {
            label: 'Year',
            options: metadata.aggregations.year,
            staticValues: false
          },
          fuel: {
            label: 'Fuel Type',
            options: metadata.aggregations.fuel,
            staticValues: false
          },
          tags: {
            label: 'Car Type',
            options: metadata.aggregations.tags,
            staticValues: false
          }
        }

        this.setState({
          filters,
          results: data
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
        <SearchResultsList results={this.state.results} />
      </div>
    )
  }
}

export default Search
