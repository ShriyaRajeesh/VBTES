const mongoose = require('mongoose');
const ScheduleSchema = new mongoose.Schema({
  routeId: mongoose.Schema.Types.ObjectId,
  departureTime: String,
  arrivalTime: String
});
module.exports = mongoose.model('Schedule', ScheduleSchema);
