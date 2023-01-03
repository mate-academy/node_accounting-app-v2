'use strict';

const expensesService = require('../services/expenses');
const usersService = require('../services/users');

const getFilteredExpense = (req, res) => {
  const expenses = expensesService.getFilteredExpense(req.query);

  res.send(expenses);
};

const getOneExpense = (req, res) => {
  const { expenseId } = req.params;
  const searchedExpense = expensesService.getExpenseByID(+expenseId);

  if (!searchedExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(searchedExpense);
};

const addExpense = (req, res) => {
  const {
    title,
    userId,
    spentAt,
    amount,
    category,
    note,
  } = req.body;

  const searchedUser = usersService.getUserByID(userId);

  if (!title || !searchedUser || !spentAt || !amount || !category) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expensesService.createExpense({
    title,
    userId,
    spentAt,
    amount,
    category,
    note,
  });

  res.statusCode = 201;
  res.send(newExpense);
};

const removeExpense = (req, res) => {
  const { expenseId } = req.params;

  const searchedExpense = expensesService.getExpenseByID(+expenseId);

  if (!searchedExpense) {
    res.sendStatus(404);

    return;
  }

  expensesService.removeExpense(+expenseId);
  res.sendStatus(204);
};

const updatedExpense = (req, res) => {
  if (!req.body) {
    res.sendStatus(400);

    return;
  }

  const { expenseId } = req.params;

  const searchedExpense = expensesService.getExpenseByID(+expenseId);

  if (!searchedExpense) {
    res.sendStatus(404);

    return;
  }

  expensesService.updateExpense(req.body, expenseId);
};

module.exports = {
  getFilteredExpense,
  getOneExpense,
  addExpense,
  removeExpense,
  updatedExpense,
};
