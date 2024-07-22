const usersService = require('../services/user.service');

const getAllUsers = (req, res) => {
  const users = usersService.getAllUsers();

  res.send(users);
};

const getUserById = (req, res) => {
  const { id } = req.params;

  const foundedUser = usersService.getUserById(id);

  if (!foundedUser) {
    res.sendStatus(404);

    return;
  }

  res.send(foundedUser);
};

const removeUser = (req, res) => {
  const { id } = req.params;

  const foundedUser = usersService.getUserById(id);

  if (!foundedUser) {
    res.sendStatus(404);

    return;
  }

  usersService.removeUser(id);

  res.sendStatus(204);
};

const updateUser = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const foundedUser = usersService.getUserById(id);

  if (!foundedUser) {
    res.sendStatus(404);

    return;
  }

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const updatedUser = usersService.updateUser(id, name);

  res.send(updatedUser);
};
const createUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = usersService.createUser(name);

  return res.status(201).json(newUser);
};

module.exports = {
  getAllUsers,
  getUserById,
  removeUser,
  updateUser,
  createUser,
};
