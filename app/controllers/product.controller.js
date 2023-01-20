const { db } = require('../models');

const createProduct = async (req, res) => {
  const newProduct = new db.Products(req.body);

  try {
    const savedProduct = await newProduct.save();
    if (!savedProduct) {
      res.status(401).json({
        message: 'fail',
      });
    }
    res.status(200).json({
      message: 'success to add a products',
      data: [
        {
          savedProduct,
        },
      ],
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const updateProducts = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedProduct = await db.Products.findByIdAndUpdate(
      id,
      {

        $set: req.body,
      },
      {
        new: true,
      },
    );
    if (!updatedProduct) {
      res.status(401).json({
        message: 'fail update',
      });
    }
    res.status(200).json({
      data: [
        {
          updatedProduct,
        },
      ],
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const deleteProducts = async (req, res) => {
  const { id } = req.params;
  try {
    await db.Products.findByIdAndDelete(id)
      .then((result) => {
        if (!result) {
          res.status(400).json({
            message: 'User fail deleted',
          });
        }
        res.status(200).json({
          message: 'Product has been deleted',
        });
      });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await db.Users.findById(id);
    res.status(200).json({
      product,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const getAllProducts = async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;

  try {
    let products;

    if (qNew) {
      products = await db.Products.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCategory) {
      products = await db.Products.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      products = await db.Products.find();
    }
    res.status(200).json({
      data: [
        {
          products,
        },
      ],
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  createProduct, updateProducts, deleteProducts, getAllProducts, getProductById,
};
