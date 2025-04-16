const express = require('express');
const router = express.Router();
const RealtimeUpdate = require('../models/RealtimeUpdate');

router.get('/', async (req, res) => res.json(await RealtimeUpdate.find()));
router.post('/', async (req, res) => res.json(await new RealtimeUpdate(req.body).save()));
module.exports = router;