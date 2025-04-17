const express = require('express');
const router = express.Router();
const RealtimeUpdate = require('../models/RealtimeUpdate');

router.get('/', async (req, res) => res.json(await RealtimeUpdate.find()));
router.post('/', async (req, res) => res.status(201).json(await new RealtimeUpdate(req.body).save()));
router.put('/:id', async (req, res) => res.json(await RealtimeUpdate.findByIdAndUpdate(req.params.id, req.body, { new: true })));
router.delete('/:id', async (req, res) => res.json(await RealtimeUpdate.findByIdAndDelete(req.params.id)));

module.exports = router;