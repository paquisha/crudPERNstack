const { Router } = require('express');
const pool = require('../db');
const { getAllTasks, getTask, createTask, deleteTask, putTask } = require('../controllers/tasks.controller')

const router = Router();

/*router.get('/tasks', async (req, res) =>{
    const result = await pool.query('SELECT NOW()');
    console.log(result)
    res.json(result.rows[0].now);
})*/

router.get('/tasks', getAllTasks)

router.get('/tasks/:id',getTask)

router.post('/tasks', createTask)

router.delete('/tasks/:id', deleteTask)

router.put('/tasks', putTask)


module.exports = router;