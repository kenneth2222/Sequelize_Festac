const router = require('express').Router();
const {getAllTasks, createTask} = require('../controller/taskController')

router.post('/task/:id', createTask);
router.get('/task', getAllTasks);

module.exports = router;