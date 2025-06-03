const express = require('express');
const Booking = require('../models/Booking');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/', auth(), async function(req, res) { {
  const booking = await Booking.create({ ...req.body, user: req.user.id });
  res.json(booking);
});

router.get('/', auth(), async function(req, res) { {
  const bookings = await Booking.find({ user: req.user.id }).populate('service provider');
  res.json(bookings);
});

router.put('/:id', auth(), async function(req, res) { {
  const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(booking);
});
module.exports = router;