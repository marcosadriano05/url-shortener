const express = require('express')
const jwt = require('jsonwebtoken')
const routes = express.Router()

const User = require('./models/User')

const loginController = require('./controllers/LoginController')
const signUpController = require('./controllers/SignUpController')

routes.post('/signup', signUpController.signUp)

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