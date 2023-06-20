'use strict';

const userServise = require('../services/users.js');

const post = (req, res) => {
  const { name } = req.body;

  if (!name || typeof name !== 'string') {
    res.sendStatus(400);

    return;
  }

  const newUser = {
    id: Math.floor(Math.random()),
    name,
  };

  userServise.add(newUser);

  res.statusCode = 201;
  res.send(newUser);
};

const get = (req, res) => {
  const users = userServise.getAll();

  res.statusCode = 200;

  if (users.length === 0) {
    res.send([]);
  }

  res.send(users);
};

const getId = (req, res) => {
  const { id } = req.params;
  const foundUser = userServise.findById(+id);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  };

  if (typeof +id !== 'number') {
    res.sendStatus(422);

    return;
  };

  res.send(foundUser);
};

const patch = (req, res) => {
  const { id } = req.params;
  const foundUser = userServise.findById(+id);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  };

  if (typeof +id !== 'number') {
    res.sendStatus(422);

    return;
  };

  userServise.update(foundUser, { ...req.body });
  res.send(foundUser);
};

const deleteUser = (req, res) => {
  const { id } = req.params;
  const foundUser = userServise.findById(+id);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  userServise.remove(foundUser.id);
  res.sendStatus(204);
};

module.exports = {
  post,
  get,
  getId,
  patch,
  deleteUser,
};
