const jwt = require('jsonwebtoken')

const User = require('../models/User')

class AuthUseCase {
  create (id) {
    const token = jwt.sign({ id }, process.env.TOKEN_SECRET, { expiresIn: '1h' })
    return token
  }

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
    
      const { id } = jwt.verify(token, process.env.TOKEN_SECRET)
    
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
        user_name: user.name,
        user_email: user.email,
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