const mongoose = require('mongoose');
const scheduleSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  transport_id: {
    type: String,
    ref: 'Transport',
    required: true
  },
  route_id: {
    type: String,
    ref: 'Route',
    required: true
  },
  departure_time: {
    type: Date,
    required: true
  },
  arrival_time: {
    type: Date,
    required: true
  },
  days: [{
    type: String,
    enum: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    required: true
  }],
  active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: false,
  versionKey: false
});

scheduleSchema.index({ transport_id: 1 });
scheduleSchema.index({ route_id: 1 });
scheduleSchema.index({ departure_time: 1 });
scheduleSchema.index({ days: 1 });

const Schedule = mongoose.model('Schedule', scheduleSchema);