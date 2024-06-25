const {
  createUserService,
  getUsersService,
  getUserByIdService,
  updateUserService,
  deleteUserService,
} = require('../services/userService');

const createUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Missing required parameters' });
  }

  const newUser = createUserService(name);

  res.status(201).json(newUser);
};

const getUsers = (req, res) => {
  const users = getUsersService();

  res.status(200).json(users);
};

const getUserById = (req, res) => {
  const user = getUserByIdService(req.params.id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.status(200).json(user);
};

const updateUser = (req, res) => {
  const { name } = req.body;
  const user = updateUserService(req.params.id, name);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.status(200).json(user);
};

const deleteUser = (req, res) => {
  const success = deleteUserService(req.params.id);

  if (!success) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.status(204).send();
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
