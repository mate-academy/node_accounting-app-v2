const usersService = require('../services/users.service');

const getAll = (req, res) => {
  const users = usersService.getAll();

  res.status(200).send(users);
};

const createUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.sendStatus(400);
  }

  const user = usersService.createUser(name);

  res.statusCode = 201;
  res.send(user);
};

const getUserById = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.sendStatus(400);
  }

  const user = usersService.getById(id);

  if (!user) {
    return res.sendStatus(404);
  }

  res.status(200).send(user);
};

const removeUser = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.sendStatus(400);
  }

  const user = usersService.getById(id);

  if (!user) {
    return res.sendStatus(404);
  }

  usersService.removeUser(id);
  res.sendStatus(204);
};

const updateUser = (req, res) => {
  const { id } = req.params;
  const body = req.body;

  if (!id) {
    return res.sendStatus(400);
  }

  const user = usersService.getById(id);

  if (!user) {
    return res.sendStatus(404);
  }

  usersService.updateUser(id, body);

  res.status(200).send(user);
};

module.exports = {
  getAll,
  createUser,
  getUserById,
  removeUser,
  updateUser,
};
