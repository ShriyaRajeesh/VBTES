const express = require('express');
const router = express.Router();
const Stop = require('../models/Stop');

router.get('/', async (req, res) => res.json(await Stop.find()));
router.post('/', async (req, res) => res.json(await new Stop(req.body).save()));
module.exports = router;