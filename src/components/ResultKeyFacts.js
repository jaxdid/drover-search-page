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

  const keyFacts = [
    {className: 'year', value: year},
    {className: 'body-type', value: bodyType},
    {className: 'transmission', value: transmission},
    {className: 'fuel', value: fuel},
    {className: 'number-seats', value: numberSeats},
    {className: 'number-doors', value: numberDoors},
    {className: 'color', value: color}
  ]

  return (
    <ul className="key-facts">
      {_renderKeyFacts(keyFacts)}
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

function _renderKeyFacts (keyFacts) {
  return keyFacts.map(({ className, value }) => {
    if (value) {
      return <li className={className}>{capitalize(String(value))}</li>
    }
  })
}

export default ResultKeyFacts
