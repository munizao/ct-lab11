const superagent = require('superagent');

const getWoeid = (lat, long) => {
  return superagent
    .get(`https://www.metaweather.com/api/location/search/?lattlong=${lat},${long}`)
    .then(res => {
      const { woeid } = res.body[0];
      return woeid;
    });
};

module.exports = {
  getWoeid
};
