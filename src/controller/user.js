'use strict';

const userServise = require('../services/users.js');
const post = (req, res) => {
  const { name } = req.body;

  if (!name || typeof name !== 'string') {
    res.sendStatus(400);

    return;
  }

  const newUser = {
    id: Math.floor(Date.now() * Math.random()),
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
  const detectedUser = userServise.findById(+id);

  if (!detectedUser) {
    res.sendStatus(404);

    return;
  };

  if (typeof +id !== 'number') {
    res.sendStatus(422);

    return;
  };
  res.send(detectedUser);
};
const patch = (req, res) => {
  const { id } = req.params;
  const detectedUser = userServise.findById(+id);

  if (!detectedUser) {
    res.sendStatus(404);

    return;
  };

  if (typeof +id !== 'number') {
    res.sendStatus(422);

    return;
  };
  userServise.update(detectedUser, { ...req.body });
  res.send(detectedUser);
};
const deleteUser = (req, res) => {
  const { id } = req.params;
  const detectedUser = userServise.findById(+id);

  if (!detectedUser) {
    res.sendStatus(404);

    return;
  }
  userServise.remove(detectedUser.id);
  res.sendStatus(204);
};

module.exports = {
  post,
  get,
  getId,
  patch,
  deleteUser,
};
