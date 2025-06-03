const mongoose = require('mongoose');
const ServiceSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
});
module.exports = mongoose.model('Service', ServiceSchema);