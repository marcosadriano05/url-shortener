const mongoose = require('mongoose')
const { Schema } = mongoose

const UserSchema = new Schema({
  name: String,
  email: String,
  password: String,
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: Date,
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
})

const User = mongoose.model('User', UserSchema)

module.exports = User