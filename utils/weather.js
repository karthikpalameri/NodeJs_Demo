const axios = require('axios').default;

console.log(`Starting weather.js...`);
const getWeather = (latitude, longitude, callback) => {
  const headersList = {
    Accept: '*/*'
  };

  const urlToGetCurrentWeather = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,rain&daily=weathercode,temperature_2m_max,temperature_2m_min,rain_sum,showers_sum,precipitation_hours&current_weather=true&timezone=Asia/Kolkata`;

  const reqOptions = {
    url: encodeURI(urlToGetCurrentWeather),
    method: 'GET',
    headers: headersList
  };

  axios
    .request(reqOptions)
    .then(response => {
      console.log(
        `Getting weather info from Api for ${latitude} and ${longitude}...`
      );
      //destructure the response object
      const {
        data: {
          current_weather,
          daily: daily_weather,
          hourly: hourly_weather
        } = {}
      } = response;
      //Create a responseData object to send back
      const responseData = {
        current_weather,
        daily_weather,
        hourly_weather
      };
      //get the rain in mm for next 5 hours
      const toFindThisTimeWeather =
        new Date().toISOString().split(':')[0] + ':00';
      const indexToFetchRain = hourly_weather.time.indexOf(
        toFindThisTimeWeather
      );
      const rainInMmInchFor5hoursFromCurrentTime = hourly_weather.rain.slice(
        parseInt(indexToFetchRain, 10),
        parseInt(indexToFetchRain, 10) + 5
      );
      //append to responseData object
      responseData.rainForNextCoupleOfHours =
        rainInMmInchFor5hoursFromCurrentTime;

      callback(responseData, undefined);
    })
    .catch(error => {
      console.error(
        `Failed to get weather info from Api for ${latitude} and ${longitude}...`
      );
      callback(undefined, error.stack || error);
    });
};

// getWeather(`28.6353`, `77.2250`, (result, error) => {
//   console.log(`Result:`);
//   console.log({ result, error });
// });

console.log(`Ending weather.js...`);

module.exports = getWeather;
