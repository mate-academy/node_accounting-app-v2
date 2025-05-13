/* eslint-disable no-console */
const { usersService } = require('../services/user.service');

const getAll = async (req, res) => {
  res.send(usersService.getAll());
};

const createNewUser = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Missing name' });
  }

  const newUser = usersService.create(name);

  res.status(201).json(newUser);
};

const getById = async (req, res) => {
  const { id } = req.params;

  const user = await usersService.getById(id);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.send(user);
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const user = await usersService.getById(+id);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.send(usersService.update({ id, name }));
};

const removeUser = async (req, res) => {
  const { id } = req.params;

  const user = await usersService.getById(id);

  if (!user) {
    return res.status(404).json({ error: 'User does not exist' });
  }

  await usersService.deleteById(id);
  res.sendStatus(204);
};

const usersController = {
  getAll,
  getById,
  createNewUser,
  updateUser,
  removeUser,
};

module.exports = {
  getAll,
  getById,
  createNewUser,
  updateUser,
  removeUser,
  usersController,
};
