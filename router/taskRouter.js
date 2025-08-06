const express = require("express");
const {
  getTasks,
  getTaskById,
  addTask,
  updateTaskById,
  deleteTask,
} = require("../controllers/taskController");
const validateBody = require("../middlewares/validateBody");
const router = express.Router();

router.get("/", getTasks);

router.get("/:id", getTaskById);

router.post("/", validateBody, addTask);

router.put("/:id", validateBody, updateTaskById);

router.delete("/:id", deleteTask);

module.exports = router;
