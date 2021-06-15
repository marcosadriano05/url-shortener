const jwt = require('jsonwebtoken')

const User = require('../models/User')

class LoginController {
  async login (req, res) {
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
  }
}

module.exports = new LoginController()