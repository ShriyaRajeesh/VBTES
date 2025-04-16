const mongoose = require('mongoose');
const OperatorSchema = new mongoose.Schema({
  name: String,
  contact: String
});
module.exports = mongoose.model('Operator', OperatorSchema);