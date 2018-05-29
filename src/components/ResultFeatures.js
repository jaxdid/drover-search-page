import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { capitalize } from '../../lib/utils'

function ResultFeatures ({ features }) {
  return (
    <div className="features">
      {_renderFeatures(features)}
    </div>
  )
}

ResultFeatures.propTypes = {
  features: PropTypes.array.isRequired
}

function _renderFeatures (features) {
  return features.map((feature, index) => {
    const parsedFeature = feature.split('_')
      .map(word => capitalize(word))
      .join(' ')

    return (
      <Fragment key={index}>
        {index !== 0 ? <div className="separator">•</div> : ''}
        <div className="feature">{parsedFeature}</div>
      </Fragment>
    )
  })
}

export default ResultFeatures
