const express = require("express");
const router = express.Router();

const {getAllTasks, getTaskById, getTaskByTitle, getFilterTasks, deleteTask, updateTask} = require("../controllers/task.controller");

router.get("/allTasks", getAllTasks);
router.get("/:taskId", getTaskById);
router.get("/:taskTitle", getTaskByTitle);
router.get("/items", getFilterTasks);
router.delete("/delete", deleteTask);
router.put("/update", updateTask);

module.exports = router;