const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const sendMockOtp = require('../utils/mockOtp');

const router = express.Router();

router.post('/register', async function(req, res) { {
  const { name, email, phone, password, role } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, phone, role, password: hashed });
  res.json(user);
});

router.post('/login', async function(req, res) { {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ msg: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
  sendMockOtp(user.phone);
  res.json({ token });
});

module.exports = router;