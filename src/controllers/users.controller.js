'use strict';

const usersService = require('../services/users.service');

const getAllUsers = (req, res) => {
  const allUsers = usersService.getAllUsers();

  res.status(200).json(allUsers);
};

const createUser = (req, res) => {
  const name = req.body.name;

  if (!name) {
    res.status(400).json({ message: 'Name is required' });

    return;
  }

  const newUser = usersService.createUser(name);

  res.status(201).json(newUser);
};

const getById = (req, res) => {
  const id = Number(req.params.id);

  const foundUser = usersService.getById(id);

  if (!foundUser) {
    res.status(404).json({ message: 'User not found' });

    return;
  }

  res.status(200).json(foundUser);
};

const updateUser = (req, res) => {
  const id = Number(req.params.id);
  const name = req.body.name;

  const updatedUser = usersService.updateUser(id, name);

  if (!updatedUser) {
    res.status(404).json({ message: 'User not found' });

    return;
  }

  res.status(200).json(updatedUser);
};

const deleteUser = (req, res) => {
  const id = Number(req.params.id);

  const deletedUser = usersService.deleteById(id);

  if (!deletedUser) {
    res.status(404).json({ message: 'User not found' });

    return;
  }

  res.status(204).end();
};

module.exports = {
  getAllUsers,
  createUser,
  getById,
  updateUser,
  deleteUser,
};
