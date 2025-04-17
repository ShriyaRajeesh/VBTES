const mongoose = require('mongoose');
const busStopSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true,
    index: true
  },
  location: {
    type: {
      type: String,
      default: 'Point',
      enum: ['Point']
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true
    }
  }
}, {
  timestamps: false,
  versionKey: false
});

// Create a geospatial index for location searches
busStopSchema.index({ location: '2dsphere' });

const Stop = mongoose.model('Stop', busStopSchema);