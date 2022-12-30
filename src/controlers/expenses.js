'use strict';

const expensesControler = require('../sevices/expenses');
const { validation } = require('../utils/expensesValidation');
const { isUserExists } = require('../utils/userValidation');

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
  const isUser = isUserExists(data.userId);

  if (isUser || validation(data)) {
    res.sendStatus(400);

    return;
  }

  const newUser = expensesControler.createExpense(data);

  res.statusCode = 201;
  res.send(newUser);
};

const removeExpense = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expensesControler.getExpenseById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expensesControler.removeExpense(expenseId);
  res.sendStatus(204);
};

const updateExpense = (req, res) => {
  const { expenseId } = req.params;
  const newData = req.body;

  const foundExpense = expensesControler.getExpenseById(expenseId);

  if (!foundExpense || validation(newData)) {
    res.sendStatus(400);

    return;
  }

  expensesControler.updateExpense(expenseId, newData);
  res.sendStatus(200);
};

module.exports = {
  getExpenses,
  createExpense,
  getExpenseById,
  removeExpense,
  updateExpense,
};
