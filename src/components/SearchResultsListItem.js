import React, { Fragment } from 'react'
import { capitalize } from '../../lib/utils'

function SearchResultsListItem ({ data }) {
  const {
    images,
    vehicle_make: vehicleMake,
    vehicle_model: vehicleModel,
    engine_size_information: engineSize,
    postcode,
    available_start_date: availabilityDate,
    year,
    body_information: bodyType,
    transmission,
    fuel,
    number_seats_information: numberSeats,
    number_doors_information: numberDoors,
    color,
    features,
    price_discount_and_deposit_schedule_hash: prices,
    id
  } = data
  const { main_image_url: imageUrl } = _getMainImage(images)
  const carDetailsUrl = _getCarDetailsUrl(vehicleMake, vehicleModel, id)

  return (
    <div className="result">
      <a
        className="image"
        href={carDetailsUrl}
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div className="details">
        <div className="header">
          <div className="title-container">
            <a className="title" href={carDetailsUrl}>{`${vehicleMake} ${capitalize(vehicleModel)} ${engineSize}L`}</a>
            <div className="location">{`Located in ${postcode.split(' ')[0]}`}</div>
          </div>
          <div className="availability">
            {`Available from ${availabilityDate}`}
          </div>
        </div>
        <ul className="key-facts">
          <li className="year">{year}</li>
          <li className="body-type">{capitalize(bodyType)}</li>
          <li className="transmission">{capitalize(transmission)}</li>
          <li className="fuel">{capitalize(fuel)}</li>
          <li className="number-seats">{`${numberSeats} Seats`}</li>
          <li className="number-doors">{`${numberDoors} Doors`}</li>
          <li className="color">{capitalize(color)}</li>
        </ul>
        <div className="features">
          {_renderFeatures(features)}
        </div>
        <div className="price-container">
          <div className="price">
            <div className="label">
              <span className="amount">{`£ ${_getPrice(prices)}`}</span>/month
            </div>
            <div className="price-explanation">(Monthly Vehicle Price inc. VAT)</div>
          </div>
          <a className="cta" href={carDetailsUrl}>
            See more details
          </a>
        </div>
      </div>
    </div>
  )
}

function _getMainImage (images) {
  return images.filter(image => image.position === 0)[0]
}

function _getPrice (prices) {
  return prices[12].driver_price_pounds_after_discount_including_insurance
}

function _getCarDetailsUrl (vehicleMake, vehicleModel, id) {
  return `https://www.joindrover.com/cars/${vehicleMake}/${encodeURI(vehicleModel)}/${id}`
}

function _renderFeatures (features) {
  return features.map((feature, index) => {
    const parsedFeature = feature.split('_')
      .map(word => capitalize(word))
      .join(' ')

    return (
      <Fragment>
        {index !== 0 ? <div className="separator">•</div> : ''}
        <div className="feature" key={index}>{parsedFeature}</div>
      </Fragment>
    )
  })
}

export default SearchResultsListItem
