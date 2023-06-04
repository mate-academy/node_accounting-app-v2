'use strict';

const expenseService = require('../services/expenses.js');
const userService = require('../services/users.js');

const getAll = (req, res) => {
  const filteredExpenses = expenseService.filterExpenses(req.query);

  res.send(filteredExpenses);
};

const getById = (req, res) => {
  const { expensesId } = req.params;

  const foundExpense = expenseService.getById(expensesId);

  if (foundExpense === undefined) {
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
  const { expensesId } = req.params;

  const foundExpenses = expenseService.getById(expensesId);

  if (!foundExpenses) {
    res.sendStatus(404);

    return;
  }

  expenseService.remove(expensesId);

  res.statusCode = 204;
  res.send();
};

const update = (req, res) => {
  const { expensesId } = req.params;
  const body = req.body;

  const foundExpense = expenseService.getById(expensesId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  const updateExpense = expenseService.update({
    id: expensesId,
    body,
  });

  res.statusCode = 200;
  res.send(updateExpense);
};

module.exports = {
  getAll,
  getById,
  addExpense,
  remove,
  update,
};
