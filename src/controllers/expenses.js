'use strict';

const expenseService = require('../services/expenses');
const userService = require('../services/users');

const getAll = (req, res) => {
  const queryParams = req.query;

  const filteredExpenses = expenseService.getAll(queryParams);

  res.send(filteredExpenses);
};

const getOne = (req, res) => {
  const { expenseId } = req.params;

  if (isNaN(+expenseId)) {
    res.sendStatus(400);

    return;
  }

  const foundExpense = expenseService.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  };

  res.send(foundExpense);
};

const add = (req, res) => {
  const data = req.body;

  const hasUser = userService.getById(data.userId);

  if (Object.keys(data) < 6 || !hasUser) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expenseService.create(data);

  res.status(201);
  res.send(newExpense);
};

const update = (req, res) => {
  const { expenseId } = req.params;

  const foundExpense = expenseService.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  };

  const data = req.body;

  const expense = expenseService.update({
    expenseId,
    data,
  });

  res.send(expense);
};

const remove = (req, res) => {
  const { expenseId } = req.params;

  const foundExpense = expenseService.getById(expenseId);

  if (!foundExpense) {
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
