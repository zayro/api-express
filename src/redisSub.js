const express = require('express')
const redis = require('redis')

const subscriber = redis.createClient()
subscriber.connect()

const app = express()

subscriber.subscribe('test', (message) => {
  console.log(message)
})

app.get('/', (req, res) => {
  res.send('Subscriber One')
})

app.listen(3001, () => {
  console.log('server is listening to port 3001')
})
