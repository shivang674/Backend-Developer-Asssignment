const Booking = require('../models/Booking');

exports.createBooking = async (req, res) => {
    const { serviceId, date, notes } = req.body;

    if (!serviceId || !date) {
        return res.status(400).json({ msg: 'Service and date are required.' });
    }

    try {
        const booking = new Booking({
            user: req.user.id,
            service: serviceId,
            date,
            notes,
        });

        await booking.save();
        res.status(201).json({ msg: 'Booking created successfully.', booking });
    } catch (err) {
        res.status(500).json({ msg: 'Failed to create booking.' });
    }
};

exports.getUserBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user.id }).populate('service');
        res.status(200).json({ bookings });
    } catch (err) {
        res.status(500).json({ msg: 'Error fetching bookings.' });
    }
};

exports.updateBooking = async (req, res) => {
    const { bookingId } = req.params;
    const updates = req.body;

    try {
        const updated = await Booking.findByIdAndUpdate(bookingId, updates, { new: true });
        res.status(200).json({ msg: 'Booking updated.', updated });
    } catch (err) {
        res.status(500).json({ msg: 'Update failed.' });
    }
};