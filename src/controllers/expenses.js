'use strict';

const expensesService = require('../services/expenses');
const usersService = require('../services/users');

const getAllExpenses = (req, res) => {
  const { userId, category, from, to } = req.query;

  const filteredExpenses = expensesService
    .getAllExpenses(userId, category, from, to);

  res.send(filteredExpenses);
};

const getExpensesById = (req, res) => {
  const { expenseId } = req.params;

  const foundExpense = expensesService.getExpensesById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpense);
};

const addExpense = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  const foundUser = usersService.getUserById(userId);

  if (!title || !foundUser) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expensesService
    .addExpense(userId, spentAt, title, amount, category, note);

  res.statusCode = 201;

  res.send(newExpense);
};

const deleteExpense = (req, res) => {
  const { expenseId } = req.params;

  const foundExpense = expensesService.getExpensesById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expensesService.deleteExpense(expenseId);

  res.sendStatus(204);
};

const updateExpense = (req, res) => {
  const { expenseId } = req.params;

  const foundExpense = expensesService.getExpensesById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  const { spentAt, title, amount, category, note } = req.body;

  const updatedExpense = expensesService
    .updateExpense(foundExpense, spentAt, title, amount, category, note);

  res.send(updatedExpense);
};

module.exports = {
  getAllExpenses,
  getExpensesById,
  addExpense,
  deleteExpense,
  updateExpense,
};
