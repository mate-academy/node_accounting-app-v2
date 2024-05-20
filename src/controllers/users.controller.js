const usersService = require('../services/users.services');
const { statusCodes } = require('../constants/statusode');

const getAllUsers = (req, res) => {
  const users = usersService.getAll();

  res.status(statusCodes.ok).json(users);
};

const getUserById = (req, res) => {
  const { id } = req.params;
  const user = usersService.getByUserId(id);

  if (!user) {
    return res.status(statusCodes.not_found).send('User not found');
  }

  res.status(statusCodes.ok).json(user);
};

const createUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(statusCodes.bad_request).send('Name is required');
  }

  const newUser = usersService.createUser(name);

  res.status(statusCodes.created).json(newUser);
};

const updateUser = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const user = usersService.getByUserId(Number(id));

  if (!user) {
    res.sendStatus(statusCodes.bad_request);
  }

  if (typeof name !== 'string') {
    return res.status(statusCodes.bad_request).send('Invalid name');
  }

  const updatedUser = usersService.updateUser({ id, name });

  if (!updatedUser) {
    return res.status(statusCodes.not_found).send('User not found');
  }

  res.send(updatedUser);
};

const removeUser = (req, res) => {
  const { id } = req.params;

  if (!usersService.getByUserId(id)) {
    return res.status(statusCodes.not_found).send('User not found');
  }

  usersService.deleteUser(id);
  res.sendStatus(statusCodes.no_content);
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  removeUser,
};
