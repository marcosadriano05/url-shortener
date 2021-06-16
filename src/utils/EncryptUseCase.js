const bcrypt = require('bcrypt')

class EncryptUseCase {
  async encrypt (value) {
    try {
      const hash = await bcrypt.hash(value, 10)
  
      return hash
    } catch (error) {
      throw new Error()
    }
  }

  async compare (encrypt, hash) {
    try {
      const isEqual = await bcrypt.compare(encrypt, hash)
      
      return isEqual
    } catch (error) {
      throw new Error()
    }
  }
}

module.exports = new EncryptUseCase()