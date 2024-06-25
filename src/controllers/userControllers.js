const userService = require('../services/userService');

const getAllUsers = (req, res) => {
  res.send(userService.getAll());
};

const getUserById = (req, res) => {
  const { id } = req.params;

  const user = userService.getById(id);

  if (!user) {
    return res.sendStatus(404);
  }

  res.send(user);
};

const createUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.sendStatus(400);
  }

  res.status(201);
  res.send(userService.create(name));
};

const removeUserById = (req, res) => {
  const { id } = req.params;

  if (!userService.getById(id)) {
    return res.sendStatus(404);
  }

  userService.removeById(id);
  res.sendStatus(204);
};

const updateUserById = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!userService.getById(id)) {
    return res.sendStatus(404);
  }

  if (!name) {
    return res.sendStatus(400);
  }

  res.send(userService.updateById(id, name));
};

module.exports = {
  getAllUsers,
  createUser,
  getUserById,
  updateUserById,
  removeUserById,
};
