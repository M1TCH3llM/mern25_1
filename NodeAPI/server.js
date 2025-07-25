let express = require('express')

const app = express()

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.get('/first', (req, res) => {
  res.send('First Endpoint')
})

app.get('/third', (req, res) => {
  res.send('Third End Point ')
})

app.listen(3000)
