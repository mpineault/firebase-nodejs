// Dependencies
const admin = require('firebase-admin');

// Initial firestore
const db = admin.firestore();

// Global variables
const collection = 'posts';

// Functions
/**
 * Creates posts
 * @param {Object} req Request from express
 * @param {Object} res Result from express
 * @returns {Object} returns Result from express
 */
const CREATE = (req, res) => {
  // Extra data from request
  const { comment } = req.body;

  // Validate data
  if (comment === null || comment.length <= 0) {
    return res.status(422).send({ success: false, message: "Missing 'comment' field." });
  }

  // Add to data
  const data = {
    comment
  };

  // Creates data
  return db
    .collection(`/${collection}`)
    .add(data)
    .then(doc => {
      const { id } = doc;
      console.log(doc);
      return res.status(201).send({ success: true, data: Object.assign(data, { id }) });
    })
    .catch(error =>
      res.status(400).send({
        success: false,
        error: error || 'Something went wrong.'
      })
    );
};

// Exports
module.exports = CREATE;
