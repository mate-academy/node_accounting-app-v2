'use strict';

const usersService = require('../services/users');

const getAll = (req, res) => {
  const usersFrom = usersService.getAll();

  res.send(usersFrom);
};

const getOne = (req, res) => {
  const { userId } = req.params;

  const foundUser = usersService.getById(userId);

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

  if (!userId) {
    res.sendStatus(400);

    return;
  }

  const foundUser = usersService.getById(userId);

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

  if (!userId || !name) {
    res.sendStatus(400);

    return;
  }

  const foundUser = usersService.updateOne(userId, name);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.send(foundUser);
};

module.exports = {
  getAll,
  getOne,
  addOne,
  deleteOne,
  updateOne,
};
