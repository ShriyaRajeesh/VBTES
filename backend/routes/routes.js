const express = require('express');
const router = express.Router();
const Route = require('../models/Route');

router.get('/', async (req, res) => res.json(await Route.find()));
router.post('/', async (req, res) => res.json(await new Route(req.body).save()));
module.exports = router;