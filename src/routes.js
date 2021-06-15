const express = require('express')
const jwt = require('jsonwebtoken')
const routes = express.Router()

const User = require('./models/User')

routes.post('/signup', async (req, res) => {
  const data = req.body

  const isUserExists = await User.findOne({ email: data.email })

  if (isUserExists) {
    return res.json({ message: 'User alredy exists' })
  }

  if (data.password !== data.same_password) {
    return res.json({ message: 'Password not match' })
  }

  try {
    await User.create({
      name: data.name,
      email: data.email,
      password: data.password
    })
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }

  return res.status(200).json({ message: 'Registration done successfully' })
})

routes.post('/login', async (req, res) => {
  const data = req.body

  const user = await User.findOne({ email: data.email })

  if (!user) {
    return res.json({ message: 'User not exists' })
  }

  try {
    const token = jwt.sign({ id: user._id }, 'secret', { expiresIn: '1h' })
    return res.status(200).json(token)
  } catch (err) {
    return res.status(500).json({ message: 'Server error' })
  }
})

routes.get('/dashboard', async (req, res) => {
  const authorizationHeader = req.headers.authorization
  const token = authorizationHeader.split(' ')[1]

  const { id } = jwt.verify(token, 'secret')
  
  const user = await User.findOne({ _id: id })

  if (!user) {
    res.status(401).json({ message: 'Unauthorized' })
  }

  res.status(200).json(user)
})

module.exports = routes