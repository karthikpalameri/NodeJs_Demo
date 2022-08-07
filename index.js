const geoCode = require('./utils/geoCode');
const getWeather = require('./utils/weather');
console.log(`Starting index.js...`);
const address = process.argv[2];

if (!address) {
  return console.error(`Please provide a valid address!!!`);
} else {
  geoCode(
    address,
    (geCodeError, { latitude, longitude, name1, state1, state2 } = {}) => {
      if (geCodeError) {
        return console.error(geCodeError);
      }

      getWeather(latitude, longitude, (weatherData, weatherDataError) => {
        if (weatherDataError) {
          return console.error(weatherDataError);
        }

        console.log(`Result:
      The weather is ${weatherData.current_weather.temperature} C and rain in mm for next 5 hours is ${weatherData.rainForNextCoupleOfHours} 
      for location ${name1} ${state1} ${state2}`);
      });
    }
  );
}

console.log(`Ending index.js...`);
