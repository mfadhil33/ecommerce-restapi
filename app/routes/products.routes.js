const express = require('express');
const {
  createProduct, updateProducts, deleteProducts, getAllProducts, getProductById,
} = require('../controllers/product.controller');

const routeProduct = express.Router();

// create product
routeProduct.post('/', createProduct);

// update product
// routeProduct.put('/', verifyTokenAndAdmin, updateProducts);

// delete product
// routeProduct.delete('/:id', verifyTokenAndAdmin, deleteProducts);

// getAllproduct
routeProduct.get('/', getAllProducts);

// getProductById
routeProduct.get('/', getProductById);

// update product
routeProduct.put('/', updateProducts);

// delete product
routeProduct.delete('/', deleteProducts);
module.exports = { routeProduct };
