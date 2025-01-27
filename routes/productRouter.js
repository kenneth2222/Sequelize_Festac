const router = require('express').Router();
const {createProduct, getOneProduct, getAllProductBelongingToAStore} = require('../controllers/productController');


router.post('/product/:id', createProduct);
router.post('/product/:id', getOneProduct);
router.post('/product-by-store/:id', getAllProductBelongingToAStore);

module.exports = router;