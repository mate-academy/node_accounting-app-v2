'use strict';

const userService = require('../servises/user.services');

const getAllUsers = (req, res) => {
  const users = userService.getAllUsers();

  res.statusCode = 200;
  res.send(users);
};

const getOneUser = (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(400);
    res.send('Bad Request');
  }

  const user = userService.getUserById(id);

  if (!user) {
    res.sendStatus(404);
    res.send('User not found');

    return;
  }

  res.send(user);
};

const createUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);
    res.send('Bad Request');

    return;
  }

  const newUser = userService.createUser(name);

  res.statusCode = 201;
  res.send(newUser);
};

const updateUser = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (isNaN(+id) || !name) {
    res.sendStatus(400);
    res.send('Bad Request');

    return;
  }

  const findUser = userService.getUserById(id);

  if (!findUser) {
    res.status(404);
    res.send('User not found');

    return;
  }

  const user = userService.updateUser(id, name);

  res.statusCode = 200;
  res.send(user);
};

const removeUser = (req, res) => {
  const { id } = req.params;

  if (isNaN(+id)) {
    res.sendStatus(400);
    res.send('Bad Request');

    return;
  }

  const user = userService.getUserById(id);

  if (!user) {
    res.sendStatus(404);
    res.send('User not found');

    return;
  }

  userService.deleteUser(+id);
  res.sendStatus(204);
};

module.exports = {
  getAllUsers,
  getOneUser,
  createUser,
  updateUser,
  removeUser,
};
