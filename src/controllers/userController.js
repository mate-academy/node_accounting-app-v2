'use strict';

const { userService } = require('../services/userService');

const getAll = (req, res) => {
  const users = userService.getAll();

  res.send(users);
};

const getOne = (req, res) => {
  const { id } = req.params;
  const foundUser = userService.getById(Number(id));

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

  const newUser = userService.createUser(name);

  res.statusCode = 201;
  res.send(newUser);
};

const remove = (req, res) => {
  const { id } = req.params;
  const foundUser = userService.getById(+id);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  userService.deleteUser(id);
  res.sendStatus(204);
};

const update = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const foundUser = userService.getById(Number(id));

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  if (typeof name !== 'string') {
    res.sendStatus(422);

    return;
  }

  const updatedUser = userService.updateUser({
    id: Number(id),
    name,
  });

  res.send(updatedUser);
};

module.exports = {
  getAll,
  getOne,
  add,
  remove,
  update,
};
