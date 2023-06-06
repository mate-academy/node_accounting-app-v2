'use strict';

const models = require('./models');

function getUsers(req, res) {
  const users = models.getUsers();

  res.send(users);
}

function getUserById(req, res) {
  const { userId } = req.params;
  const user = models.getUserById(userId);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.send(user);
}

function createUser(req, res) {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = models.createUser(name);

  res.status(201).send(newUser);
}

function getExpenses(req, res) {
  const { userId, categories, from, to } = req.query;
  let filteredExpenses = models.getExpenses();

  if (userId) {
    filteredExpenses = filteredExpenses
      .filter(expense => expense.userId === +userId);
  }

  if (categories) {
    const selectedCategories = categories.split(',');

    filteredExpenses = filteredExpenses
      .filter(expense => selectedCategories.includes(expense.category));
  }

  if (from && to) {
    const fromDate = new Date(from);
    const toDate = new Date(to);

    filteredExpenses = filteredExpenses.filter(expense => {
      const expenseDate = new Date(expense.spentAt);

      return expenseDate >= fromDate && expenseDate <= toDate;
    });
  }

  res.send(filteredExpenses);
}

function getExpenseById(req, res) {
  const { expenseId } = req.params;
  const expense = models.getExpenseById(expenseId);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.send(expense);
}

function createExpense(req, res) {
  const { userId, spentAt, title, amount, category, note } = req.body;
  const newExpense = models
    .createExpense(userId, spentAt, title, amount, category, note);

  if (!newExpense) {
    res.sendStatus(400);

    return;
  }

  res.status(201).send(newExpense);
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  getExpenses,
  getExpenseById,
  createExpense,
};
