const {
  getAllUsers,
  addUserByName,
  getUserById,
  removeUserById,
  updateUserById,
} = require('../services/users.service');

const getUsers = (req, res) => {
  res.status(200).send(getAllUsers());
};

const createUser = (req, res) => {
  const { name } = req.body;

  if (!name || typeof name !== 'string') {
    return res.sendStatus(400);
  }

  const user = addUserByName(name);

  res.status(201).send(user);
};

const getCurrentUser = (req, res) => {
  const { id } = req.params;

  const currentUser = getUserById(id);

  if (!currentUser) {
    return res.sendStatus(404);
  }

  return res.status(200).send(currentUser);
};

const removeCurrentUser = (req, res) => {
  const { id } = req.params;

  const userExists = getUserById(id);

  if (!userExists) {
    return res.sendStatus(404);
  }

  removeUserById(id);

  return res.sendStatus(204);
};

const updateCurrentUser = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const currentUser = getUserById(id);

  if (!currentUser) {
    return res.sendStatus(400);
  }

  if (typeof name !== 'string') {
    return res.sendStatus(422);
  }

  updateUserById(currentUser, name);

  res.send(currentUser);
};

module.exports = {
  getUsers,
  createUser,
  getCurrentUser,
  removeCurrentUser,
  updateCurrentUser,
};
