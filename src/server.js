require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const { userscollection } = require('../userdata.json')

mongoose.connect('mongodb://localhost/url-shortener', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error: '))
db.once(() => {})

const server = express()

server.use(express.json())

server.post('/signup', (req, res) => {
  const data = req.body

  if (data.password !== data.same_password) {
    return res.json({ message: "Error" })
  }

  return res.status(200).json({ message: 'Registration done successfully' })
})

server.post('/login', (req, res) => {
  const data = req.body

  const user = userscollection.find(user => user.email === data.email)

  if (!user) {
    return res.json({ message: "User not exists" })
  }

  return res.json(user)
})

server.get('/dashboard', (req, res) => {
  res.json(userscollection)
})

const port = process.env.PORT || 3000

server.listen(port, () => console.log(`Server on port ${port}`))