const { db } = require('../models');

// create
const createCart = async (req, res) => {
  const newCart = new db.Carts(req.body);

  try {
    const savedCart = await newCart.save();
    if (!savedCart) {
      res.status(401).json({
        message: 'fail',
      });
    }
    res.status(200).json({
      message: 'success to add a Cart',
      data: [
        {
          savedCart,
        },
      ],
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// update

const updateCarts = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedCart = await db.Carts.findByIdAndUpdate(
      id,
      {

        $set: req.body,
      },
      {
        new: true,
      },
    );
    if (!updatedCart) {
      res.status(401).json({
        message: 'fail update',
      });
    }
    res.status(200).json({
      data: [
        {
          updatedCart,
        },
      ],
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const deleteCarts = async (req, res) => {
  const { id } = req.params;
  try {
    await db.Carts.findByIdAndDelete(id)
      .then((result) => {
        if (!result) {
          res.status(400).json({
            message: 'cart fail deleted',
          });
        }
        res.status(200).json({
          message: 'cart has been deleted',
        });
      });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const getUserCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = await db.Carts.findOne({ userId });
    res.status(200).json({
      cart,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const getAllCarts = async (req, res) => {
  try {
    const carts = 
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  createCart, updateCarts, deleteCarts, getAllCarts, getUserCart,
};
