const userService = require('../services/userService');

const getAllUsers = (req, res) => {
  const users = userService.getAll();

  res.status(200).send(users);
};

const getOneUser = (req, res) => {
  const { id } = req.params;

  const user = userService.getById(+id);

  if (!user) {
    return res.sendStatus(404);
  }

  res.status(200).send(user);
};

const createUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.sendStatus(400);
  }

  const user = userService.create(name);

  res.status(201).send(user);
};

const updateUser = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const user = userService.getById(+id);

  if (!user) {
    return res.sendStatus(404);
  }

  const updatedUser = userService.update(id, name);

  res.status(200).send(updatedUser);
};

const removeUser = (req, res) => {
  const { id } = req.params;

  const user = userService.getById(+id);

  if (!user) {
    return res.sendStatus(404);
  }

  userService.remove(+id);
  res.sendStatus(204);
};

module.exports = {
  getAllUsers,
  getOneUser,
  createUser,
  updateUser,
  removeUser,
};
