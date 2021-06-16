const User = require('../models/User')

const encryptUseCase = require('../utils/EncryptUseCase')

class SignUpController {
  async signUp (req, res) {
    const data = req.body
  
    try {
      const isUserExists = await User.findOne({ email: data.email })
    
      if (isUserExists) {
        return res.json({ message: 'User alredy exists' })
      }
    
      if (data.password !== data.same_password) {
        return res.json({ message: 'Password not match' })
      }

      const encryptedPassword = await encryptUseCase.encrypt(data.password)
    
      await User.create({
        name: data.name,
        email: data.email,
        password: encryptedPassword
      })

      return res.status(200).json({ message: 'Registration done successfully' })
    } catch (error) {
      res.status(500).json({ message: 'Server error' })
    }
  }
}

module.exports = new SignUpController()