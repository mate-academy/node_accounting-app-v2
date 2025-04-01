const userService = require('../services/user.service.js');

const getAll = async (req, res) => {
  const users = await userService.getAllUsers();

  res.json(users);
};

const getById = async (req, res) => {
  const userId = Number(req.params.userId);

  if (!userId) {
    return res.sendStatus(400);
  }

  const user = await userService.getById(userId);

  if (!user) {
    return res.sendStatus(404);
  }
  res.status(200).json(user);
};

const createUser = async (req, res) => {
  const userName = req.body.name;

  if (!userName) {
    return res.sendStatus(400);
  }

  const user = await userService.createUser(userName);

  res.status(201).json(user);
};

const deleteUser = async (req, res) => {
  const user = await userService.deleteUserById(Number(req.params.userId));

  if (!user) {
    return res.sendStatus(404);
  }
  res.status(204).json(user);
};

const updateUser = async (req, res) => {
  const userData = { id: Number(req.params.userId), name: req.body.name };
  const user = await userService.updateUser(userData);

  if (!user) {
    return res.sendStatus(404);
  }

  res.status(200).json(user);
};

const usersController = {
  getAll,
  getById,
  createUser,
  deleteUser,
  updateUser,
};

module.exports = usersController;
