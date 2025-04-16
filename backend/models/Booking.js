const mongoose = require('mongoose');
const BookingSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  routeId: mongoose.Schema.Types.ObjectId,
  seats: Number,
  status: String
}, { timestamps: true });
module.exports = mongoose.model('Booking', BookingSchema);