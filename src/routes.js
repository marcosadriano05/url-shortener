const express = require('express')
const routes = express.Router()

const loginController = require('./controllers/LoginController')
const signUpController = require('./controllers/SignUpController')
const urlController = require('./controllers/UrlController')
const customUrlController = require('./controllers/CustomUrlController')
const authController = require('./controllers/AuthController')

routes.post('/signup', signUpController.signUp)

routes.post('/login', loginController.login)

routes.get('/userurl', urlController.getAll)
routes.post('/userurl', urlController.add)

routes.get('/custom/:code', customUrlController.redirect)

routes.get('/auth', authController.isAuth)

module.exports = routes