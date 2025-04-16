const mongoose = require('mongoose');
const StopSchema = new mongoose.Schema({
  name: String,
  location: String
});
module.exports = mongoose.model('Stop', StopSchema);