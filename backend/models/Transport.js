const mongoose = require('mongoose');
const TransportSchema = new mongoose.Schema({
  type: String,
  capacity: Number,
  operatorId: mongoose.Schema.Types.ObjectId
});
module.exports = mongoose.model('Transport', TransportSchema);