const express = require("express");
const router = express.Router();
const taskController = require("../Controllers/Tasks");
router.route("/").get(taskController.getAllTasks);
router.route("/").post(taskController.createTask);
router.route("/:id").get(taskController.getTask);
router.route("/:id").patch(taskController.updateTask);
router.route("/:id").delete(taskController.deleteTask);
module.exports = router;
