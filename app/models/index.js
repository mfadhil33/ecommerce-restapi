const mongoose = require('mongoose');
const dotenv = require('dotenv');
const dbConfig = require('../config/db.config');

dotenv.config();
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.Users = require('./users.model')(mongoose);
db.Products = require('./products.model')(mongoose);
db.Carts = require('./cart.model')(mongoose);

module.exports = { db };
