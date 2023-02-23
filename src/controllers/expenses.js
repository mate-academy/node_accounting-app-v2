'use strict';

const expensesService = require('../services/expenses.js');
const userService = require('../services/users.js');

const getAll = (req, res) => {
  const filters = req.query;
  const expenses = expensesService.getAll(filters);

  res.statusCode = 200;
  res.send(expenses);
};

const create = (req, res) => {
  const options = req.body;

  const user = userService.findById(options.userId);

  if (!user || !options) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expensesService.create(options);

  res.statusCode = 201;
  res.send(newExpense);
};

const getOne = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expensesService.findById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }
  res.send(foundExpense);
};

const remove = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expensesService.findById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expensesService.remove(expenseId);
  res.sendStatus(204);
};

const update = (req, res) => {
  const options = req.body;
  const { expenseId } = req.params;

  const foundExpense = expensesService.findById(expenseId);

  if (!foundExpense) {
    res.statusMessage = 'Not found';
    res.sendStatus(404);

    return;
  }

  if (!options) {
    res.sendStatus(400);

    return;
  }

  expensesService.update(expenseId, options);

  res.statusCode = 200;
  res.send(foundExpense);
};

module.exports = {
  getAll, create, getOne, remove, update,
};
