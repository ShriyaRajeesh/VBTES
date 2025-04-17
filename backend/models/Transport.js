const mongoose = require('mongoose');

const TransportSchema = new mongoose.Schema({
  _id: { type: String, required: true }, // "bus001", "bus002", etc.
  type: { type: String, required: true }, // e.g., "bus"
  route: { type: String, required: true },
  departure: { type: String, required: true },
  arrival: { type: String, required: true },
  departurePoint: { type: String, required: true },
  arrivalPoint: { type: String, required: true },
  operator_id: { type: String, required: true }, // e.g., "op001"
  capacity: { type: Number, required: true }, // e.g., 50
  registration_number: { type: String, required: true }, // e.g., "KA01AB1234"
  status: { type: String, default: 'On Time' }
});

module.exports = mongoose.model('Transport', TransportSchema, 'transport');
