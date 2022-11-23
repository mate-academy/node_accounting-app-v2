'use strict';

const expensesControler = require('../sevices/expenses');

const getExpenses = (req, res) => {
  const expenses = expensesControler.getExpenses();

  res.send(expenses);
};

const getExpenseById = (req, res) => {
  const { expenseId } = req.params;

  const foundExpense = expensesControler.getExpenseById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpense);
};

const createExpense = (req, res) => {
  const data = req.body;

  const keys = Object.keys(data);
  const values = Object.values(data);

  if (keys.some(field => !field) || values.some(field => !field)) {
    res.sendStatus(400);

    return;
  }

  const newUser = expensesControler.createExpense(data);

  res.statusCode = 201;
  res.send(newUser);
};

const removeExpense = (req, res) => {
  const { expenseId } = req.params;
  const foundUser = expensesControler.getExpenseById(expenseId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  expensesControler.removeExpense(expenseId);
  res.sendStatus(204);
};

module.exports = {
  getExpenses,
  createExpense,
  getExpenseById,
  removeExpense,
};
