const dotenv = require('dotenv');

dotenv.config();
module.exports = {

  url: process.env.mongoconnURL,
};