const router = require('express').Router();
const {getAllUsers, createUser, deleteUser, getOneUser, updateUser} = require('../controller/userController')


router.get('/user', getAllUsers);
router.post('/user', createUser);
router.get('/user/:id', getOneUser)
router.put('/user/:id', updateUser)
router.delete('/user/:id', deleteUser)


module.exports = router;