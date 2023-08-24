'use strict';

const expenseService = require('../servises/expenses');
const userService = require('../servises/users');

const getAll = (req, res) => {
  const { userId, categories, from, to } = req.query;

  const expensesToSend = expenseService.getFilteredExpenses(
    userId,
    categories,
    from,
    to
  );

  res.statusCode = 200;
  res.send(expensesToSend);
};

const createExpense = (req, res) => {
  let newExpense = req.body;
  const { userId } = newExpense;

  const foundUser = userService.findUser(+userId);

  if (!foundUser) {
    res.sendStatus(400);

    return;
  }

  newExpense = expenseService.createExpense(newExpense);

  res.statusCode = 201;
  res.send(newExpense);
};

const findExpense = (req, res) => {
  const { expenseId } = req.params;

  const foundExpense = expenseService.findExpense(+expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;
  res.send(foundExpense);
};

const deleteExpense = (req, res) => {
  const { expenseId } = req.params;

  const foundExpense = expenseService.findExpense(+expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expenseService.deleteExpenses(+expenseId);
  res.sendStatus(204);
};

const updateExpense = (req, res) => {
  const { expenseId } = req.params;

  const foundExpense = expenseService.findExpense(+expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  for (const key in req.body) {
    if (key === 'id') {
      res.sendStatus(400);

      return;
    }

    foundExpense[key] = req.body[key];
  }

  res.send(foundExpense);
};

module.exports = {
  findExpense,
  getAll,
  updateExpense,
  createExpense,
  deleteExpense,
};
