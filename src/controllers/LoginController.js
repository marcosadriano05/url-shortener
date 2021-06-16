const User = require('../models/User')

const authUseCase = require('../utils/AuthUseCase')
const encryptUseCase = require('../utils/EncryptUseCase')

class LoginController {
  async login (req, res) {
    const data = req.body
  
    try {
      const user = await User.findOne({ email: data.email })

      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' })
      }

      const isPasswordValid = await encryptUseCase.compare(data.password, user.password)
      
      if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid credentials' })
      }
  
      const token = authUseCase.create(user._id)
      
      return res.status(200).json({ token })
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: 'Server error' })
    }
  }
}

module.exports = new LoginController()