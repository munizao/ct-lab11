const { Router } = require('express');
const ItineraryItem = require('../models/ItineraryItem');

module.exports = Router()
  .post('/', (req, res) => {
    ItineraryItem
      .create(req.body)
      .then(itineraryItem => res.send(itineraryItem));
  })

  .get('/', (req, res) => {
    const ingredient = req.query.ingredient;
    if(ingredient) {
      ItineraryItem
        .find({ ingredients: { name: ingredient } })
        .then(itineraryItems => res.send(itineraryItems));
    }
    else {
      ItineraryItem
        .find()
        .select({ notes: false })
        .then(itineraryItems => res.send(itineraryItems));
    }
  })

  .get('/:id', (req, res) => {
    ItineraryItem
      .findById(req.params.id)
      .populate('recipe')
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
