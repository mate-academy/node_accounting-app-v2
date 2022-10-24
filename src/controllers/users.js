'use strict';

const {
  createUser,
  getUsers,
  getUser,
  removeUser,
  updateOneUser,
} = require('../services/users');

function get(req, res) {
  const users = getUsers();

  res.send(users);
}

function add(req, res) {
  const { name } = req.body;

  res.statusCode = 201;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  res.send(createUser(name));
}

function getOne(req, res) {
  const { id } = req.params;

  res.statusCode = 200;

  const foundUser = getUser(id);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.send(foundUser);
}

function remove(req, res) {
  const userId = Number(req.params.id);

  const foundUser = getUser(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  removeUser(foundUser.id);
  res.sendStatus(204);
}

function update(req, res) {
  const userId = Number(req.params.id);

  if (typeof userId !== 'number') {
    res.sendStatus(400);

    return;
  }

  const foundUser = getUser(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  updateOneUser(foundUser, { ...req.body });

  res.statusCode = 200;

  res.send(foundUser);
};

module.exports = {
  add,
  get,
  getOne,
  remove,
  update,
};
