const { getWoeid } = require('../services/woeid');
// const { getWeather } = require('../services/weather');

module.exports = (req, res, next) => {
  const itineraryItem = req.body;
  console.log(req.body);
  getWoeid(itineraryItem.lat, itineraryItem.long)
    .then(woeid => {
      itineraryItem.woeid = woeid;
      next();
    });
};
