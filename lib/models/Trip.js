const mongoose = require('mongoose');
// const ItineraryItem = require('./ItineraryItem');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  start: Date,
  end: Date,
}, { id: false, toJSON: { virtuals: true } }
);

schema.virtual('itinerary', {
  ref: 'ItineraryItem',
  localField: '_id',
  foreignField: 'trip'
},

);

module.exports = mongoose.model('Trip', schema);
