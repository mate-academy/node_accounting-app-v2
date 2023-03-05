'use strict';

const expensesService = require('../services/expenses');
const usersService = require('../services/users');

const getAll = (req, res) => {
  const users = expensesService.getAll(req.query);

  res.send(users);
};

const getById = (req, res) => {
  const id = +req.params.id;

  try {
    const expense = expensesService.getById(id);

    if (!expense) {
      res.sendStatus(404);

      return;
    }

    res.send(expense);
  } catch (err) {
    res.sendStatus(400);
  }
};

const add = (req, res) => {
  const data = req.body;

  try {
    if (!usersService.getById(data.userId)) {
      res.sendStatus(400);

      return;
    }

    const expense = expensesService.add(data);

    res.statusCode = 201;
    res.send(expense);
  } catch (err) {
    res.sendStatus(400);
  }
};

const remove = (req, res) => {
  const id = +req.params.id;

  try {
    if (!expensesService.getById(id)) {
      res.sendStatus(404);

      return;
    }

    expensesService.remove(id);
    res.sendStatus(204);
  } catch (err) {
    res.sendStatus(400);
  }
};

const update = (req, res) => {
  const id = +req.params.id;
  const data = req.body;

  try {
    if (!expensesService.getById(id)) {
      res.sendStatus(404);

      return;
    }

    const user = expensesService.update(id, data);

    res.send(user);
  } catch (err) {
    res.sendStatus(400);
  }
};

module.exports = {
  getAll,
  getById,
  add,
  remove,
  update,
};
