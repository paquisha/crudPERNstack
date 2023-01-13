const pool = require('../db')

const getAllTasks = async(req, res) =>{
    //res.send('todas las tareas');
    try{
        const allTasks = await pool.query('SELECT * FROM  task')
        res.json(allTasks.rows)
    }catch(error){
        res.json({ error: error.message })
    }
}

const getTask = async(req, res) => {

    const { id } = req.params

    try{
        const getById = await pool.query('SELECT * FROM task WHERE id = $1', [ id ])

        if(getById.rows.length === 0) return res.status(404).json({
            message: "Task not found",
        });
        res.json(getById.rows[0])
    }catch(error){
        res.json({ error: error.message })
    }
}

const createTask = async(req, res) => {
    const { title, descripcion} = req.body

    try{
        const result = await pool.query('INSERT INTO task (title, descripcion) VALUES($1, $2) RETURNING *',[title, descripcion]);
        //console.log(result)

        //res.send('creando sola');
        res.json(result.rows[0])

    }catch(error){
        //console.log(error.message)
        res.json( {error: error.message });
    }
}

const putTask = (req, res) => {
    res.send('actualizando sola');
}

const deleteTask = (req, res) => {
    res.send('borrando sola');
}


module.exports = {
    getAllTasks,
    getTask,
    createTask,
    putTask,
    deleteTask
}