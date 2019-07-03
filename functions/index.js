// Dependencies
const functions = require('firebase-functions');
const app = require('./src');

// Export
exports.app = functions.https.onRequest(app);
