// Dependencies
const admin = require('firebase-admin');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Imports
const config = require('../config/config.json');
const serviceAccount = require('../config/serviceAccountKey.json');

// Config
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: config.databaseURL
});

// Initialize Express
const app = express();

// Global Environment Variables
app.set('VERSION', process.env.VERSION || '1.0.0');
app.set('HOST', process.env.HOST || '0.0.0.0');
app.set('PORT', process.env.PORT || 80);
app.set('ENV', process.env.NODE_ENV || 'development');

// Configuring Libraries
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Main Route
app.get('/', (req, res) => {
  res.send({
    VERSION: app.get('VERSION'),
    HOST: app.get('HOST'),
    PORT: app.get('PORT'),
    ENV: app.get('ENV')
  });
});

// Additional Routes
app.use('/api', require('./routes'));

// Port Listening
app.listen(app.get('PORT'), () => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(
      'API is running at %s:%d in %s mode.',
      app.get('HOST'),
      app.get('PORT'),
      app.get('ENV')
    );
  }
});

// Export
module.exports = app;
