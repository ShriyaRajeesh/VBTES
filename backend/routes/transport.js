const express = require('express');
const router = express.Router();
const Transport = require('../models/Transport');

router.get('/', async (req, res) => res.json(await Transport.find()));
router.post('/', async (req, res) => res.status(201).json(await new Transport(req.body).save()));
router.put('/:id', async (req, res) => res.json(await Transport.findByIdAndUpdate(req.params.id, req.body, { new: true })));
router.delete('/:id', async (req, res) => res.json(await Transport.findByIdAndDelete(req.params.id)));

module.exports = router;