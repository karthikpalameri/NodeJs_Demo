const axios = require('axios').default;

console.log(`Starting geoCode...`);

const geoDecodeTheLocation = (placeName, callback) => {
  const headersList = {
    Accept: '*/*'
  };
  const address = encodeURIComponent(placeName);
  const geocodeUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${address}`;
  const reqOptions = {
    url: geocodeUrl,
    method: 'GET',
    headers: headersList
  };
  axios
    .request(reqOptions)
    .then(response => {
      console.log(`Got geoCode response...`);
      const {
        results: [
          {
            name: name1,
            admin1: state2,
            admin2: state1,
            latitude,
            longitude
          } = {}
        ] = []
      } = response.data;
      console.log(`Destructing geoCode response ...`);

      console.log(`Checking if location is not found...`);
      if (!latitude || !longitude) {
        console.log(`No longitude or latitude found for ${address}...`);
        callback(
          `Failed to retrieve longitude and latitude for ${address}... Please try again with a different location...`,
          undefined
        );
      } else {
        callback(undefined, {
          name1,
          state1,
          state2,
          latitude,
          longitude
        });
      }
    })
    .catch(err => {
      console.error(`Encountered error in finding location...`);
      callback(`Failed to find the location Exception=${err}`, undefined);
    });
};

console.log(`Ending geoCode...`);
// geoDecodeTheLocation('xyz', (data, error) => {
//   console.log(`executing callback...`);
//   console.log({ data, error });
// });

// const addme = (a, b, callback) => {
//   setTimeout(() => {
//     callback(a + b);
//   }, 2000);
// };

// addme(1, 2, sum => {
//   console.log(sum);
// });

module.exports = geoDecodeTheLocation;
