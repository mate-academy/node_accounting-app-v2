const usersService = require('../services/users.services');

const getAllUsers = (req, res) => {
  const users = usersService.getAll();

  res.status(200).json(users);
};

const getUserById = (req, res) => {
  const { id } = req.params;
  const user = usersService.getByUserId(id);

  if (!user) {
    return res.status(404).send('User not found');
  }

  res.status(200).json(user);
};

const createUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).send('Name is required');
  }

  const newUser = usersService.createUser(name);

  res.status(201).json(newUser);
};

const updateUser = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const user = usersService.getByUserId(Number(id));

  if (!user) {
    res.sendStatus(400);
  }

  if (typeof name !== 'string') {
    return res.status(400).send('Invalid name');
  }

  const updatedUser = usersService.updateUser({ id, name });

  if (!updatedUser) {
    return res.status(404).send('User not found');
  }

  res.send(updatedUser);
};

const removeUser = (req, res) => {
  const { id } = req.params;

  if (!usersService.getByUserId(id)) {
    return res.status(404).send('User not found');
  }

  usersService.deleteUser(id);
  res.sendStatus(204);
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  removeUser,
};
