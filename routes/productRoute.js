const express = require('express');
const router = express.Router();
const { userAuth } = require('../middlewares/auth')
const { getAllProducts, getSingleProduct, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');

router.route('/')
    .get(getAllProducts)
    .post(userAuth, createProduct);
router.route('/:id')
    .get(getSingleProduct)
    .put(userAuth ,updateProduct)
    .delete(userAuth, deleteProduct);




module.exports = router;