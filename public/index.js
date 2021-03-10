function geolocationExist() {
  if (navigator.geolocation) {
    return true
  }
  console.log('geolocation not available')
  return false
}

if(geolocationExist()) {
  const geo = navigator.geolocation
  geo.getCurrentPosition(position => {
    const {longitude, latitude} = position.coords
    document.getElementById('lat').textContent = '经度: ' + latitude
    document.getElementById('lon').textContent = '纬度: ' + longitude
    console.log('位置已获取: 经度', latitude,'纬度', longitude)
    const data = {lon: longitude, lat: latitude}
    fetch('/api', {
      body: JSON.stringify(data),
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      }
    }).then(res => {
      console.log(res)
    })
  }, error => {
    console.log('位置获取失败:', error)
  })
}