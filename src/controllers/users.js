'use strict';

const users = require('../services/users');

const getAll = (req, res) => {
  res.send(users.getUsers());
};

const addUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  res.statusCode = 201;
  res.send(users.setUsers(name));
};

const getOneUser = (req, res) => {
  const user = users.getUserById(req.params.id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.send(user);
};

const removeUser = (req, res) => {
  const { params } = req;
  const user = users.deleteUser(params.id);

  if (user) {
    res.statusCode = 204;
    res.end();

    return;
  }

  res.sendStatus(404);
};

const changeUser = (req, res) => {
  const { params, body } = req;
  const user = users.updateUser(params.id, body);

  if (user) {
    res.send(user);

    return;
  }

  res.sendStatus(400);
};

module.exports = {
  getAll,
  addUser,
  getOneUser,
  removeUser,
  changeUser,
};
