import React from 'react'
import PropTypes from 'prop-types'
import ResultHeadline from './ResultHeadline'
import ResultKeyFacts from './ResultKeyFacts'
import ResultFeatures from './ResultFeatures'
import ResultPrice from './ResultPrice'

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
        <ResultHeadline
          carDetailsUrl={carDetailsUrl}
          vehicleMake={vehicleMake}
          vehicleModel={vehicleModel}
          engineSize={engineSize}
          postcode={postcode}
          availabilityDate={availabilityDate}
        />
        <ResultKeyFacts
          year={year}
          bodyType={bodyType}
          transmission={transmission}
          fuel={fuel}
          numberSeats={numberSeats}
          numberDoors={numberDoors}
          color={color}
        />
        <ResultFeatures features={features} />
        <ResultPrice prices={prices} carDetailsUrl={carDetailsUrl} />
      </div>
    </div>
  )
}

SearchResultsListItem.propTypes = {
  data: PropTypes.object.isRequired
}

function _getMainImage (images) {
  return images.filter(image => image.position === 0)[0]
}

function _getCarDetailsUrl (vehicleMake, vehicleModel, id) {
  return `https://www.joindrover.com/cars/${vehicleMake}/${encodeURI(vehicleModel)}/${id}`
}

export default SearchResultsListItem
