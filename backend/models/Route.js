const mongoose = require('mongoose');
const RouteSchema = new mongoose.Schema({
  origin: String,
  destination: String,
  stops: [String],
  operatorId: mongoose.Schema.Types.ObjectId
});
module.exports = mongoose.model('Route', RouteSchema);