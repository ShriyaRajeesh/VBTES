const express = require('express');
const router = express.Router();
const Operator = require('../models/Operator');

router.get('/', async (req, res) => res.json(await Operator.find()));
router.post('/', async (req, res) => res.json(await new Operator(req.body).save()));
module.exports = router;