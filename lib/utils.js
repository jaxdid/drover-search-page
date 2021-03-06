const DEFAULT_LOCATION = 'London, UK'
const DEFAULT_START_DATE_DELAY = 30
const DEFAULT_MAX_DISTANCE = 50

export function convertValueForApi (filterName, value) {
  if (value === '*') {
    return '*'
  }

  const valueType = {
    tags: 'array',
    subscription_start_days: 'number',
    max_distance: 'number',
    year: 'number',
    vehicle_make: 'string',
    transmission: 'string',
    fuel: 'string'
  }[filterName]

  if (valueType === 'array') {
    return [value]
  } else if (valueType === 'number') {
    return Number(value)
  } else if (valueType === 'string') {
    return value
  }
}

export function capitalize (string) {
  const words = string.split(' ')
  return words.map(word => {
    return word.replace(/\w/, firstLetter => firstLetter.toUpperCase())
  }).join(' ')
}

export function getDefaultQuery () {
  return {
    'location': DEFAULT_LOCATION,
    'max_distance': DEFAULT_MAX_DISTANCE,
    'order_by': 'price',
    'order_direction': 'asc',
    'page': 1,
    'per_page': 15,
    'price_max': 2500,
    'price_min': 100,
    'subscription_start_days': DEFAULT_START_DATE_DELAY,
    'vehicle_type': 'Consumer'
  }
}

export function getUpdatedQuery (previousQuery, updatedFilter, newValue) {
  const query = previousQuery

  if (newValue === '*') {
    delete query[updatedFilter]
  } else {
    query[updatedFilter] = newValue
  }

  if (updatedFilter !== 'page') {
    query.page = 1
  }

  return query
}

export function getBaseFilterSettings () {
  return {
    location: {
      label: 'Location',
      defaultValue: DEFAULT_LOCATION,
      staticValues: true
    },
    subscription_start_days: {
      label: 'Subscription starts within the next',
      options: [
        {label: '2 Days', value: 2},
        {label: '14 Days', value: 14},
        {label: '30 Days', value: 30}
      ],
      defaultValue: DEFAULT_START_DATE_DELAY,
      staticValues: true
    },
    max_distance: {
      label: 'Distance (radius in miles)',
      options: [
        {label: '25', value: 25},
        {label: '50', value: 50},
        {label: '75', value: 75},
        {label: '100', value: 100},
        {label: '150', value: 150},
        {label: '200', value: 200}
      ],
      defaultValue: DEFAULT_MAX_DISTANCE,
      staticValues: true
    },
    vehicle_make: {
      label: 'Vehicle Make',
      options: {},
      staticValues: false
    },
    transmission: {
      label: 'Gearbox',
      options: {},
      staticValues: false
    },
    year: {
      label: 'Year',
      options: {},
      staticValues: false
    },
    fuel: {
      label: 'Fuel Type',
      options: {},
      staticValues: false
    },
    tags: {
      label: 'Car Type',
      options: {},
      staticValues: false
    }
  }
}

export function debounce (fn, time) {
  let timeout

  return function () {
    const functionCall = () => fn.apply(this, arguments)

    window.clearTimeout(timeout)
    timeout = window.setTimeout(functionCall, time)
  }
}
