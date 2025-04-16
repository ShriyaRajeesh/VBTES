const mongoose = require('mongoose');
const VoiceQuerySchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  queryText: String,
  timestamp: Date
});
module.exports = mongoose.model('VoiceQuery', VoiceQuerySchema);