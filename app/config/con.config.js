const dotenv = require('dotenv');
const { db } = require('../models');

dotenv.config();
// nama db shop as store

const conn = db.mongoose.connect(db.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then((success) => {
  if (success) {
    console.log('Connection to the database was successful.');
  }
}).catch((err) => {
  console.log(`Connection to the database failed. ${err}`);
});

module.exports = { conn };
