'use strict';

const { users } = require('./usersController');

const expenses = [];

function getExpenses(req, res) {
  let currentExpenses = [...expenses];
  const userId = Number(req.query.userId);
  let from = req.query.from;
  let to = req.query.to;
  const category = req.query.categories;

  if (userId) {
    currentExpenses
      = currentExpenses.filter(expense => expense.userId === userId);
  }

  if (from && to) {
    from = new Date(from);
    to = new Date(to);

    currentExpenses
      = currentExpenses.filter(expense => {
        return new Date(expense.spentAt) >= from
        && new Date(expense.spentAt) <= to;
      });
  }

  if (category) {
    currentExpenses
      = currentExpenses.filter(expense => expense.category === category);
  }

  res.send(currentExpenses);
}

function getExpenseById(req, res) {
  const { id } = req.params;
  const searchId = +id;

  const expenseResult = expenses.find(expense => expense.id === searchId);

  if (!expenseResult) {
    res.sendStatus(404);

    return;
  }
  res.send(expenseResult);
}

function createExpense(req, res) {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (userId === undefined || !spentAt || !title || !amount || !category) {
    res.sendStatus(400);

    return;
  }

  const userIds = users.map(user => user.id);

  if (!userIds.includes(userId)) {
    res.sendStatus(400);

    return;
  }

  let id = Math.max(...expenses.map(exp => exp.id)) + 1;

  if (id === -Infinity) {
    id = 0;
  }

  const expense = {
    id,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses.push(expense);
  res.statusCode = 201;
  res.send(expense);
}

function updateExpense(req, res) {
  const { id } = req.params;
  const searchId = +id;
  const { userId, spentAt, title, amount, category, note } = req.body;

  const index = expenses.findIndex(exp => exp.id === searchId);

  if (index === -1) {
    res.sendStatus(404);

    return;
  }

  if (typeof userId !== 'number'
    || typeof spentAt !== 'string'
    || typeof title !== 'string'
    || typeof amount !== 'number'
    || typeof category !== 'string') {
    res.sendStatus(422);

    return;
  }

  const expense = expenses[index];

  Object.assign(expense, {
    userId, spentAt, title, amount, category, note,
  });
  res.send(expense);
}

function deleteExpense(req, res) {
  const { id } = req.params;
  const searchId = +id;

  const index = expenses.findIndex(exp => exp.id === searchId);

  if (index === -1) {
    res.sendStatus(404);

    return;
  }

  expenses.splice(index, 1);
  res.sendStatus(204);
}

module.exports = {
  deleteExpense,
  updateExpense,
  createExpense,
  getExpenseById,
  getExpenses,
};
