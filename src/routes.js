const express = require('express')
const routes = express.Router()

const { userscollection } = require('../userdata.json')

routes.post('/signup', (req, res) => {
  const data = req.body

  if (data.password !== data.same_password) {
    return res.json({ message: "Error" })
  }

  return res.status(200).json({ message: 'Registration done successfully' })
})

routes.post('/login', (req, res) => {
  const data = req.body

  const user = userscollection.find(user => user.email === data.email)

  if (!user) {
    return res.json({ message: "User not exists" })
  }

  return res.json(user)
})

routes.get('/dashboard', (req, res) => {
  res.json(userscollection)
})

module.exports = routes