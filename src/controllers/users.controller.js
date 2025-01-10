const usersService = require('../services/users.service');

const getAllUsers = (req, res) => {
  const users = usersService.getAllUsers();

  res.status(200).json(users);
};

const getUserById = (req, res) => {
  const { id } = req.params;
  const user = usersService.getUserById(+id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.status(200).json(user);
};

const createUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  const user = usersService.createUser(name);

  res.status(201).json(user);
};

const deleteUser = (req, res) => {
  const { id } = req.params;
  const user = usersService.deleteUser(+id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.status(204).json(user);
};

const updateUser = (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;
  const user = usersService.updateUser(+id, updatedUser);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.status(200).json(user);
};

const usersController = {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUser,
};

module.exports = usersController;
