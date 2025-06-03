const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  phone: String,
  role: { type: String, enum: ['user', 'provider', 'admin'], default: 'user' },
  password: String,
});
module.exports = mongoose.model('User', UserSchema);