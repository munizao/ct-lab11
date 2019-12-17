const superagent = require('superagent');

const getWeather = (woeid, date) => {
  const apiUrl = `https://www.metaweather.com/api/location/${woeid}/${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}/`; 
  console.log(apiUrl);
  return superagent
    .get(apiUrl)
    .then(res => {
      const weather = res.body[0];
      console.log(weather);
      return weather;
    });
};

module.exports = {
  getWeather
};
