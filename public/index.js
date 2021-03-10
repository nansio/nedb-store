function geolocationExist() {
  if (navigator.geolocation) {
    return true
  }
  console.log('geolocation not available')
  return false
}

if(geolocationExist()) {
  const geo = navigator.geolocation
  geo.getCurrentPosition(async (position) => {
    const {longitude, latitude} = position.coords
    document.getElementById('lat').textContent = '经度: ' + latitude
    document.getElementById('lon').textContent = '纬度: ' + longitude
    console.log('位置已获取: 经度', latitude,'纬度', longitude)
    const data = {lon: longitude, lat: latitude}
    postLocation(data)
    getWeather(data)
  }, error => {
    console.log('位置获取失败:', error)
  })
}


function postLocation(data) {
  fetch('/api', {
    body: JSON.stringify(data),
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    }
  }).then(res => {
    console.log('location sent!')
  })
}


async function getWeather(data) {
  const {lon,lat} = data
  const response = await fetch(`/weather/${lat},${lon}`)
  const json = await response.json()
  const city_name = json.name
  const {feels_like, humidity, temp_max, temp_min} = json.main
  const wind = {...json.wind}
  const weather_description = json.weather[0].description
  document.getElementById('location').textContent = '当前城市: ' + city_name
  document.getElementById('description').textContent = '天气: ' + weather_description
  document.getElementById('feels_like').textContent = '体感温度: ' + feels_like
  document.getElementById('temp_max').textContent = '最高气温: ', + temp_max 
  document.getElementById('temp_min').textContent = '最低气温: ', + temp_min
  document.getElementById('humidity').textContent = '空气湿度: ', + humidity
  document.getElementById('wind').textContent = '风速: ', + wind.speed + ', 风向: ' + wind.deg + '°' 
  

}