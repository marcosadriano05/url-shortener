require('dotenv').config()
const express = require('express')
const userdata = require('../userdata.json')

const server = express()

server.use(express.json())

server.post('/signup', (req, res) => {
  const data = req.body

  if (data.password !== data.same_password) {
    return res.json({ message: "Error" })
  }

  return res.json({ message: 'Successful login' })
})

server.get('/dashboard', (req, res) => {
  res.json(userdata)
})

const port = process.env.PORT || 3000

server.listen(port, () => console.log(`Server on port ${port}`))