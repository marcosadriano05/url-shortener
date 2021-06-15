const User = require('../models/User')

const authUseCase = require('../utils/AuthUseCase')

class UrlController {
  async getAll (req, res) {
    const authorizationHeader = req.headers.authorization
    try {
      const { isAuth, id, message } = await authUseCase.auth(authorizationHeader)
  
      if (!isAuth) {
        res.status(401).json({ message })
      }

      const { urls } = await User.findOne({ _id: id })

      res.status(200).json(urls)
    } catch (error) {
      res.status(500).json({ message: 'Server error' })
    }
  }

  async add (req, res) {
    const authorizationHeader = req.headers.authorization
  
    try {
      const { isAuth, id, message } = await authUseCase.auth(authorizationHeader)
  
      if (!isAuth) {
        res.status(401).json({ message })
      }
  
      const data = req.body
  
      const newURL = { original_url: data.url }
  
      await User.updateOne({ _id: id }, { $push: { urls: newURL } })
      res.status(200).json({ message: 'Sucess request' })
    } catch (error) {
      res.status(500).json({ message: 'Server error' })
    }
  }
}

module.exports = new UrlController()