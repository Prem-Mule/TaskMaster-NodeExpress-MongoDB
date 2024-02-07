const Task = require("../models/tasks");
const asyncWrapper = require("../middleware/async");

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks: tasks, data: { amount: tasks.length } });
});

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});
const getTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOne({ _id: taskID });
  if (!task) {
    return res.status(404).json({ msg: `No task with ID: ${taskID}` });
  }
  res.status(200).json(task);
});

const updateTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;

  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!task) {
    const error = new Error("not found");
    error.status = 404;
    return next(error);
    return res.status(404).json({ msg: `No task with id : ${taskID}` });
  }

  res.status(200).json({ task });
});
const deleteTask = async (req, res) => {
  const { id: taskID } = req.params;
  const deletedTask = await Task.findByIdAndDelete(taskID);
  if (!deletedTask) {
    return res.status(404).json({ msg: `no task with ID: ${taskID}` });
  }
  res.status(200).json({ msg: "deleted task", task: deletedTask });
};
module.exports = { getAllTasks, createTask, getTask, updateTask, deleteTask };
