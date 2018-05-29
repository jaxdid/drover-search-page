import React from 'react'
import PropTypes from 'prop-types'
import { capitalize } from '../../lib/utils'

function ResultKeyFacts (props) {
  const {
    year,
    bodyType,
    transmission,
    fuel,
    numberSeats,
    numberDoors,
    color
  } = props

  return (
    <ul className="key-facts">
      <li className="year">{year}</li>
      <li className="body-type">{capitalize(bodyType)}</li>
      <li className="transmission">{capitalize(transmission)}</li>
      <li className="fuel">{capitalize(fuel)}</li>
      <li className="number-seats">{`${numberSeats} Seats`}</li>
      <li className="number-doors">{`${numberDoors} Doors`}</li>
      <li className="color">{capitalize(color)}</li>
    </ul>
  )
}

ResultKeyFacts.propTypes = {
  year: PropTypes.number,
  bodyType: PropTypes.string,
  transmission: PropTypes.string,
  fuel: PropTypes.string,
  numberSeats: PropTypes.string,
  numberDoors: PropTypes.string,
  color: PropTypes.string
}

export default ResultKeyFacts
