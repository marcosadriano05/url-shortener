const User = require('../models/User')

const authUseCase = require('../utils/AuthUseCase')
const generateUrlUseCase = require('../utils/GenerateUrlUseCase')

class UrlController {
  async getAll (req, res) {
    const authorizationHeader = req.headers.authorization
    try {
      const { isAuth, id, message } = await authUseCase.auth(authorizationHeader)
  
      if (!isAuth) {
        res.status(401).json({ message, message_ptbr: 'Sem autorização' })
      }

      const { urls } = await User.findOne({ _id: id })

      res.status(200).json(urls)
    } catch (error) {
      res.status(500).json({ 
        message: 'Server error',
        message_ptbr: 'Erro no servidor'
      })
    }
  }

  async add (req, res) {
    const authorizationHeader = req.headers.authorization
  
    try {
      const { isAuth, id, message } = await authUseCase.auth(authorizationHeader)
  
      if (!isAuth) {
        res.status(401).json({ message, message_ptbr: 'Sem autorização' })
      }
  
      const data = req.body
  
      const newURL = { 
        original_url: data.url,
        shorted_url: `${process.env.BASE_URL}/custom/${generateUrlUseCase.create()}` 
      }
  
      await User.updateOne({ _id: id }, { $push: { urls: newURL } })
      res.status(200).json({ 
        message: 'URL registred',
        message_ptbr: 'URL cadastrada'
      })
    } catch (error) {
      res.status(500).json({ 
        message: 'Server error',
        message_ptbr: 'Erro no servidor'
      })
    }
  }
}

module.exports = new UrlController()