const express = require('express');
const Razorpay = require('razorpay');
const auth = require('../middleware/auth');
const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY,
  key_secret: process.env.RAZORPAY_SECRET,
});

router.post('/order', auth(), async function(req, res) { {
  const options = {
    amount: req.body.amount * 100,
    currency: 'INR',
    receipt: `receipt_order_${Date.now()}`,
  };
  const order = await razorpay.orders.create(options);
  res.json(order);
});

module.exports = router;