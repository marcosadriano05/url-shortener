require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const routes = require('./routes')

const mongodbUser = process.env.MONGO_DB_USER
const mongdbPassword = process.env.MONGO_DB_PASSWORD
mongoose.connect(
  `mongodb+srv://${mongodbUser}:${mongdbPassword}@projects.bctlc.mongodb.net/url-shortener`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const server = express()

server.use(cors())
server.use(express.json())
server.use(routes)

const port = process.env.PORT || 3333

server.listen(port, () => console.log(`Server on port ${port}`))