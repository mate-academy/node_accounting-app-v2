'use strict';

const userService = require('../service/users');

const getAll = (req, res) => {
  const users = userService.getAll();

  res.send(users);
};

const getUser = (req, res) => {
  let { userId } = req.params;

  userId = +userId;

  if (isNaN(userId)) {
    res.sendStatus(404);

    return;
  }

  const foundUser = userService.getUser(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.status(201);
  res.send(foundUser);
};

const updateUser = (req, res) => {
  let { userId } = req.params;

  userId = +userId;

  if (isNaN(userId)) {
    res.sendStatus(404);

    return;
  };

  const foundUser = userService.getUser(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  const { name } = req.body;

  const newUser = userService.updateUser(userId, name);

  res.status(201);
  res.send(newUser);
};

const deleteUser = (req, res) => {
  let { userId } = req.params;

  userId = +userId;

  if (isNaN(userId)) {
    res.sendStatus(404);

    return;
  }

  const usersAfterDelete = userService.deleteUser(userId);

  if (usersAfterDelete.length === userService.getAll().length) {
    res.sendStatus(404);

    return;
  }

  res.sendStatus(201);
};

const addUser = (res, req) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(404);

    return;
  };

  const addedUser = userService.addUser(name);

  res.status(201);
  res.send(addedUser);
};

module.exports = {
  getAll,
  getUser,
  updateUser,
  deleteUser,
  addUser,
};
