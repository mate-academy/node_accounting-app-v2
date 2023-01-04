'use strict';

const {
  userServices,
} = require('../services/users.js');

const createUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const createdUser = userServices.addUser(name);

  res.statusCode = 201;
  res.send(createdUser);
};

const getUser = (req, res) => {
  const { id } = req.params;

  const user = userServices.getUserById(Number(id));

  if (!user) {
    res.statusCode = 404;
    res.send();

    return;
  }

  res.statusCode = 200;
  res.send(user);
};

const getUsers = (req, res) => {
  const users = userServices.getAllUsers();

  res.statusCode = 200;
  res.send(users);
};

const deleteUser = (req, res) => {
  const { id } = req.params;

  const user = userServices.getUserById(id);

  if (!user) {
    res.statusCode = 404;
    res.send();

    return;
  };

  userServices.removeUserById(id);

  res.sendStatus(204);
};

const updateUser = (req, res) => {
  const { id } = req.params;

  const updatedUser = userServices.updateUserById(id, req.body);

  if (!updatedUser) {
    res.statusCode = 404;
    res.send();

    return;
  };

  res.statusCode = 200;
  res.send(updatedUser);
};

module.exports = {
  createUser,
  getUser,
  getUsers,
  deleteUser,
  updateUser,
};
