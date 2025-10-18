const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    default: null,
  }, 
   lastName: {
    type: String,
    default: null,
  },
  userName: {
    type: String,
    default: null,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: function(v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: 'Invalid email address',
    },
  },
  password: {
    type: String,
    default: null,
  },
  roleType: {
    type: String,
    default: 'user',
  },
  lastLogin: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});



const User = mongoose.models.User || mongoose.model("User", UserSchema);
module.exports = User;
