const tasks = require("../models/taskModel");

const handleServerError = (res, error) => {
  res.status(500).json({ error: "Some Error Occurred" });
};

const getTasks = (req, res) => {
  try {
    if (!Array.isArray(tasks) || tasks.length === 0) {
      return res.status(404).json({ error: "No tasks found" });
    }

    let result = [...tasks];
    const { completed, sortByCreatedDate } = req.query;

    if (typeof completed !== "undefined") {
      if (completed === "true" || completed === "false") {
        const isCompleted = completed === "true";

        result = result.filter((task) => task.completed === isCompleted);
      } else {
        return res
          .status(400)
          .json({ error: "Invalid value for completed. Use true or false." });
      }
    }

    if (sortByCreatedDate === "asc" || sortByCreatedDate === "desc") {
      result.sort((a, b) => {
        const dateA = new Date(a.createdDate);
        const dateB = new Date(b.createdDate);
        return sortByCreatedDate === "asc" ? dateA - dateB : dateB - dateA;
      });
    }

    res.status(200).json(result);
  } catch (error) {
    handleServerError(res, error);
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
    handleServerError(res, error);
  }
};

const addTask = (req, res) => {
  try {
    req.body.id =
      Array.isArray(tasks) && tasks.length ? Number(tasks.at(-1)?.id) + 1 : 1;
    if (!req.body.priority) {
      req.body.priority = "low";
    }

    res.status(201).json(req.body);
  } catch (error) {
    handleServerError(res, error);
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
    handleServerError(res, error);
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
    handleServerError(res, error);
  }
};

module.exports = {
  getTasks,
  getTaskById,
  addTask,
  updateTaskById,
  deleteTask,
};
