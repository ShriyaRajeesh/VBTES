const mongoose = require('mongoose');

const transportSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true // e.g., "bus002"
  },
  type: {
    type: String,
    required: true, // e.g., "bus", "train", etc.
    enum: ['bus', 'train', 'metro'] // Add more types if needed
  },
  operator_id: {
    type: String,
    required: true // e.g., "op002"
  },
  capacity: {
    type: Number,
    required: true // e.g., 46
  },
  registration_number: {
    type: String,
    required: true // e.g., "KA02CD5678"
  }
}, {
  timestamps: true // Adds createdAt and updatedAt automatically
});

module.exports = mongoose.model('Transport', transportSchema);
