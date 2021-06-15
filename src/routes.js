const express = require('express')
const jwt = require('jsonwebtoken')
const routes = express.Router()

const User = require('./models/User')

const loginController = require('./controllers/LoginController')
const signUpController = require('./controllers/SignUpController')

routes.post('/signup', signUpController.signUp)

routes.post('/login', loginController.login)

const authUseCase = async (bearerToken) => {
  if (!bearerToken) {
    return {
      isAuth: false,
      id: '',
      message: 'No header has been provided'
    }
  }

  try {
    const token = bearerToken.split(' ')[1]
  
    const { id } = jwt.verify(token, 'secret')
  
    const user = await User.findOne({ _id: id })

    if (!user) {
      return {
        isAuth: false,
        id,
        message: 'Unauthorized'
      }
    }
  
    return {
      isAuth: true,
      id,
      message: 'Authorized'
    }
  } catch (error) {
    return {
      isAuth: false,
      id,
      message: 'Server error'
    }
  }
}

routes.get('/dashboard', async (req, res) => {
  const authorizationHeader = req.headers.authorization
  const { isAuth, message } = await authUseCase(authorizationHeader)

  if (!isAuth) {
    res.status(401).json({ message })
  }

  res.status(200).json({ message })
})

routes.post('/addurl', async (req, res) => {
  const authorizationHeader = req.headers.authorization
  const { isAuth, id, message } = await authUseCase(authorizationHeader)

  if (!isAuth) {
    res.status(401).json({ message })
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