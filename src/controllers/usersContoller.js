'use strict';

const { usersService } = require('../services/users');

const getAll = (req, res) => {
  const users = usersService.getAll();

  res.send(users);
};

const getOne = (req, res) => {
  const { userId } = req.params;
  const foundUser = usersService.getOne(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.send(foundUser);
};

const addOne = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = usersService.addOne(name);

  res.statusCode = 201;
  res.send(newUser);
};

const deleteOne = (req, res) => {
  const { userId } = req.params;
  const foundUser = usersService.getOne(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  usersService.deleteOne(userId);

  res.sendStatus(204);
};

const updateOne = (req, res) => {
  const { userId } = req.params;
  const { name } = req.body;

  const foundUser = usersService.getOne(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const updatedUser = usersService.updateOne(userId);

  res.send(updatedUser);
};

module.exports.usersController = {
  getAll,
  getOne,
  addOne,
  deleteOne,
  updateOne,
};
