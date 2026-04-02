const usersService = require('../services/users.service.js');

const getAll = (_, res) => {
  res.send(usersService.get());
};

const getOne = (req, res) => {
  const id = Number(req.params.id);
  const user = usersService.getById(id);

  if (!user) {
    return res.status(404).send('User not found');
  }

  res.send(user);
};

const createUser = (req, res) => {
  const { name } = req.body || {};

  if (typeof name !== 'string' || name.trim().length === 0) {
    return res.status(400).send('Name must be a non-empty string');
  }

  const user = usersService.create(name);

  res.status(201).send(user);
};

const deleteUser = (req, res) => {
  const id = Number(req.params.id);

  if (!usersService.getById(id)) {
    return res.status(404).send('User not found');
  }

  usersService.remove(id);
  res.sendStatus(204);
};

const updateUser = (req, res) => {
  const id = Number(req.params.id);
  const { name } = req.body || {};

  const currentUser = usersService.getById(id);

  if (!currentUser) {
    return res.status(404).send('User not found');
  }

  if (typeof name !== 'string' || name.trim().length === 0) {
    return res.status(400).send('Name must be a non-empty string');
  }

  const updatedUser = usersService.update(id, name);

  res.send(updatedUser);
};

module.exports = {
  getAll,
  getOne,
  createUser,
  deleteUser,
  updateUser,
};
