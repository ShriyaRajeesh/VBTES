const mongoose = require('mongoose');

const RouteSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  start_stop: {
    type: String,
    required: true
  },
  end_stop: {
    type: String,
    required: true
  },
  stops: {
    type: [String],
    required: true,
    validate: {
      validator: function(v) {
        // Validate that first and last stops match start/end
        return v.length >= 2 && 
               v[0] === this.start_stop && 
               v[v.length - 1] === this.end_stop;
      },
      message: 'Stops array must start with start_stop and end with end_stop'
    }
  },
  distance_km: {
    type: Number,
    required: true,
    min: 0
  }
}, {
  versionKey: false
});

module.exports = mongoose.model('Route', RouteSchema);