const express = require('express');
const { verifyTokenAndAuthorization } = require('../middleware/verifyToken');
const {
  editUsers, deleteUser, getUserById, getAllUsers, getUserStats,
} = require('../controllers/users.controller');

const routeUser = express.Router();

// update
routeUser.put('/update/:id', verifyTokenAndAuthorization, editUsers);

// delete
// eslint-disable-next-line no-unused-vars
routeUser.delete('/:id', verifyTokenAndAuthorization, deleteUser);

// getuserById
routeUser.get('/find/:id', verifyTokenAndAuthorization, getUserById);

// get all users
routeUser.get('/', getAllUsers);

// get user stats
routeUser.get('/stats', getUserStats);
module.exports = { routeUser };
