const jwt = require('jsonwebtoken')

const User = require('../models/User')

class AuthUseCase {
  async auth (bearerToken) {
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
}

module.exports = new AuthUseCase()