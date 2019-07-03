// Dependencies
const router = require('express').Router();

// Functions
const CREATE = require('./create');

// Routes
router.post('/', CREATE);

// Exports
module.exports = router;
