const pool = require("../db");

const createTask = async (req, res, next) => {
  try {
    const { title, descripcion, fecha } = req.body;

    const newTask = await pool.query(
      "INSERT INTO task (title, descripcion, fecha) VALUES($1, $2, $3) RETURNING *",
      [title, descripcion, fecha]
    );

    res.json(newTask.rows[0]);
  } catch (error) {
    next(error);
  }
};

const getAllTasks = async (req, res, next) => {
  try {
    const allTasks = await pool.query("SELECT * FROM task");
    res.json(allTasks.rows);
  } catch (error) {
    next(error);
  }
};

const getTask = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM task WHERE id = $1", [id]);

    if (result.rows.length === 0)
      return res.status(404).json({ message: "Task not found" });//si profe siempre respondo en ingles, ya nada es la costumbre

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, descripcion, fecha } = req.body;

    const result = await pool.query(
      "UPDATE task SET title = $1, descripcion = $2, fecha = $3  WHERE id = $4 RETURNING *",
      [title, descripcion, fecha, id]
    );

    if (result.rows.length === 0)
      return res.status(404).json({ message: "Task not found" });

    return res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("DELETE FROM task WHERE id = $1", [id]);

    if (result.rowCount === 0)
      return res.status(404).json({ message: "Task not found" });
    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getTask,
  updateTask,
  deleteTask,
};