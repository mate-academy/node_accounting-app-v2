'use strict';

const { ExpenseService } = require('../services/expenses.service');
const { UserService } = require('../services/users.service');

const expenseService = new ExpenseService();
const userService = new UserService();

const getAllExpenses = (req, res) => {
  const query = req.query;
  const expenses = expenseService.findAll(query);

  res.send(expenses);
};

const getOneExpense = (req, res) => {
  const { expenseId } = req.params;
  const expense = expenseService.findById(expenseId);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.send(expense);
};

const addExpense = (req, res) => {
  const newExpenseData = req.body;

  const user = userService.findById(newExpenseData.userId);

  if (!user || !newExpenseData.userId || !newExpenseData.spentAt
    || !newExpenseData.title || !newExpenseData.amount
    || !newExpenseData.category) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expenseService.create(newExpenseData);

  res.statusCode = 201;
  res.send(newExpense);
};

const removeExpense = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expenseService.findById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expenseService.remove(expenseId);
  res.sendStatus(204);
};

const updateExpense = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expenseService.findById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  const newExpenseData = req.body;

  expenseService.update(foundExpense, newExpenseData);
  res.send(foundExpense);
};

module.exports = {
  getAllExpenses,
  getOneExpense,
  addExpense,
  removeExpense,
  updateExpense,
};
