const asyncHandler = require('express-async-handler');
const Task = require('../models/task');
const User = require('../models/user');
const formatResponse = require('../utils/responseFormatter');

const getTasks = asyncHandler(async (req, res) => {
  try {
    // Fetch the user's username
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json(formatResponse(1, 'error', 'User not found'));
    }

    // Fetch all tasks for the user
    const tasks = await Task.getAll(req.user.id);

    // Construct the response with the username and tasks
    const responseData = {
      username: user.username,
      tasks: tasks,
    };

    res.json(formatResponse(0, 'success', 'Tasks retrieved successfully', responseData));
  } catch (error) {
    console.error(error);
    res.status(500).json(formatResponse(1, 'error', 'An error occurred while retrieving tasks'));
  }
});

const createTask = asyncHandler(async (req, res) => {
  const { title, description } = req.body;

  try {
    const task = await Task.create(req.user.id, title, description);
    res.status(201).json(formatResponse(0, 'success', 'Task created successfully', task));
  } catch (error) {
    console.error(error);
    res.status(500).json(formatResponse(1, 'error', 'An error occurred while creating the task'));
  }
});

const updateTask = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;

  try {
    const task = await Task.update(id, req.user.id, title, description, completed);
    if (!task) {
      return res.status(404).json(formatResponse(1, 'error', 'Task not found'));
    }
    res.json(formatResponse(0, 'success', 'Task updated successfully', task));
  } catch (error) {
    console.error(error);
    res.status(500).json(formatResponse(1, 'error', 'An error occurred while updating the task'));
  }
});

const deleteTask = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.delete(id, req.user.id);
    if (!task) {
      return res.status(404).json(formatResponse(1, 'error', 'Task not found'));
    }
    res.json(formatResponse(0, 'success', 'Task deleted successfully'));
  } catch (error) {
    console.error(error);
    res.status(500).json(formatResponse(1, 'error', 'An error occurred while deleting the task'));
  }
});

module.exports = { getTasks, createTask, updateTask, deleteTask };