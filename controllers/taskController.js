const tasks = require("../models/taskModel");

const getTasks = (req, res) => {
  try {
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Some Error Occurred" });
  }
};

const getTaskById = (req, res) => {
  try {
    const task = tasks.find((task) => task.id === parseInt(req.params.id));

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: "Some Error Occurred" });
  }
};

const addTask = (req, res) => {
  try {
    req.body.id = Array.isArray(tasks) && tasks.length ? Number(tasks.at(-1)?.id) + 1 : 1;

    res.status(201).json(req.body);
  } catch (error) {
    res.status(500).json({ error: "Some Error Occurred" });
  }
};

const updateTaskById = (req, res) => {
  try {
    if (!Object.keys(req.body).length) {
      return res.status(400).json({ error: "No data provided for update" });
    }

    const task = tasks.find((task) => task.id === parseInt(req.params.id));

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    const updatedTask = { ...task, ...req.body };

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: "Some Error Occurred" });
  }
};

const deleteTask = (req, res) => {
  try {
    const index = tasks.findIndex(
      (task) => task.id === parseInt(req.params.id)
    );
    if (index === -1) {
      return res.status(404).json({ error: "Task not found" });
    }
    if (index !== -1) {
      tasks.splice(index, 1);
    }
    console.log(tasks, "tasks after deletion");
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Some Error Occurred" });
  }
};

module.exports = {
  getTasks,
  getTaskById,
  addTask,
  updateTaskById,
  deleteTask,
};
