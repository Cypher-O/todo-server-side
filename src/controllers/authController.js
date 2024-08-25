const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/user');
const formatResponse = require('../utils/responseFormatter');

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, username: user.username, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '30d' }
  );
};

const register = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  // Check if username already exists
  const existingUsername = await User.findByUsername(username);
  if (existingUsername) {
    return res.status(400).json(formatResponse(1, 'error', 'Username already exists'));
  }

  // Check if email already exists
  const existingEmail = await User.findByEmail(email);
  if (existingEmail) {
    return res.status(400).json(formatResponse(1, 'error', 'Email already exists'));
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create(username, email, hashedPassword);
  
  // Generate token
  const token = generateToken(user);

  res.status(201).json(formatResponse(0, 'success', 'User registered successfully', {
    id: user.id,
    username: user.username,
    email: user.email,
    token
  }));
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  
  const user = await User.findByEmail(email);
  if (!user) {
    return res.status(400).json(formatResponse(1, 'error', 'No user found with this email'));
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    return res.status(400).json(formatResponse(1, 'error', 'Incorrect password'));
  }

  const token = generateToken(user);
  res.json(formatResponse(0, 'success', 'Login successful', { token }));
});

module.exports = { register, login };