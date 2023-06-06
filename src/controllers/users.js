'use strict';

const { getNextId } = require('../getNextId');

let users = [];

const getUsers = (req, res) => {
  if (req) {
    res.send(users);
  }

  return users;
};

const getOne = (req, res) => {
  const { userId } = req.params;
  const foundUser = users.find(user => user.id === Number(userId));

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.send(foundUser);
};

const add = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = {
    id: getNextId(users),
    name,
  };

  users.push(newUser);

  res.statusCode = 201;
  res.send(newUser);
};

const remove = (req, res) => {
  const { userId } = req.params;
  const filteredUsers = users.filter(user => user.id !== Number(userId));

  if (filteredUsers.length === users.length) {
    res.sendStatus(404);

    return;
  }

  users = filteredUsers;
  res.sendStatus(204);
};

const update = (req, res) => {
  const { userId } = req.params;
  const foundUser = users.find(user => user.id === Number(userId));

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  const { name } = req.body;

  if (typeof name !== 'string') {
    res.sendStatus(422);

    return;
  }

  Object.assign(foundUser, { name });

  res.send(foundUser);
};

const removeUsers = () => {
  users = [];
};

module.exports = {
  getUsers,
  getOne,
  add,
  remove,
  update,
  removeUsers,
};
