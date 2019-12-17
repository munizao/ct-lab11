require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Trip = require('../lib/models/Trip');

describe('app routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
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
            __v: 0
          });
        });
      });
  });
});
