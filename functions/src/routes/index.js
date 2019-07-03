// Dependencies
const router = require('express').Router();

// Route File/Folders
const posts = require('./posts');

// Routes
router.use('/posts', posts);

// Exports
exports.posts = posts;

// Main Export
module.exports = router;
