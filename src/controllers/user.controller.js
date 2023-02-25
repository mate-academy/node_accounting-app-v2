'use strict';

const { userService } = require('../services/user.service.js');

const getAll = (req, res) => {
  const users = userService.getAll();

  res.send(users);
};

const create = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const isDataTypeValid = typeof name === 'string';

  if (!isDataTypeValid) {
    res.sendStatus(422);

    return;
  }

  const createdUser = userService.create({ name });

  res.statusCode = 201;
  res.send(createdUser);
};

const getById = (req, res) => {
  const userId = Number(req.params.userId);

  const isUserIdValid = !isNaN(userId);

  if (!isUserIdValid) {
    res.sendStatus(422);

    return;
  }

  if (!userId) {
    res.sendStatus(400);

    return;
  }

  const foundUser = userService.findById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.send(foundUser);
};

const remove = (req, res) => {
  const userId = Number(req.params.userId);

  const isUserIdValid = !isNaN(userId);

  if (!isUserIdValid) {
    res.sendStatus(422);

    return;
  }

  const foundUser = userService.findById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  if (!userId) {
    res.sendStatus(400);

    return;
  }

  userService.remove(userId);
  res.sendStatus(204);
};

const update = (req, res) => {
  const userId = Number(req.params.userId);

  const isUserIdValid = !isNaN(userId);

  if (!isUserIdValid) {
    res.sendStatus(422);

    return;
  }

  const foundUser = userService.findById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  if (!userId) {
    res.sendStatus(400);

    return;
  }

  const { name } = req.body;

  if (typeof name !== 'string') {
    res.sendStatus(422);

    return;
  }

  userService.update({
    id: userId,
    name,
  });

  res.send(foundUser);
};

module.exports = {
  userController: {
    getAll,
    create,
    getById,
    remove,
    update,
  },
};
