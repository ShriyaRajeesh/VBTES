const mongoose = require('mongoose');

const OperatorSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  contact_email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: function(v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: props => `${props.value} is not a valid email address!`
    }
  },
  contact_phone: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: function(v) {
        // Validates standard phone numbers with optional + prefix
        return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  }
}, {
  versionKey: false,
  timestamps: false
});

module.exports = mongoose.model('Operator', OperatorSchema);