const express = require('express');
const router = express.Router();
const Operator = require('../models/Operator');

router.get('/', async (req, res) => res.json(await Operator.find()));
router.post('/', async (req, res) => res.status(201).json(await new Operator(req.body).save()));
router.put('/:id', async (req, res) => res.json(await Operator.findByIdAndUpdate(req.params.id, req.body, { new: true })));
router.delete('/:id', async (req, res) => res.json(await Operator.findByIdAndDelete(req.params.id)));

module.exports = router;
