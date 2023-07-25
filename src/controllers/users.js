'use strict';

const usersService = require('../services/users');

const getUsers = async(req, res) => {
  const users = await usersService.getUsers();

  res.status(200).json(users);
};

const addUser = async(req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400).json({ message: 'Name is required' });

    return;
  }

  const user = await usersService.addUser(name);

  res.status(201).json(user);
};

const getUserById = async(req, res) => {
  const { userId } = req.params;

  if (!userId) {
    res.status(400).json({ message: 'Invalid ID' });

    return;
  }

  const user = await usersService.getUserById(userId);

  if (!user) {
    res.status(404).json({ message: 'User not found' });

    return;
  }

  res.status(200).json(user);
};

const deleteUser = async(req, res) => {
  const { userId } = req.params;

  if (!userId) {
    res.status(400).json({ message: 'Invalid ID' });

    return;
  }

  const isDeleted = await usersService.deleteUser(userId);

  if (!isDeleted) {
    res.status(404).json({ message: 'User not found' });

    return;
  }

  res.status(204).json({ message: 'User deleted' });
};

const updateUser = async(req, res) => {
  const { userId } = req.params;

  if (!userId) {
    res.status(400).json({ message: 'Invalid ID' });

    return;
  }

  const { name } = req.body;

  if (!name) {
    res.status(400).json({ message: 'Name is required' });

    return;
  }

  const user = await usersService.updateUser(userId, name);

  if (!user) {
    res.status(404).json({ message: 'User not found' });

    return;
  }

  res.status(200).json(user);
};

module.exports = {
  getUsers,
  addUser,
  getUserById,
  deleteUser,
  updateUser,
};
