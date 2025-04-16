const express = require('express');
const router = express.Router();
const Transport = require('../models/Transport');

router.get('/', async (req, res) => res.json(await Transport.find()));
router.post('/', async (req, res) => res.json(await new Transport(req.body).save()));
module.exports = router;