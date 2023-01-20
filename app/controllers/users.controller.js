const { db } = require('../models');

const addUsers = async (req, res) => {
  res.status(201).json({
    message: 'Data has been add',
  });
};

const editUsers = async (req, res) => {
  const { id } = req.params;
  if (req.body.password) {
    // eslint-disable-next-line no-unused-vars, no-shadow
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.JWT_SECURE,
    ).toString();
  }

  try {
    const updatedUser = await db.Users.findByIdAndUpdate(
      id,
      {

        $set: req.body,
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

const deleteUser = async (req, res) => {
  const { id } = req;
  try {
    await db.Users.findByIdAndDelete(id)
      .then((result) => {
        if (!result) {
          res.status(400).json({
            message: 'User fail deleted',
          });
        }
        res.status(200).json({
          message: 'user has been deleted',
        });
      });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await db.Users.findById(id);
    const { password, ...others } = user._doc;
    if (!user) {
      res.status(404).json({
        message: 'Data notfound',
      });
    }
    res.status(200).json({
      data: [
        {
          others,
        },
      ],
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
// connect fail
const getAllUsers = async (req, res) => {
  try {
    const query = req.query.new;
    const users = query ? await db.Users.find().sort({ _id: -1 }).limit(1) : await db.Users.find();
    if (!users) {
      res.status(404).json({
        message: 'Data users not found',
      });
    }
    res.status(200).json({
      data: [
        {
          users,
        },
      ],
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// connect failed
// get user stats
const getUserStats = async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await db.Users.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: '$createdAt' },
        },
      },
      {
        $group: {
          _id: '$month',
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json({
      data,
    });
  } catch (err) {
    res.status(500).json({
      errorMessage: err.message,
    });
  }
};
module.exports = {
  addUsers,
  editUsers,
  deleteUser,
  getUserById,
  getAllUsers,
  getUserStats,
};
