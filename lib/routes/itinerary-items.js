const { Router } = require('express');
const ItineraryItem = require('../models/ItineraryItem');
const fetchWoeid = require('../middleware/fetch-woeid');

module.exports = Router()
  .post('/', fetchWoeid, (req, res) => {
    ItineraryItem
      .create(req.body)
      .then(itineraryItem => res.send(itineraryItem));
  })

  .get('/', (req, res) => {
    ItineraryItem
      .find()
      .then(itineraryItems => res.send(itineraryItems));
  })

  .get('/:id', (req, res) => {
    ItineraryItem
      .findById(req.params.id)
      .populate('trip')
      .then(itineraryItem => res.send(itineraryItem));
  })

  .patch('/:id', (req, res) => {
    ItineraryItem
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(itineraryItem => res.send(itineraryItem));
  })

  .delete('/:id', (req, res) => {
    ItineraryItem
      .findByIdAndDelete(req.params.id)
      .then(itineraryItem => res.send(itineraryItem));
  });
