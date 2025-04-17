const mongoose = require('mongoose');

const VoiceQuerySchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  queryText: String,
  response: String,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('VoiceQuery', VoiceQuerySchema);