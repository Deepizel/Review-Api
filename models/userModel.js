const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  nonce: {
    type: String,
    required: true,
    default: () => Math.floor(Math.random() * 1000000).toString(),
  },
  username: {
    type: String,
    default: null,
  },
  email: {
    type: String,
    default: null,
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

export default mongoose.models.User || mongoose.model("User", UserSchema);
