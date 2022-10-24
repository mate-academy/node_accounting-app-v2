'use strict';

const userService = require('../services/users.js');
const expenseService = require('../services/expenses.js');

const getAll = (req, res) => {
  const { userId, from, to, category } = req.query;

  const expenses = expenseService.getAll();

  const foundUser = userService.getUserById(userId);

  const categoryExpenses = expenseService.getExpenseByCategory(category);

  const userExpenses = expenseService.getExpenseByUser(userId);

  const expensesBetweenDates = expenseService.getExpensesBetweenDates(from, to);

  if (from && to) {
    res.send(expensesBetweenDates);

    return;
  }

  if (category) {
    res.send(categoryExpenses);

    return;
  }

  if (foundUser) {
    res.send(userExpenses);

    return;
  }

  res.send(expenses);
};

const getOne = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expenseService.getExpenseById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpense);
};

const add = (req, res) => {
  const { userId, title } = req.body;
  const expensesKey = req.body;

  const foundUser = userService.getUserById(userId);

  if (!title || !foundUser) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expenseService.createExprense(expensesKey);

  res.statusCode = 201;
  res.send(newExpense);
};

const remove = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expenseService.getExpenseById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expenseService.removeExpense(expenseId);
  res.sendStatus(204);
};

const update = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expenseService.getExpenseById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expenseService.updateExpense(foundExpense, req.body);

  res.send(foundExpense);
};

module.exports = {
  getOne,
  getAll,
  add,
  remove,
  update,
};
