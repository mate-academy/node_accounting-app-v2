'use strict';

const expensesService = require('../services/expenses.js');
const userService = require('../services/users.js');

const getAll = (req, res) => {
  const query = req.query;
  const expenses = expensesService.getAll(query);

  res.statusCode = 200;
  res.send(expenses);
};

const add = (req, res) => {
  const params = req.body;

  const user = userService.getById(params.userId);

  if (!user || !(params)) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expensesService.create(params);

  res.statusCode = 201;
  res.send(newExpense);
};

const getOne = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expensesService.getById(expenseId);

  if (!foundExpense) {
    res.statusMessage = 'Not found';
    res.sendStatus(404);

    return;
  }
  res.send(foundExpense);
};

const remove = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expensesService.getById(expenseId);

  if (!foundExpense) {
    res.statusMessage = 'Not found';
    res.sendStatus(404);

    return;
  }

  expensesService.remove(expenseId);
  res.sendStatus(204);
};

const update = (req, res) => {
  const params = req.body;
  const { expenseId } = req.params;

  const foundExpense = expensesService.getById(expenseId);

  if (!foundExpense) {
    res.statusMessage = 'Not found';
    res.sendStatus(404);

    return;
  }

  if (!params) {
    res.sendStatus(400);

    return;
  }

  expensesService.update(expenseId, params);

  res.statusCode = 200;
  res.send(foundExpense);
};

module.exports = {
  getAll, add, getOne, remove, update,
};
