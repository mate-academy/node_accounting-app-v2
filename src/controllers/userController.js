/* eslint-disable no-useless-return */
const usersService = require('../services/userService');

const getUsers = (req, res) => {
  res.send(usersService.getAllusers());
};

const getUser = (req, res) => {
  const { id } = req.params;
  const user = usersService.getUserById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.status(200).json(user);
};

const createUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const user = usersService.createUser(name);

  res.status(201).json(user);
};

const updateUser = (req, res) => {
  const { id } = req.params;

  if (!usersService.getUserById(id)) {
    res.sendStatus(404);

    return;
  }

  const { name } = req.body;
  const updatedUser = usersService.updateUser({ id, name });

  if (!updatedUser) {
    res.sendStatus(404);

    return;
  }

  res.status(200).json(updatedUser);
};

const removeUser = (req, res) => {
  const { id } = req.params;

  if (!usersService.getUserById(id)) {
    res.sendStatus(404);

    return;
  }

  usersService.removeUser(id);
  res.sendStatus(204);
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  removeUser,
};
