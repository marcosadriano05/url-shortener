require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes')
/*
mongoose.connect('mongodb://localhost/url-shortener', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error: '))
db.once(() => {})
*/
const server = express()

server.use(express.json())
server.use(routes)

const port = process.env.PORT || 3000

server.listen(port, () => console.log(`Server on port ${port}`))