const Service = require('../models/Service');

exports.createService = async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ msg: 'Admins only can create services.' });
    }

    const { name, description, price } = req.body;
    if (!name || !price) {
        return res.status(400).json({ msg: 'Name and price are required.' });
    }

    try {
        const newService = new Service({ name, description, price });
        await newService.save();
        res.status(201).json({ msg: 'Service created.', service: newService });
    } catch (err) {
        res.status(500).json({ msg: 'Service creation failed.' });
    }
};

exports.updateService = async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ msg: 'Only admin can update services.' });
    }

    const { serviceId } = req.params;
    const updates = req.body;

    try {
        const updatedService = await Service.findByIdAndUpdate(serviceId, updates, { new: true });
        res.status(200).json({ msg: 'Service updated.', service: updatedService });
    } catch (err) {
        res.status(500).json({ msg: 'Error updating service.' });
    }
};

exports.getAllServices = async (req, res) => {
    try {
        const services = await Service.find();
        res.status(200).json({ services });
    } catch (err) {
        res.status(500).json({ msg: 'Could not fetch services.' });
    }
};