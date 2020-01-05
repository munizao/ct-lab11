const mongoose = require('mongoose');
const getWeather = require('../services/weather');

const schema = new mongoose.Schema({
  time: Date,
  activity: String,
  lat: {
    type: Number,
    required: true
  },
  long: {
    type: Number,
    required: true
  },
  trip: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trip',
    required: true
  },
  woeid: Number
});

schema.methods.getWeather = function() {
  return getWeather(this.woeid, this.time);
};

module.exports = mongoose.model('ItineraryItem', schema);
