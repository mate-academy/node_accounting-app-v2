'use strict';

const userService = require('../services/users');
const expenseService = require('../services/expenses');

const getAll = (req, res) => {
  const queryParams = req.query;

  const filteredExpenses = expenseService.getAll(queryParams);

  res.send(filteredExpenses);
};

const getOne = (req, res) => {
  const { expenseId } = req.params;

  const currentExpense = expenseService.getByExpenseId(expenseId);

  if (!currentExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(currentExpense);
};

const add = (req, res) => {
  const data = req.body;

  const hasUser = userService.getById(data.userId);

  if (!hasUser || !Object.keys(data).length) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expenseService.create(data);

  res.status(201);
  res.send(newExpense);
};

const update = (req, res) => {
  const { expenseId } = req.params;

  const currentExpense = expenseService.getByExpenseId(expenseId);

  if (!currentExpense) {
    res.sendStatus(404);

    return;
  }

  const data = req.body;

  const expense = expenseService.update({
    expenseId,
    data,
  });

  res.send(expense);
};

const remove = (req, res) => {
  const { expenseId } = req.params;

  const currentExpense = expenseService.getByExpenseId(expenseId);

  if (!currentExpense) {
    res.sendStatus(404);

    return;
  }

  expenseService.remove(expenseId);
  res.sendStatus(204);
};

module.exports = {
  getAll,
  getOne,
  add,
  update,
  remove,
};
