getLogs()


async function getLogs() {
  const response = await fetch('/api')
  const data = await response.json()
  console.log('data:', data)
  const logs = [...data]
  const logs_container = document.getElementById('logs-container')
  logs.forEach(log => {
    const log_div = document.createElement('div')
    log_div.classList.add('log-item')
    const header_id = document.createElement('h1')
    header_id.textContent = log._id
    const p_pos = document.createElement('p')
    p_pos.textContent = '纬度: ' + log.lat + ' 经度: ' + log.lon
    log_div.append(header_id, p_pos)
    logs_container.append(log_div)
  })
}