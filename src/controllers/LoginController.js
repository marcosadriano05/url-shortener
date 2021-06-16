const User = require('../models/User')

const authUseCase = require('../utils/AuthUseCase')

class LoginController {
  async login (req, res) {
    const data = req.body
  
    try {
      const user = await User.findOne({ email: data.email })

      if (!user || user.password !== data.password) {
        return res.json({ message: 'Invalid credentials' })
      }
  
      const token = authUseCase.create(user._id)
      
      return res.status(200).json(token)
    } catch (err) {
      return res.status(500).json({ message: 'Server error' })
    }
  }
}

module.exports = new LoginController()