'use strict';

const expensesService = require('../services/expenses');
const usersService = require('../services/users');

const getAll = (req, res) => {
  const users = usersService.getAll();

  res.send(users);
};

const getOne = (req, res) => {
  const { userId } = req.body;

  const foundUser = usersService.getOne(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.statusCode(200);
  res.send(foundUser);
};

const addOne = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = usersService.getOne(name);

  res.statusCode(201);
  res.send(newUser);
};

const deleteOne = (req, res) => {
  const { userId } = req.params;

  const foundUser = usersService.getOne(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  expensesService.deleteOne(foundUser);
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

  const updatedUser = expensesService.updateOne(userId, name);

  res.send(updatedUser);
};

module.exports = {
  getAll,
  getOne,
  addOne,
  deleteOne,
  updateOne,
};
