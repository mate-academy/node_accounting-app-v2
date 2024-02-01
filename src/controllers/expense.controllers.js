'use strict';

const expenseService = require('../servises/expense.services');
const userService = require('../servises/user.services');

const getAllExp = (req, res) => {
  const expenses = expenseService.getAllExpenses(req);

  res.statusCode = 200;
  res.send(expenses);
};

const getOneExp = (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(400);
    res.send('Bad Request');
  }

  const expense = expenseService.getExpenseById(+id);

  if (!expense) {
    res.sendStatus(404);
    res.send('Expense not found');

    return;
  }

  res.send(expense);
};

const createExp = (req, res) => {
  const { userId, title } = req.body;
  const currentUser = userService.getUserById(+userId);

  if (!title || !currentUser) {
    res.sendStatus(400);
    res.send('Bad Request');

    return;
  }

  const newExpense = expenseService.createExpense(req);

  res.statusCode = 201;
  res.send(newExpense);
};

const updateExp = (req, res) => {
  const { id } = req.params;

  if (!req.body) {
    res.sendStatus(400);
    res.send('Bad Request');

    return;
  }

  const expense = req.body;
  const updatedExp = expenseService.updateExpense(id, expense);

  if (!updatedExp) {
    res.sendStatus(404);
    res.send('Expense not found');

    return;
  }

  res.statusCode = 200;
  res.send(updatedExp);
};

const removeExp = (req, res) => {
  const { id } = req.params;

  const currentExp = expenseService.getExpenseById(+id);

  if (!currentExp) {
    res.sendStatus(404);
    res.send('Expense not found');

    return;
  }

  expenseService.deleteExpense(+id);
  res.sendStatus(204);
};

module.exports = {
  getAllExp,
  getOneExp,
  createExp,
  updateExp,
  removeExp,
};
