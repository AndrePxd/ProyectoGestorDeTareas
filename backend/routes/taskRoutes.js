const express = require("express");
const auth = require("../middleware/auth");
const {
  createTask, getTasks, getTaskById, updateTask, deleteTask,
} = require("../controllers/taskController");

const router = express.Router();

router.post("/", auth, createTask);
router.get("/", auth, getTasks);
router.get("/:id", auth, getTaskById);
router.put("/:id", auth, updateTask);
router.delete("/:id", auth, deleteTask);


module.exports = router;
