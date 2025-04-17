const mongoose = require('mongoose');

const TransportSchema = new mongoose.Schema({
  _id: { type: String, required: true }, // "bus001", "bus002", etc.
  type: { type: String, required: true }, // e.g., "bus"
  operator_id: { type: String, required: true }, // e.g., "op001"
  capacity: { type: Number, required: true }, // e.g., 50
  registration_number: { type: String, required: true } // e.g., "KA01AB1234"
});

module.exports = mongoose.model('Transport', TransportSchema, 'transport');
