const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

router.get('/', async (req, res) => res.json(await Booking.find()));
router.post('/', async (req, res) => res.status(201).json(await new Booking(req.body).save()));
router.put('/:id', async (req, res) => res.json(await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true })));
router.delete('/:id', async (req, res) => res.json(await Booking.findByIdAndDelete(req.params.id)));

module.exports = router;