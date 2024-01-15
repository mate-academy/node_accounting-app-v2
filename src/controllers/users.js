'use strict';

const { UserService } = require('../services/users.service');

const userService = new UserService();

const getAllUsers = (req, res) => {
  const users = userService.findAll();

  res.send(users);
};

const getOneUser = (req, res) => {
  const { userId } = req.params;
  const user = userService.findById(userId);
  const errorsStore = [
    'userId is required in the request parameters',
    'User not found',
  ];

  if (!userId) {
    res.statusCode = 400;
    res.send(errorsStore[0]);

    return;
  }

  if (!user) {
    res.statusCode = 404;
    res.send(errorsStore[1]);

    return;
  }

  res.send(user);
  res.sendStatus(200);
};

const addUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = userService.create(name);

  res.statusCode = 201;
  res.send(newUser);
};

const removeUser = (req, res) => {
  const { userId } = req.params;
  const foundUser = userService.findById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  userService.remove(userId);
  res.sendStatus(204);
};

const updateUser = (req, res) => {
  const { userId } = req.params;
  const foundUser = userService.findById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  const { name } = req.body;

  if (typeof name !== 'string') {
    res.sendStatus(422);

    return;
  }

  userService.update({
    id: userId,
    name,
  });

  res.send(foundUser);
};

module.exports = {
  getAllUsers,
  getOneUser,
  addUser,
  removeUser,
  updateUser,
};
