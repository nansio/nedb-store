const express = require('express')
const DataStore = require('nedb')

const server = express()
const db = new DataStore({
  filename: '../db/record.db',
  timestampData: true
})
db.loadDatabase(err => {
  if (err) {
    console.log('数据库加载失败:', err)
  }
})

server.use(express.json())

const port = 3333

server.listen(port, () => {
  console.log('express-server listening at port: ', port)
})

server.use(express.static('../public'))



// 处理 POST 请求 存到数据库
server.post('/api', (req, res) => {
  const { lon, lat } = req.body
  const doc = {
    lon,
    lat
  }
  db.insert(doc,(error, newDoc) => {
    if (error) {
      console.log('数据插入失败:', error)
    }
  })
  res.json({
    code: 200,
    success: true,
    data: {lon, lat}
  })
})

server.get('/api', (req, res) => {
  db.find({}, (err, docs) => {
    if (err) {
      console.log('数据库查询出错:', err)
      res.json({
        code: 500,
        message: 'error query database'
      })
      return
    }
    res.json(docs)
  })
})