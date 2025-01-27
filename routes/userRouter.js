const {newUser, getAllUsers, getOneUser, delUser} = require('../controller/usercontroller');

const router = require('express').Router();

router.post('/user', newUser);
router.get('/user', getAllUsers);
router.get('/user/:id', getOneUser);
router.delete('/user/:id', delUser);

module.exports = router;