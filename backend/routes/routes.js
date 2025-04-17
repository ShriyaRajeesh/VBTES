const express = require('express');
const router = express.Router();
const Route = require('../models/Route');

router.get('/', async (req, res) => res.json(await Route.find()));
router.post('/', async (req, res) => res.status(201).json(await new Route(req.body).save()));
router.put('/:id', async (req, res) => res.json(await Route.findByIdAndUpdate(req.params.id, req.body, { new: true })));
router.delete('/:id', async (req, res) => res.json(await Route.findByIdAndDelete(req.params.id)));

module.exports = router;