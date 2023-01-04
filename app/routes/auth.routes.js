const express = require('express');
const { registController, loginController } = require('../controllers/auth.controller');

const routeAuth = express.Router();

// register
routeAuth.post('/register', registController);
routeAuth.post('/login', loginController);
module.exports = { routeAuth };
