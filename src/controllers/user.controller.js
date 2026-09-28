'use strict';

const { usersService } = require('../services/user.service');

const getAll = async (req, res) => {
  const users = await usersService.getAll();

  res.status(200).json(users);
};

const getById = async (req, res) => {
  const id = Number(req.params.id);
  const user = await usersService.getById(id);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.status(200).json(user);
};

const createNewUser = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  const newUser = await usersService.create({ name });

  res.status(201).json(newUser);
};

const update = async (req, res) => {
  const id = Number(req.params.id);
  const { name } = req.body;

  const user = await usersService.getById(id);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const updatedUser = await usersService.update(id, { name });

  res.status(200).json(updatedUser);
};

const removeUser = async (req, res) => {
  const id = Number(req.params.id);

  const user = await usersService.getById(id);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  await usersService.deleteById(id);
  res.status(204).send();
};

const usersController = {
  getAll,
  getById,
  createNewUser,
  update,
  removeUser,
};

module.exports = {
  usersController,
};
