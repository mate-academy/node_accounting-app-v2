const userService = require('../services/serviceUsers');

const getAll = (_req, res) => {
  const users = userService.getAllUsers();

  res.json(users);
};

const getById = (req, res) => {
  const { id } = req.params;
  const user = userService.getUserById(id);

  if (!user) {
    return res.status(404).send('User not found');
  }

  res.json(user);
};

const create = (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).send('Name is required');
  }

  const newUser = userService.createUser(name);

  res.status(201).json(newUser);
};

const update = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    return res.status(400).send('Name is required');
  }

  const user = userService.updateUser(id, name);

  if (!user) {
    return res.status(404).send('User not found');
  }

  res.json(user);
};

const remove = (req, res) => {
  const { id } = req.params;
  const isDeleted = userService.deleteUser(id);

  if (!isDeleted) {
    return res.status(404).send('User not found');
  }

  res.sendStatus(204);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
