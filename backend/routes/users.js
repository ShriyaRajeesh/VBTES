const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', async (req, res) => res.json(await User.find()));
router.post('/', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
router.put('/:id', async (req, res) => res.json(await User.findByIdAndUpdate(req.params.id, req.body, { new: true })));
router.delete('/:id', async (req, res) => res.json(await User.findByIdAndDelete(req.params.id)));

module.exports = router;