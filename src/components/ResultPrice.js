import React from 'react'
import PropTypes from 'prop-types'

function ResultPrice ({ prices, carDetailsUrl }) {
  return (
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
  )
}

ResultPrice.propTypes = {
  prices: PropTypes.object.isRequired,
  carDetailsUrl: PropTypes.string.isRequired
}

function _getPrice (prices) {
  return prices[12].driver_price_pounds_after_discount_including_insurance
}

export default ResultPrice
