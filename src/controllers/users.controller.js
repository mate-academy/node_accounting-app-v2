const userService = require('../services/users.service');

const getUsers = (req, res) => {
  const users = userService.getAllUsers();

  res.status(200).json(users);
};

const getUser = (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.sendStatus(400);
  }

  const user = userService.getUserById(id);

  if (!user) {
    return res.sendStatus(404);
  }

  return res.status(200).json(user);
};

const createUser = (req, res) => {
  const name = req.body.name;

  if (!name) {
    return res.sendStatus(400);
  }

  const newUser = { id: Date.now(), name };

  res.status(201).json(userService.createUser(newUser));
};

const deleteUser = (req, res) => {
  const id = Number(req.params.id);

  const user = userService.getUserById(id);

  if (!user) {
    return res.sendStatus(404);
  }

  userService.deleteUser(id);

  res.sendStatus(204);
};

const updateUser = (req, res) => {
  const id = Number(req.params.id);
  const { name } = req.body;

  if (!name) {
    return res.sendStatus(400);
  }

  const updatedUser = userService.updateUser({ id, name });

  if (!updatedUser) {
    return res.sendStatus(404);
  }

  return res.status(200).json(updatedUser);
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
};
