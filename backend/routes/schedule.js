const express = require('express');
const router = express.Router();
const Schedule = require('../models/Schedule');

router.get('/', async (req, res) => res.json(await Schedule.find()));
router.post('/', async (req, res) => res.json(await new Schedule(req.body).save()));
module.exports = router;
