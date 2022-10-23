'use strict';

const functions = require('../functions/users');

const post = (req, res) => {
  const { name } = req.body;

  if (!name || typeof name !== 'string') {
    res.sendStatus(400);

    return;
  }

  const newUser = {
    id: Math.floor(Math.random() ** 2 * 100 + Math.random() * 10),
    name,
  };

  functions.add(newUser);

  res.statusCode = 201;
  res.send(newUser);
};

const get = (req, res) => {
  const users = functions.getData();

  res.statusCode = 200;

  if (users.length === 0) {
    res.send([]);
  }

  res.send(users);
};

const getId = (req, res) => {
  const { id } = req.params;
  const user = functions.getById(+id);

  if (!user) {
    res.sendStatus(404);

    return;
  };

  if (typeof Number(id) !== 'number') {
    res.sendStatus(422);

    return;
  };

  res.send(user);
};

const patch = (req, res) => {
  const { id } = req.params;
  const user = functions.getById(+id);

  if (!user) {
    res.sendStatus(404);

    return;
  };

  if (typeof Number(id) !== 'number') {
    res.sendStatus(422);

    return;
  };

  functions.update(user, { ...req.body });
  res.send(user);
};

const deleteItem = (req, res) => {
  const { id } = req.params;
  const user = functions.getById(+id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  functions.remove(user.id);
  res.sendStatus(204);
};

module.exports = {
  post,
  get,
  getId,
  patch,
  deleteItem,
};
