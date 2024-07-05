const {
  getAllUsersService,
  createNewUserService,
  getUserByIdService,
  deleteUserByIdService,
  updateUserByIdService,
} = require('../services/users.service');

const getAllUsers = (req, res) => {
  const users = getAllUsersService();

  res.send(users);
};

const createUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.sendStatus(400);
  }

  const newUser = createNewUserService(name);

  res.status(201).send(newUser);
};

const getUser = (req, res) => {
  const { id } = req.params;

  const user = getUserByIdService(id);

  if (!user) {
    return res.sendStatus(404);
  }

  res.send(user);
};

const deleteUser = (req, res) => {
  const { id } = req.params;

  const user = getUserByIdService(id);

  if (!user) {
    return res.sendStatus(404);
  }

  deleteUserByIdService(id);
  res.sendStatus(204);
};

const updateUser = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const user = getUserByIdService(id);

  if (!user) {
    return res.sendStatus(404);
  }

  const updatedUser = updateUserByIdService(id, name);

  res.send(updatedUser);
};

module.exports = {
  getAllUsers,
  createUser,
  getUser,
  deleteUser,
  updateUser,
};
