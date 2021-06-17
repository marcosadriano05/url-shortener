const authUseCase = require('../utils/AuthUseCase')

class AuthController {
  async isAuth (req, res) {
    const authHeader = req.headers.authorization
    try {
      const { isAuth, user_name, user_email, message } = await authUseCase.auth(authHeader)
  
      if (!isAuth) {
        res.status(401).json({ isAuth, message, message_ptbr: 'Sem autorização' })
      }

      res.status(200).json({ 
        isAuth, user_name, user_email, message, message_ptbr: 'Autorizado' 
      })
    } catch (error) {
      res.status(500).json({ 
        isAuth: false,
        message: 'Server error',
        message_ptbr: 'Erro no servidor'
      })
    }
  }
}

module.exports = new AuthController()