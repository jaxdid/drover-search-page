import React from 'react'
import PropTypes from 'prop-types'
import { capitalize } from '../../lib/utils'

function ResultHeadline (props) {
  const {
    carDetailsUrl,
    vehicleMake,
    vehicleModel,
    engineSize,
    postcode,
    availabilityDate
  } = props

  return (
    <div className="header">
      <div className="title-container">
        <a className="title" href={carDetailsUrl}>
          {_getTitle(vehicleMake, vehicleModel, engineSize)}
        </a>
        <div className="location">{`Located in ${postcode.split(' ')[0]}`}</div>
      </div>
      <div className="availability">
        {`Available from ${_getAvailabilityDateString(availabilityDate)}`}
      </div>
    </div>
  )
}

ResultHeadline.propTypes = {
  carDetailsUrl: PropTypes.string,
  vehicleMake: PropTypes.string,
  vehicleModel: PropTypes.string,
  engineSize: PropTypes.string,
  postcode: PropTypes.string,
  availabilityDate: PropTypes.string
}

function _getTitle (vehicleMake, vehicleModel, engineSize) {
  const baseTitle = `${vehicleMake} ${capitalize(vehicleModel)}`
  const engineSizeLabel = engineSize ? ` ${engineSize}L` : ''
  return `${baseTitle}${engineSizeLabel}`
}

function _getAvailabilityDateString (availabilityDate) {
  const [ year, twoDigitMonth, twoDigitDate ] = availabilityDate.split('-')
  const date = twoDigitDate.replace(/^0/, '')
  const months = {
    '01': 'January',
    '02': 'February',
    '03': 'March',
    '04': 'April',
    '05': 'May',
    '06': 'June',
    '07': 'July',
    '08': 'August',
    '09': 'September',
    '10': 'October',
    '11': 'November',
    '12': 'December'
  }

  return `${date}${_getDateDecoration(date)} ${months[twoDigitMonth]} ${year}`
}

function _getDateDecoration (date) {
  const dateInteger = Number(date)

  if (dateInteger > 3 && dateInteger < 21) {
    return 'th'
  }

  switch (dateInteger % 10) {
    case 1:
      return 'st'
    case 2:
      return 'nd'
    case 3:
      return 'rd'
    default:
      return 'th'
  }
}

export default ResultHeadline
