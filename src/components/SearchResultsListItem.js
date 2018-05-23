import React from 'react'

function SearchResultsListItem ({ data }) {
  return (
    <div className="result">
      {`${data.vehicle_make} ${data.vehicle_model}`}
    </div>
  )
}

export default SearchResultsListItem
