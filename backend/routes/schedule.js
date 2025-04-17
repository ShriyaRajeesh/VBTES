const express = require('express');
const router = express.Router();
const Schedule = require('../models/Schedule');

router.get('/', async (req, res) => res.json(await Schedule.find()));
router.post('/', async (req, res) => res.status(201).json(await new Schedule(req.body).save()));
router.put('/:id', async (req, res) => res.json(await Schedule.findByIdAndUpdate(req.params.id, req.body, { new: true })));
router.delete('/:id', async (req, res) => res.json(await Schedule.findByIdAndDelete(req.params.id)));

module.exports = router;