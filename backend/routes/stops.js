const express = require('express');
const router = express.Router();
const Stop = require('../models/Stop');

router.get('/', async (req, res) => res.json(await Stop.find()));
router.post('/', async (req, res) => res.status(201).json(await new Stop(req.body).save()));
router.put('/:id', async (req, res) => res.json(await Stop.findByIdAndUpdate(req.params.id, req.body, { new: true })));
router.delete('/:id', async (req, res) => res.json(await Stop.findByIdAndDelete(req.params.id)));

module.exports = router;