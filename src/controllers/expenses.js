'use strict';

const expenseService = require('../services/expenses.js');
const userService = require('../services/users.js');

const getAll = (req, res) => {
  const filteredExpenses = expenseService.filterExpenses(req.query);

  res.send(filteredExpenses);
};

const getById = (req, res) => {
  const { expenseId } = req.params;

  const foundExpense = expenseService.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpense);
};

const addExpense = (req, res) => {
  const data = req.body;
  const userExpense = userService
    .getAll()
    .find(({ id }) => id === data.userId);

  if (!userExpense) {
    res.sendStatus(400);

    return;
  }

  const expenseData = expenseService.addExpense(data);

  res.statusCode = 201;
  res.send(expenseData);
};

const remove = (req, res) => {
  const { expenseId } = req.params;

  const foundExpenses = expenseService.getById(expenseId);

  if (!foundExpenses) {
    res.sendStatus(404);

    return;
  }

  expenseService.remove(expenseId);

  res.sendStatus(204);
};

const update = (req, res) => {
  const { expenseId } = req.params;
  const body = req.body;

  const foundExpense = expenseService.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  const updateExpense = expenseService.update({
    id: expenseId,
    body,
  });

  res.status(200);
  res.send(updateExpense);
};

module.exports = {
  getAll,
  getById,
  addExpense,
  remove,
  update,
};
