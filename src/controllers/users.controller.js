const usersService = require('../services/users.service');

const getAll = async (req, res) => {
  const users = await usersService.getAll();

  res.json(users);
};

const create = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.sendStatus(400);
  }

  const newUser = await usersService.create(name);

  res.status(201).json(newUser);
};

const getById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.sendStatus(400);
  }

  const user = await usersService.getById(id);

  if (!user) {
    return res.sendStatus(404);
  }

  res.json(user);
};

const deleteById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.sendStatus(400);
  }

  const user = await usersService.getById(id);

  if (!user) {
    return res.sendStatus(404);
  }

  await usersService.deleteById(id);

  res.status(204).json(user);
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!id || !name) {
    return res.sendStatus(400);
  }

  const user = await usersService.getById(id);

  if (!user) {
    return res.sendStatus(404);
  }

  const updatedUser = await usersService.updateById(id, { name });

  res.json(updatedUser);
};

module.exports = {
  getAll,
  create,
  getById,
  deleteById,
  updateById,
};
