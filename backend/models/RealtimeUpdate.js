const mongoose = require('mongoose');

const TransportUpdateSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  transport_id: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    required: true,
    default: Date.now
  },
  location: {
    lat: {
      type: Number,
      required: true
    },
    lng: {
      type: Number,
      required: true
    }
  },
  status: {
    type: String,
    required: true,
    enum: ['on_time', 'delayed', 'early', 'cancelled', 'diverted'],
    default: 'on_time'
  }
}, {
  versionKey: false,
  timestamps: false
});

// Add geospatial index for location queries
TransportUpdateSchema.index({
  'location.lat': 1,
  'location.lng': 1
});

module.exports = mongoose.model('RealtimeUpdate', TransportUpdateSchema);