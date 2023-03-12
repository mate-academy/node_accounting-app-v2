'use strict';

const expensesService = require('../services/expenses');
const { getUserById } = require('../services/users');

const getAll = (req, res) => {
  const params = req.query;

  const filteredExpenses = expensesService.getExpenses(params);

  res.send(filteredExpenses);
};

const getExpense = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expensesService.getExpenseById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpense);
};

const addNewExpense = (req, res) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
  } = req.body;

  const foundUser = getUserById(userId);

  const hasAllData = (foundUser
    && userId
    && spentAt
    && title
    && amount
    && category
  );

  if (!hasAllData) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expensesService.createExpense(req.body);

  res.statusCode = 201;
  res.send(newExpense);
};

const deleteExpense = (req, res) => {
  const { expenseId } = req.params;

  const foundExpense = expensesService.getExpenseById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expensesService.removeExpense(expenseId);
  res.sendStatus(204);
};

const updateExpense = (req, res) => {
  const { expenseId } = req.params;
  const dataToUpdate = req.body;

  const foundExpense = expensesService.getExpenseById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  const updatedExpense = expensesService.updateExpsense(
    expenseId,
    dataToUpdate
  );

  res.send(updatedExpense);
};

module.exports = {
  getAll,
  getExpense,
  addNewExpense,
  deleteExpense,
  updateExpense,
};
