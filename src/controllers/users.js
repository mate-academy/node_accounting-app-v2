'use strict';

const userService = require('../services/users');

function getAll(req, res) {
  const users = userService.getAll();

  res.send(users);
}

function getOne(req, res) {
  const { userId } = req.params;

  const foundUser = userService.getById(userId);

  if (!foundUser) {
    res.statusCode = 404;
    res.end(`User with id ${userId} was not found`);

    return;
  }

  res.send(foundUser);
}

function add(req, res) {
  const { name } = req.body;

  if (!name) {
    res.statusCode = 400;
    res.send('You should pass the mandatory "name" field in the object');

    return;
  }

  const newUser = userService.create(name);

  res.statusCode = 201;
  res.send(newUser);
}

function remove(req, res) {
  const { userId } = req.params;
  const foundUser = userService.getById(userId);

  if (!foundUser) {
    res.statusCode = 404;
    res.send(`User with id ${userId} was not found`);

    return;
  }

  userService.remove(userId);

  res.sendStatus(204);
}

function update(req, res) {
  const { userId } = req.params;
  const { name: newName } = req.body;

  const foundUser = userService.getById(userId);

  if (!foundUser) {
    res.statusCode = 404;
    res.send(`User with id ${userId} was not found`);

    return;
  }

  if (!newName || typeof newName !== 'string') {
    res.statusCode = 400;
    // eslint-disable-next-line max-len
    res.send('To update a user it is necessary to pass the "name" field in the object.');

    return;
  }

  const updatedUser = userService.update(userId, newName);

  res.send(updatedUser);
}

module.exports = {
  getAll,
  getOne,
  add,
  remove,
  update,
};
