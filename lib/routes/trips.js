const { Router } = require('express');
const Trip = require('../models/Trip');
const ItineraryItem = require('../models/ItineraryItem');

module.exports = Router()
  .post('/', (req, res) => {
    Trip
      .create(req.body)
      .then(event => res.send(event));
  })
  .get('/', (req, res) => {
    Trip
      .find()
      // .select({ name: true })
      .then(trips => res.send(trips));
  })
  .get('/:id', (req, res) => {
    Trip
      .findById(req.params.id)
      .populate('itinerary')
      .then(trip => {
        // function compare_id(a, b) {
        //   if(a._id < b._id) return 1;
        //   if(a._id > b._id) return -1;
        //   return 0;
        // }
        // trip.itineraryItems.sort(compare_id);
        return res.send(trip);
      });
  })

  .patch('/:id', (req, res) => {
    Trip
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(trip => res.send(trip));
  })

  .delete('/:id', async(req, res) => {
    await ItineraryItem.deleteMany({ trip: req.params.id });
    Trip.findByIdAndDelete(req.params.id)
      .then(trip => res.send(trip));
  });
