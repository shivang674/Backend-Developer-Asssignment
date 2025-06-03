const mongoose = require('mongoose');
const BookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  provider: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' },
  status: { type: String, enum: ['pending', 'confirmed', 'completed'], default: 'pending' },
  scheduledAt: Date,
});
module.exports = mongoose.model('Booking', BookingSchema);