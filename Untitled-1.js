var utcDate = '2022-07-08T23:00'; // ISO-8601 formatted date returned from server
var localDate = new Date(utcDate);
var options = {
  hour: 'numeric',
  minute: 'numeric',
  hour12: true
};
//   var timeString = localDate.toLocaleString('en-US', options);
console.log(localDate);

// console.log(timeString);

console.log(localDate.toLocaleString());

let currentDateInIso8601 = new Date().toISOString();
let proccessDateToMatchApiFormat = currentDateInIso8601.slice(
  0,
  currentDateInIso8601.lastIndexOf(':')
);
console.log(proccessDateToMatchApiFormat);
