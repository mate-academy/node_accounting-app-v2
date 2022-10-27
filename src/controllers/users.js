'use strict';

const userServise = require('../services/users');

const getAllUsers = (req, res) => {
  const users = userServise.getAllUsers();

  if (!users) {
    res.statusCode = 200;

    res.send([]);

    return;
  }

  res.statusCode = 200;

  res.send(users);
};

const addUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.statusCode = 400;

    res.send();

    return;
  }

  const user = {
    name,
    id: userServise.getAllUsers().length + 1,
  };

  userServise.add(user);

  res.statusCode = 201;

  res.send(user);
};

const getUserById = (req, res) => {
  const { id } = req.params;

  const foundUser = userServise.getUserById(id);

  if (!foundUser) {
    res.statusCode = 404;

    res.send();

    return;
  }

  const userId = Number(id);

  if (Number.isNaN(userId)) {
    res.statusCode = 400;

    res.send();

    return;
  }

  res.statusCode = 200;

  res.send(foundUser);
};

const removeUserById = (req, res) => {
  const { id } = req.params;

  const foundUser = userServise.getUserById(id);

  if (!foundUser) {
    res.statusCode = 404;

    res.send();

    return;
  }

  userServise.removeUserById(id);

  res.statusCode = 204;

  res.send();
};

const updateUserById = (req, res) => {
  const { id } = req.params;

  const foundUser = userServise.getUserById(id);

  if (!foundUser) {
    res.statusCode = 404;

    res.send();

    return;
  }

  const { name } = req.body;

  if (!name) {
    res.statusCode = 400;

    res.send();

    return;
  }

  foundUser.name = name;

  res.statusCode = 200;

  res.send(foundUser);
};

module.exports = {
  getAllUsers,
  addUser,
  getUserById,
  removeUserById,
  updateUserById,
};
