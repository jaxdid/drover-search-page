import React from 'react'
import { capitalize } from '../../lib/utils'

function SearchResultsListItem ({ data }) {
  return (
    <div className="result">
      {`${data.vehicle_make} ${capitalize(data.vehicle_model)}`}
    </div>
  )
}

export default SearchResultsListItem
