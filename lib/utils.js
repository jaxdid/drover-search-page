export function convertValueForApi (filterName, value) {
  const valueTypes = {
    array: ['tags'],
    number: ['subscription_start_days', 'max_distance', 'year'],
    string: ['vehicle_make', 'transmission', 'fuel']
  }

  if (valueTypes.array.includes(filterName)) {
    return [value]
  } else if (valueTypes.number.includes(filterName)) {
    return Number(value)
  } else if (valueTypes.string.includes(filterName)) {
    return String(value)
  }
}

export function capitalize (string) {
  const words = string.split(' ')
  return words.map(word => word.replace(/\w/, firstLetter => firstLetter.toUpperCase()))
    .join(' ')
}
