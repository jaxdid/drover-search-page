import React, { Component } from 'react'
import SearchFiltersList from './SearchFiltersList'
import SearchResultsList from './SearchResultsList'

class Search extends Component {
  constructor () {
    super()

    this.state = {
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
  }

  componentDidMount () {
    console.log('hellooo')
    window.fetch('https://app.joindrover.com/api/web/vehicles', {
      method: 'post',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json'
      },
      body: JSON.stringify({
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
      })
    })
      .then(resp => resp.json())
      .then(({ metadata, data }) => {
        const filters = {
          location: {
            label: 'Location',
            defaultValue: 'London, UK'
          },
          startDate: {
            label: 'Subscription starts within the next',
            options: ['2 Days', '14 Days', '30 Days']
          },
          maxDistance: {
            label: 'Distance (radius in miles)',
            options: [25, 50, 75, 100, 150, 200]
          },
          vehicleMake: {
            label: 'Vehicle Make',
            options: metadata.aggregations.vehicle_make
          },
          transmission: {
            label: 'Gearbox',
            options: metadata.aggregations.transmission
          },
          year: {
            label: 'Year',
            options: metadata.aggregations.year
          },
          fuel: {
            label: 'Fuel Type',
            options: metadata.aggregations.fuel
          },
          tags: {
            label: 'Car Type',
            options: metadata.aggregations.tags
          }
        }

        this.setState({
          filters,
          results: data
        })
      })
  }

  render () {
    return (
      <div className="search">
        <SearchFiltersList filters={this.state.filters} />
        <SearchResultsList results={this.state.results} />
      </div>
    )
  }
}

export default Search
