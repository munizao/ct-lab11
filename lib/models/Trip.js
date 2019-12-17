const mongoose = require('mongoose');
// const ItineraryItem = require('./ItineraryItem');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  start: Date,
  end: Date,
});

schema.virtual('itinerary', {
  ref: 'ItineraryItem',
  localField: '_id',
  foreignField: 'trip'
},
{ id: false, toJSON: { virtuals: true } }
);

module.exports = mongoose.model('Trip', schema);
