const path = require('path');
const express = require('express');
const hbs = require('hbs');
//https://dev.to/cassiolacerda/automatically-refresh-the-browser-on-node-express-server-changes-x1f680-1k0o
let livereload = require('livereload');
let connectLiveReload = require('connect-livereload');

console.log(`Starting express server...`);

//https://dev.to/cassiolacerda/automatically-refresh-the-browser-on-node-express-server-changes-x1f680-1k0o
const liveReloadServer = livereload.createServer();
liveReloadServer.server.once('connection', () => {
  setTimeout(() => {
    liveReloadServer.refresh('/');
  }, 100);
});

const app = express();

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Set up handlebars engine and views location
app.set('view engine', 'hbs'); //use handlebars to allow dynamic data
app.set('views', viewsPath); //set handlebars to use customised folder name
hbs.registerPartials(partialsPath); //set partials to use customised folder name

app.use(connectLiveReload()); //https://dev.to/cassiolacerda/automatically-refresh-the-browser-on-node-express-server-changes-x1f680-1k0o

//Setup static directories to serve static files
app.use(express.static(publicDirectoryPath)); //setting public as root path

app.get('', (req, res) => {
  res.render('index', { title: 'Weather App', name: 'kk' });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About Me.', name: 'kk' });
});

app.get('/help', (req, res) => {
  res.render('help', {
    helpText: 'This is help page.',
    title: 'Help',
    name: 'kk'
  });
});

app.get('/weather', (req, res) => {
  res.send({
    weather: '10',
    location: 'bangalo'
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'kk',
    errorMessage: 'Help article not found'
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'kk',
    errorMessage: 'Page Not Found'
  });
});

app.listen(3000, () => {
  console.log(`App listening on 3000`);
});

console.log(`Ending express server...`);
