const usersServices = require('../services/users/users.services');

const getUsers = (_, res) => {
  return res.status(200).json(usersServices.getUsers());
};

const getUserById = (req, res) => {
  const { id } = req.params;

  const userId = Number(id);

  if (isNaN(userId)) {
    return res.sendStatus(400);
  }

  const user = usersServices.getUserById(userId);

  return !user ? res.sendStatus(404) : res.status(200).json(user);
};

const saveUser = (req, res) => {
  const { name } = req.body;

  if (typeof name !== 'string') {
    return res.sendStatus(400);
  }

  const newUser = usersServices.saveUser(name);

  return res.status(201).json(newUser);
};

const removeUser = (req, res) => {
  const { id } = req.params;

  const userId = Number(id);
  const user = usersServices.getUserById(userId);

  if (!user) {
    return res.sendStatus(404);
  }

  usersServices.removeUser(userId);

  res.sendStatus(204);
};

const updateUser = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const userId = Number(id);

  if (isNaN(userId) || typeof name !== 'string') {
    return res.sendStatus(400);
  }

  try {
    const updatedUser = usersServices.updateUser(userId, name);

    return res.status(200).json(updatedUser);
  } catch {
    return res.sendStatus(404);
  }
};

module.exports = {
  getUsers,
  getUserById,
  saveUser,
  removeUser,
  updateUser,
};
