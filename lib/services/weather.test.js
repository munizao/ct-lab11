const { getWeather } = require('./weather.js');

describe('weather api', () => {
  it('gets weather from the metaweather api', async() => {
    expect(await getWeather(2151330, new Date(2019, 11, 10))).toEqual({"id":6103076710645760,"weather_state_name":"Light Cloud","weather_state_abbr":"lc","wind_direction_compass":"NW","created":"2019-12-10T15:21:12.942530Z","applicable_date":"2019-12-10","min_temp":-2.005,"max_temp":5.725,"the_temp":5.375,"wind_speed":6.533875245780641,"wind_direction":313.6690803814741,"air_pressure":1019.5,"humidity":41,"visibility":12.220507237731647,"predictability":70});
  });
});

