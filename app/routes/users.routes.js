const express = require('express');
const { verifyTokenAndAuthorization } = require('../middleware/verifyToken');

const route = express.Router();

// update
route.put('/:id', verifyTokenAndAuthorization);
module.exports = { route };
