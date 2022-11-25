'use strict';

const { UserService } = require('../services/userService');
const userService = new UserService();

const getAll = (req, res) => {
  const users = userService.getAll();

  res.send(users);
};

const getOne = (req, res) => {
  const { userId } = req.params;
  const user = userService.getUserById(+userId);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  if (isNaN(userId)) {
    res.sendStatus(400);

    return;
  }

  res.send(user);
};

const add = (req, res) => {
  const { name } = req.body;

  if (typeof name !== 'string' || !name) {
    res.sendStatus(400);

    return;
  }

  const newUser = userService.create(name);

  res.statusCode = 201;
  res.send(newUser);
};

const remove = (req, res) => {
  const { userId } = req.params;
  const deletedUser = userService.remove(+userId);

  if (!deletedUser) {
    res.sendStatus(404);

    return;
  }

  res.sendStatus(204);
};

const update = (req, res) => {
  const { userId } = req.params;
  const foundUser = userService.getUserById(+userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  const { name } = req.body;

  if (typeof name !== 'string') {
    res.sendStatus(400);

    return;
  }

  userService.update({
    id: +userId,
    name,
  });

  res.send(foundUser);
};

module.exports = {
  getAll,
  getOne,
  add,
  remove,
  update,
};
