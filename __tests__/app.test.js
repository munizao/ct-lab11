require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Trip = require('../lib/models/Trip');
const ItineraryItem = require('../lib/models/ItineraryItem');
let trip;
let itineraryItem;

describe('app routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(async() => {
    await mongoose.connection.dropDatabase();
    trip = await Trip.create({
      name: 'Ski Trip',
      start: Date(2020, 1, 10),
      end: Date(2020, 1, 14)
    });
    itineraryItem = await ItineraryItem.create({
      name: 'Lessons',
      time: Date(2020, 1, 11),
      trip: trip._id,
      lat: 45,
      long: 120
    });
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('creates a trip', () => {
    return request(app)
      .post('/api/v1/trips')
      .send({
        name: 'European Vacation',
        start: Date(2020, 6, 10),
        end: Date(2020, 6, 24)
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'European Vacation',
          start: expect.any(String),
          end: expect.any(String),
          __v: 0
        });
      });
  });

  it('gets all trips', async() => {
    const trips = await Trip.create([
      { name: 'European Vacation' },
      { name: 'Road Trip to Florida' },
      { name: 'Staycation' },
    ]);

    return request(app)
      .get('/api/v1/trips')
      .then(res => {
        trips.forEach(trip => {
          expect(res.body).toContainEqual({
            _id: trip._id.toString(),
            name: trip.name,
            __v: 0,
          });
        });
      });
  });

  it('gets a trip by id', () => {
    return request(app)
      .get(`/api/v1/trips/${trip._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Ski Trip',
          __v: 0,
          start: JSON.parse(JSON.stringify(trip.start)),
          end: JSON.parse(JSON.stringify(trip.end))
        });
      });
  });

  it('updates a trip by id', async() => {
    return request(app)
      .patch(`/api/v1/trips/${trip._id}`)
      .send({ name: 'Snowboarding Trip' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Snowboarding Trip',
          start: JSON.parse(JSON.stringify(trip.start)),
          end: JSON.parse(JSON.stringify(trip.end)),          
          __v: 0
        });
      });
  });

  it('deletes a trip by id', () => {
    return request(app)
      .delete(`/api/v1/trips/${trip._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Ski Trip',
          start: JSON.parse(JSON.stringify(trip.start)),
          end: JSON.parse(JSON.stringify(trip.end)),
          __v: 0
        });
      });
  });

  it('creates an itinerary item', () => {
    return request(app)
      .post('/api/v1/itinerary-items')
      .send({
        trip: trip._id,
        time: Date.now(),
        lat: 45,
        long: 120
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          trip: trip._id.toString(),
          time: expect.any(String),
          lat: 45,
          long: 120,
          __v: 0,
          woeid: 2151330
        });
      });
  });

  it('deletes an itinerary item', async() => {
    return request(app)
      .delete(`/api/v1/itinerary-items/${itineraryItem._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          trip: trip._id.toString(),
          time: expect.any(String),
          lat: 45,
          long: 120,
          __v: 0
        });
      });
  });
});
