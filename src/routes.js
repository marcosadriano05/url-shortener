const express = require('express')
const routes = express.Router()

const User = require('./models/User')

const { userscollection } = require('../userdata.json')

routes.post('/signup', async (req, res) => {
  const data = req.body

  const isUserExists = await User.findOne({ email: data.email })
  console.log(isUserExists)

  if (isUserExists) {
    return res.json({ message: 'User alredy exists'})
  }

  if (data.password !== data.same_password) {
    return res.json({ message: "Password not match" })
  }

  await User.create({
    name: data.name,
    email: data.email,
    password: data.password
  }, (err, _) => {
    if (err) return console.log(err)
  })

  return res.status(200).json({ message: 'Registration done successfully' })
})

routes.post('/login', async (req, res) => {
  const data = req.body

  const user = await User.findOne({ email: data.email })

  if (!user) {
    return res.json({ message: "User not exists" })
  }

  return res.json(user)
})

routes.get('/dashboard', (req, res) => {
  res.json(userscollection)
})

module.exports = routes