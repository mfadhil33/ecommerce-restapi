const { db } = require('../models');

const getUsers = async (req, res) => {
  res.status(200).json({
    message: 'Hello user',
  });
};

const addUsers = async (req, res) => {
  res.status(201).json({
    message: 'Data has been add',
  });
};

const editUsers = async (req, res) => {
  const { body } = req;
  const { id } = req.params;
  if (password) {
    const password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.JWT_SECURE,
    ).toString();
  }

  try {
    const updatedUser = await db.Users.findByIdAndUpdate(
      id,
      {

        $set: body,
      },
      {
        new: true,
      },
    ).then((data) => {
      if (data) {
        res.status(200).json({
          updatedUser,
        });
      } else {
        res.status(400).json({
          message: 'fail update your data',
        });
      }
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = { getUsers, addUsers, editUsers };
