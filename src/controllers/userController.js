const userService = require('../services/userServices');

const getAll = (req, res) => {
  const users = userService.getAllUsers();

  res.status(200).json(users);
};

const getUser = (req, res) => {
  const { id } = req.params;
  const user = userService.getUserById(id);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.status(200).json(user);
};

const createUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  const newUser = userService.createUserServices(name);

  res.status(201).json(newUser);
};

const removeUser = (req, res) => {
  const { id } = req.params;
  const deletedUser = userService.deleteUser(Number(id));

  if (!deletedUser) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.status(204).send();
};

const updateUser = (req, res) => {
  const { id } = req.params;
  const newData = req.body;

  const updatedUser = userService.updateUser(id, newData);

  if (!updatedUser) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.status(200).json(updatedUser);
};

module.exports = {
  getAll,
  getUser,
  createUser,
  removeUser,
  updateUser,
};
