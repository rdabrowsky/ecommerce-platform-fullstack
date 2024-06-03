import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/userModel.js';

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  // const users = await User.find({});

  res.send('auth user');
});

// @desc    Register user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  // const users = await User.find({});

  res.send('register user');
});

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Private
const logoutUser = asyncHandler(async (req, res) => {
  // const users = await User.find({});

  res.send('logout user');
});

// @desc    Get user profile
// @route   GET /api/users
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  // const users = await User.find({});

  res.send('get user profile  user');
});

// @desc    Update user profile
// @route   PUT /api/users
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  // const users = await User.find({});

  res.send('update user profile  user');
});

// @desc    Get users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  // const users = await User.find({});

  res.send('get users');
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  // const users = await User.find({});

  res.send('delete users');
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  // const users = await User.find({});

  res.send('get user by id');
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  // const users = await User.find({});

  res.send('Update user');
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
};
