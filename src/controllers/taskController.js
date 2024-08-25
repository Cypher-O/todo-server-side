const asyncHandler = require('express-async-handler');
const Task = require('../models/task');
const formatResponse = require('../utils/responseFormatter');

const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.getAll(req.user.id);
  res.json(formatResponse(0, 'success', 'Tasks retrieved successfully', tasks));
});

const createTask = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  const task = await Task.create(req.user.id, title, description);
  res.status(201).json(formatResponse(0, 'success', 'Task created successfully', task));
});

const updateTask = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;
  const task = await Task.update(id, req.user.id, title, description, completed);
  if (!task) {
    return res.status(404).json(formatResponse(1, 'error', 'Task not found'));
  }
  res.json(formatResponse(0, 'success', 'Task updated successfully', task));
});

const deleteTask = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const task = await Task.delete(id, req.user.id);
  if (!task) {
    return res.status(404).json(formatResponse(1, 'error', 'Task not found'));
  }
  res.json(formatResponse(0, 'success', 'Task deleted successfully'));
});

module.exports = { getTasks, createTask, updateTask, deleteTask };