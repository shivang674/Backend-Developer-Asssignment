const express = require('express');
const Service = require('../models/Service');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/services', auth(['admin']), async function(req, res) { {
  const service = await Service.create(req.body);
  res.json(service);
});

router.put('/services/:id', auth(['admin']), async function(req, res) { {
  const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(service);
});
module.exports = router;