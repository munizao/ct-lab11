const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  time: Date,
  activity: String,
  latitude: Number,
  longitude: Number,
  trip: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trip',
    required: true
  },
});

module.exports = mongoose.model('ItineraryItem', schema);
