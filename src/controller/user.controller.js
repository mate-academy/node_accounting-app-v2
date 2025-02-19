const userService = require('../service/user.service');

const getUsers = (_, res) => {
  const users = userService.getUsers();

  if (!users) {
    return res.status(404).json({ message: 'NOT FOUND' });
  }

  return res.status(200).json(users);
};

const createUser = (req, res) => {
  const newUser = userService.createUser(req.body);

  if (newUser === null) {
    return res.status(400).json({ message: '"Name" content is empty' });
  }

  return res.status(201).json(newUser);
};

const getUserById = (req, res) => {
  const { id } = req.params;

  const findUser = userService.getUserById(id);

  if (!findUser) {
    return res.status(404).json({ message: 'User not found' });
  }

  return res.status(200).json(findUser);
};

const deleteUserById = (req, res) => {
  const { id } = req.params;
  const findUser = userService.deleteUserById(id);

  if (!findUser) {
    return res.status(404).json({ message: 'User not found' });
  }

  return res.status(204).end();
};

const updateUser = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: '"Name" content is empty' });
  }

  const update = userService.updateUser(req.body, id);

  if (!update) {
    return res.status(404).json({ message: 'User not found' });
  }

  return res.status(200).json(update);
};

module.exports = {
  getUsers,
  createUser,
  getUserById,
  deleteUserById,
  updateUser,
};
