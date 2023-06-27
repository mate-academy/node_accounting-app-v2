'use strict';

const usersServices = require('./services');

module.exports.getUsers = (req, res) => {
  const users = usersServices.getAll();

  res.send(users);
};

module.exports.getUser = (req, res) => {
  const { id } = req.params;
  const numId = +id;

  if (isNaN(numId)) {
    res.sendStatus(400);

    return;
  }

  const foundUser = usersServices.getUser(numId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.send(foundUser);
};

module.exports.addUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = usersServices.addUser(name);

  res.statusCode = 201;
  res.send(newUser);
};

module.exports.deleteUser = (req, res) => {
  const { id } = req.params;
  const numId = +id;

  if (isNaN(numId)) {
    res.sendStatus(400);

    return;
  }

  try {
    usersServices.deleteUser(numId);

    res.sendStatus(204);
  } catch (err) {
    res.sendStatus(404);
  }
};

module.exports.updateUser = (req, res) => {
  const { id } = req.params;
  const numId = +id;

  if (isNaN(numId)) {
    res.sendStatus(400);

    return;
  }

  const body = req.body;

  if (body.id || !body.name) {
    res.sendStatus(400);

    return;
  }

  try {
    const updatedUser = usersServices.updateUser(numId, body);

    res.send(updatedUser);
  } catch (err) {
    res.sendStatus(404);
  }
};
