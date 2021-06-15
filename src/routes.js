const express = require('express')
const jwt = require('jsonwebtoken')
const routes = express.Router()

const User = require('./models/User')

const loginController = require('./controllers/LoginController')

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

routes.post('/login', loginController.login)

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

routes.post('/addurl', async (req, res) => {
  const authorizationHeader = req.headers.authorization
  const token = authorizationHeader.split(' ')[1]

  const { id } = jwt.verify(token, 'secret')
  
  const user = await User.findOne({ _id: id })

  if (!user) {
    res.status(401).json({ message: 'Unauthorized' })
  }

  const data = req.body

  const newURL = { original_url: data.url }

  try {
    await User.updateOne({ _id: id }, { $push: { urls: newURL } })
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }

  res.status(200).json({ message: 'Sucess request' })
})

module.exports = routes