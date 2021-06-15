require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes')

mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@projects.bctlc.mongodb.net/url-shortener`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const server = express()

server.use(express.json())
server.use(routes)

const port = process.env.PORT || 3000

server.listen(port, () => console.log(`Server on port ${port}`))