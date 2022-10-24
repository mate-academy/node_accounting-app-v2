'use strict';

const {
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
const { allUsers } = require('../controllers/users.js');

let expenses = [];

const clearExpensesArray = () => {
  expenses = [];
};

const getExpenses = (req, res) => {
  const { userId, category, to, from } = req.query;

  if (from && to) {
    const foundExpensesByDate = filterByData(from, to, expenses);

    res.send(foundExpensesByDate);
    res.statusCode = 200;

    return;
  }

  if (category) {
    const foundByCategory = filterByCategory(userId, category, expenses);

    res.send(foundByCategory);
    res.statusCode = 200;

    return;
  }

  if (userId) {
    const foundExpensesByUserId = filterById(userId, expenses);

    res.send(foundExpensesByUserId);
    res.statusCode = 200;

    return;
  }

  res.statusCode = 200;

  res.send(getAllExpenses(expenses));
};

const getOneExpense = (req, res) => {
  const { expenseId } = req.params;

  if (typeof +expenseId !== 'number') {
    res.sendStatus(400);

    return;
  }

  const foundExpense = getExpenseById(expenseId, expenses);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;

  res.send(foundExpense);
};

const addExpense = (req, res) => {
  const { userId } = req.body;

  const newExpense = createExpense(req.body, expenses);

  const foundUser = userService.getUserById(userId, allUsers());

  if (!foundUser) {
    res.sendStatus(400);

    return;
  }

  res.statusCode = 201;

  res.send(newExpense);
};

const remove = (req, res) => {
  const { expenseId } = req.params;

  const newExpenses = removeExpense(expenseId, expenses);

  if (expenses.length === newExpenses.length) {
    res.sendStatus(404);

    return;
  }

  expenses = newExpenses;

  res.sendStatus(204);
};

const update = (req, res) => {
  const { expenseId } = req.params;
  const { title } = req.body;

  const foundExpense = getExpenseById(expenseId, expenses);

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
  clearExpensesArray,
  getExpenses,
  getOneExpense,
  addExpense,
  remove,
  update,
};
