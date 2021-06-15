const User = require('../models/User')

class CustomUrlController {
  async redirect (req, res) {
    const path = req.path
    const customUrl = `http://localhost:3000${path}`

    try {
      const user = await User.findOne({ urls: { $elemMatch: { shorted_url: customUrl } } })
      const originalUrl = user.urls.find(url => url.shorted_url === customUrl)
      
      res.status(200).redirect(originalUrl.original_url)
    } catch (error) {
      res.status(404).json({ message: 'Site not found' })
    }
  }
}

module.exports = new CustomUrlController()