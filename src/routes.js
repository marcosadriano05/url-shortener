const express = require('express')
const routes = express.Router()

const User = require('./models/User')

const loginController = require('./controllers/LoginController')
const signUpController = require('./controllers/SignUpController')

const authUseCase = require('./utils/AuthUseCase')

routes.post('/signup', signUpController.signUp)

routes.post('/login', loginController.login)

routes.get('/dashboard', async (req, res) => {
  const authorizationHeader = req.headers.authorization

  try {
    const { isAuth, message } = await authUseCase.auth(authorizationHeader)

    if (!isAuth) {
      res.status(401).json({ message })
    }

    res.status(200).json({ message })
  } catch (error) {
    res.status(500). json({ message })
  }
})

routes.post('/addurl', async (req, res) => {
  const authorizationHeader = req.headers.authorization

  try {
    const { isAuth, id, message } = await authUseCase.auth(authorizationHeader)

    if (!isAuth) {
      res.status(401).json({ message })
    }

    const data = req.body

    const newURL = { original_url: data.url }

    await User.updateOne({ _id: id }, { $push: { urls: newURL } })
    res.status(200).json({ message: 'Sucess request' })
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }

})

module.exports = routes