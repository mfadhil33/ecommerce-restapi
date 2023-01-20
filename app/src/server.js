const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const { routeAuth } = require('../routes/auth.routes');
const { routeUser } = require('../routes/users.routes');
const { routeCarts } = require('../routes/carts.routes');
const { routeOrder } = require('../routes/orders.routes');
const { routeProduct } = require('../routes/products.routes');

// eslint-disable-next-line no-unused-vars
const { conn } = require('../config/con.config');

dotenv.config();
const PORT = process.env.port || 3000;
const HOST = process.env.host || 'localhost';
const app = express();

const allowedList = [
  `http://${HOST}:${PORT}`,
];
const corsOption = {
  origin: (origin, cb) => {
    if (allowedList.indexOf(origin) !== -1 || !origin) {
      cb(null, true);
    } else {
      cb(new Error('Not allowed cors'));
    }
  },
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOption));

// route auth
app.use('/api/auth', routeAuth);

// route users
app.use('/api/users', routeUser);

// route products
app.use('/api/products', routeProduct);

app.listen(PORT, HOST, () => {
  console.log(`Server is running at http://${HOST}:${PORT}`);
});
