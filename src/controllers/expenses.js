'use strict';

const {
  takeExpenses,
  getAllExpenses,
  filterByData,
  filterByCategory,
  filterById,
  getExpenseById,
  createExpense,
  removeExpense,
  updateExpense,
} = require('../services/expenses.js');
const userService = require('../services/users.js');
const { takeUsers } = require('../services/users.js');

const getExpenses = (req, res) => {
  const { userId, category, to, from } = req.query;

  if (from && to) {
    const foundExpensesByDate = filterByData(from, to);

    res.send(foundExpensesByDate);
    res.statusCode = 200;

    return;
  }

  if (category) {
    const foundByCategory = filterByCategory(userId, category);

    res.send(foundByCategory);
    res.statusCode = 200;

    return;
  }

  if (userId) {
    const foundExpensesByUserId = filterById(userId);

    res.send(foundExpensesByUserId);
    res.statusCode = 200;

    return;
  }

  res.statusCode = 200;

  res.send(getAllExpenses());
};

const getOneExpense = (req, res) => {
  const { expenseId } = req.params;

  if (typeof +expenseId !== 'number') {
    res.sendStatus(400);

    return;
  }

  const foundExpense = getExpenseById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;

  res.send(foundExpense);
};

const addExpense = (req, res) => {
  const { userId } = req.body;

  const newExpense = createExpense(req.body);

  const foundUser = userService.getUserById(userId, takeUsers());

  if (!foundUser) {
    res.sendStatus(400);

    return;
  }

  res.statusCode = 201;

  res.send(newExpense);
};

const remove = (req, res) => {
  const { expenseId } = req.params;

  const expenses = takeExpenses();
  const newExpenses = removeExpense(expenseId);

  if (expenses.length === newExpenses.length) {
    res.sendStatus(404);

    return;
  }

  // removeExpense(expenseId);

  res.sendStatus(204);
};

const update = (req, res) => {
  const { expenseId } = req.params;
  const { title } = req.body;

  const foundExpense = getExpenseById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  if (typeof title !== 'string') {
    res.sendStatus(400);

    return;
  }

  updateExpense(foundExpense, title);

  res.send(foundExpense);
};

module.exports = {
  getExpenses,
  getOneExpense,
  addExpense,
  remove,
  update,
};
