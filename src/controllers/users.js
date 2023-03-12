'use strict';

const userService = require('../services/users');

function getAll(req, res) {
  const goods = userService.getAll();

  res.send(goods);
}

function getOne(req, res) {
  const { userId } = req.params;
  const foundUser = userService.getOne(Number(userId));

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.send(foundUser);
}

function addOne(req, res) {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = userService.addOne(name);

  res.statusCode = 201;
  res.send(newUser);
}

function deleteOne(req, res) {
  const { userId } = req.params;

  const isDeleted = userService.deleteOne(Number(userId));

  if (isDeleted) {
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
}

function updateOne(req, res) {
  const { userId } = req.params;

  const foundUser = userService.getOne(Number(userId));

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  const { name } = req.body;

  if (!name) {
    res.sendStatus(422);

    return;
  }

  const updatedUser = userService.updateOne(Number(userId), name);

  res.send(updatedUser);
}

module.exports = {
  getAll,
  getOne,
  addOne,
  deleteOne,
  updateOne,
};
