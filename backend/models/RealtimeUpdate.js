const mongoose = require('mongoose');
const RealtimeUpdateSchema = new mongoose.Schema({
  routeId: mongoose.Schema.Types.ObjectId,
  status: String,
  timestamp: Date
});
module.exports = mongoose.model('RealtimeUpdate', RealtimeUpdateSchema);