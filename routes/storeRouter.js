const router = require('express').Router();
const {createStore, getAllStores, getOneStore, updateStore, deleteStore} = require('../controller/storeController');


router.post('/store', createStore);
router.get('/store', getAllStores);
router.get('/store/:id', getOneStore);
router.put('/store/:id', updateStore);
router.delete('/store/:id', deleteStore);


module.exports = router;