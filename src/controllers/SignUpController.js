const User = require('../models/User')

const encryptUseCase = require('../utils/EncryptUseCase')
const emailValidator = require('../utils/ValidationUseCase')

class SignUpController {
  async signUp (req, res) {
    const data = req.body
  
    try {
      const isEmailValid = emailValidator.isValid(data.email)

      if (!isEmailValid) {
        return res.status(400).json({ 
          message: 'Email with invalid format',
          message_ptbr: 'Email com formato inválido'
        })
      }

      const isUserExists = await User.findOne({ email: data.email })
    
      if (isUserExists) {
        return res.status(400).json({ 
          message: 'User alredy exists',
          message_ptbr: 'Usuário já existe'
        })
      }
    
      if (data.password !== data.same_password) {
        return res.status(400).json({ 
          message: 'Password not match',
          message_ptbr: 'As senhas precisam ser iguais'
        })
      }

      const encryptedPassword = await encryptUseCase.encrypt(data.password)
    
      await User.create({
        name: data.name,
        email: data.email,
        password: encryptedPassword
      })

      return res.status(200).json({ 
        message: 'Registration done successfully',
        message_ptbr: 'Cadastro realizado com sucesso'
      })
    } catch (error) {
      res.status(500).json({ 
        message: 'Server error',
        message_ptbr: 'Erro no servidor'
      })
    }
  }
}

module.exports = new SignUpController()