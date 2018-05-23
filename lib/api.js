function fetchSearchResults (query) {
  return window.fetch('https://app.joindrover.com/api/web/vehicles', {
    method: 'post',
    headers: {
      'accept': 'application/json',
      'content-type': 'application/json'
    },
    body: JSON.stringify(query)
  })
    .then(resp => resp.json())
}

export default fetchSearchResults
