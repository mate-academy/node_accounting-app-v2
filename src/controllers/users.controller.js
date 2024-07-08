const userService = require('../services/users.service');

const createUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Name is required' });
  }

  const newUser = userService.createUser(name);

  res.status(201).json(newUser);
};

const getUsers = (req, res) => {
  res.status(200).json(userService.getUsers());
};

const getUserById = (req, res) => {
  const user = userService.findUserById(Number(req.params.id));

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.status(200).json(user);
};

const updateUser = (req, res) => {
  const user = userService.findUserById(Number(req.params.id));

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const { name } = req.body;

  if (name) {
    userService.updateUser(user.id, name);
  }
  res.status(200).json(user);
};

const deleteUser = (req, res) => {
  const userDeleted = userService.deleteUser(Number(req.params.id));

  if (!userDeleted) {
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
