const express = require('express');
const router = express.Router();
const { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct, getProductByName, getProductByPrice } = require('../controllers/productController');

router.post('/create-product', createProduct);
  
// get all products
router.get('/all', getAllProducts);

//   edit a product
router.put('/products/:id', updateProduct);
  
//   delete a product
router.delete('/:id', deleteProduct);
  
//   get a product by id
router.get('/:id', getProductById);
  
//   get a product by name
router.get('/name/:name', getProductByName);
  
//   get a product by price
router.get('/price/:productName/:price', getProductByPrice);

module.exports = router;
