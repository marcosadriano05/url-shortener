const User = require('../models/User')

class SignUpController {
  async signUp (req, res) {
    const data = req.body
  
    const isUserExists = await User.findOne({ email: data.email })
  
    if (isUserExists) {
      return res.json({ message: 'User alredy exists' })
    }
  
    if (data.password !== data.same_password) {
      return res.json({ message: 'Password not match' })
    }
  
    try {
      await User.create({
        name: data.name,
        email: data.email,
        password: data.password
      })
    } catch (error) {
      res.status(500).json({ message: 'Server error' })
    }
  
    return res.status(200).json({ message: 'Registration done successfully' })
  }
}

module.exports = new SignUpController()