const jwt = require('jsonwebtoken');
const User = require('../models/User');

const otpStore = new Map();

exports.register = async (req, res) => {
    const { name, phone, role } = req.body;
    if (!name || !phone || !role) {
        return res.status(400).json({ msg: 'All fields are required.' });
    }

    try {
        const existingUser = await User.findOne({ phone });
        if (existingUser) {
            return res.status(409).json({ msg: 'User already exists.' });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        otpStore.set(phone, otp);

        console.log([OTP] Sent to ${phone}: ${otp}); // Simulate SMS

        res.status(200).json({ msg: 'OTP sent successfully.' });
    } catch (err) {
        res.status(500).json({ msg: 'Server error during registration.' });
    }
};

exports.verifyOtp = async (req, res) => {
    const { phone, otp } = req.body;

    if (!otp || !phone) {
        return res.status(400).json({ msg: 'OTP and phone are required.' });
    }

    const savedOtp = otpStore.get(phone);
    if (savedOtp !== otp) {
        return res.status(401).json({ msg: 'Invalid OTP.' });
    }

    otpStore.delete(phone);

    let user = await User.findOne({ phone });
    if (!user) {
        return res.status(404).json({ msg: 'User not found after OTP verification.' });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: '7d',
    });

    res.status(200).json({ msg: 'Login successful.', token, user });
};