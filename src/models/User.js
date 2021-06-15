const mongoose = require('mongoose')
const { Schema } = mongoose

const UserSchema = new Schema({
  name: String,
  email: String,
  password: String,
  urls: [
    {
      original_url: String,
      shorted_url: String,
      created_at: {
        type: Date,
        default: Date.now
      }
    }
  ]
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

const User = mongoose.model('User', UserSchema)

module.exports = User