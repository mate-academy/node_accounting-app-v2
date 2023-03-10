'use strict';

const expensesService = require('../services/expenses');
const usersService = require('../services/users');

const getAll = (req, res) => {
  const users = expensesService.getMany(req.query);

  res.send(users);
};

const getById = (req, res) => {
  const { id } = req.params;

  try {
    const expense = expensesService.getById(id);

    if (!expense) {
      return res.sendStatus(404);
    }

    res.send(expense);
  } catch (err) {
    res.sendStatus(400);
  }
};

const add = (req, res) => {
  const data = req.body;

  try {
    const hasUser = Boolean(usersService.getById(data.userId));

    if (!hasUser) {
      return res.sendStatus(400);
    }

    const expense = expensesService.add(data);

    res.statusCode = 201;
    res.send(expense);
  } catch (err) {
    res.sendStatus(400);
  }
};

const remove = (req, res) => {
  const { id } = req.params;

  try {
    const expense = expensesService.getById(id);

    if (!expense) {
      return res.sendStatus(404);
    }

    expensesService.remove(id);
    res.sendStatus(204);
  } catch (err) {
    res.sendStatus(400);
  }
};

const update = (req, res) => {
  const { id } = req.params;
  const data = req.body;

  try {
    const expense = expensesService.getById(id);

    if (!expense) {
      return res.sendStatus(404);
    }

    const updatedExpense = expensesService.update(id, data);

    res.send(updatedExpense);
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
