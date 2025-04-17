const mongoose = require('mongoose');

const voiceQuerySchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  user_id: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  query_text: {
    type: String,
    required: true
  },
  response: {
    type: String,
    required: true
  },
  intent: {
    type: String,
    required: true,
    enum: ['schedule_lookup', 'booking_request', 'general_query']
  }
}, {
  timestamps: false, // Since we have our own timestamp field
  versionKey: false // Disable the version key (__v)
});

// Create text index for search functionality
voiceQuerySchema.index({ query_text: 'text' });

const VoiceQuery = mongoose.model('VoiceQuery', voiceQuerySchema);

module.exports = VoiceQuery;