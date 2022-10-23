'use strict';

const { userService } = require('../service/user.js');

const add = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  };

  const newUser = userService.create(name);

  res.statusCode = 201;
  res.send(newUser);
};

const getAll = (req, res) => {
  const users = userService.getAll();

  if (!users.length) {
    res.send([]);

    return;
  }

  res.send(users);
};

const getOne = (req, res) => {
  const userId = +req.params.userId;

  if (typeof userId !== 'number') {
    res.sendStatus(400);

    return;
  }

  const foundUser = userService.getById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.sendStatus = 200;
  res.send(foundUser);
};

const update = (req, res) => {
  const userId = +req.params.userId;
  const { name } = req.body;

  if (typeof userId !== 'number') {
    res.sendStatus(400);

    return;
  }

  const foundUser = userService.getById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  userService.update({
    id: userId,
    name,
  });

  res.send(foundUser);
};

const remove = (req, res) => {
  const userId = +req.params.userId;

  if (typeof userId !== 'number') {
    res.sendStatus(400);

    return;
  }

  const foundUser = userService.getById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  userService.remove(userId);
  res.sendStatus(204);
};

module.exports.userController = {
  add,
  getOne,
  getAll,
  update,
  remove,
};
