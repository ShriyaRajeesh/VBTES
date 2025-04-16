const express = require('express');
const router = express.Router();
const VoiceQuery = require('../models/VoiceQuery');

router.get('/', async (req, res) => res.json(await VoiceQuery.find()));
router.post('/', async (req, res) => res.json(await new VoiceQuery(req.body).save()));
module.exports = router;