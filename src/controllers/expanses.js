'use strict';

const { findUser } = require('../services');
const { users } = require('./users');

const expenses = [];

function createExpense(req, res) {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!userId || !spentAt || !title || !amount || !category
    || !note || !findUser(userId, users)) {
    res.sendStatus(400);
  } else {
    const newExpense = {
      id: expenses.length + 1, userId, spentAt, title, amount, category, note,
    };

    expenses.push(newExpense);

    res.status(201).json(newExpense);
  }
}

function getExpenses(req, res) {
  const { userId, from, to, categories } = req.query;

  let filteredExpenses = [...expenses];

  if (userId) {
    filteredExpenses = filteredExpenses
      .filter(expense => expense.userId === parseInt(userId));
  }

  if (from && to) {
    const fromDate = new Date(from);
    const toDate = new Date(to);

    filteredExpenses = filteredExpenses.filter(expense => {
      const spentAt = new Date(expense.spentAt);

      return spentAt >= fromDate && spentAt <= toDate;
    });
  }

  if (categories) {
    const selectedCategories = categories.split(',');

    filteredExpenses = filteredExpenses
      .filter(expense => selectedCategories.includes(expense.category));
  }

  res.send(filteredExpenses);
}

function getExpense(req, res) {
  const expenseId = parseInt(req.params.id);
  const expense = expenses.find(expens => expens.id === expenseId);

  if (!expense) {
    return res.status(404).json({ error: 'Expense not found' });
  }
  res.json(expense);
}

function updateExpense(req, res) {
  const expenseId = parseInt(req.params.id);
  const { title } = req.body;
  const expenseIndex = expenses.findIndex(expense => expense.id === expenseId);

  if (expenseIndex === -1) {
    res.sendStatus(404);

    return;
  }

  if (!title) {
    res.sendStatus(400);

    return;
  }

  expenses[expenseIndex].title = title;
  res.send(expenses[expenseIndex]);
}

function deleteExpense(req, res) {
  const expenseId = parseInt(req.params.id);
  const expenseIndex = expenses.findIndex(expense => expense.id === expenseId);

  if (expenseIndex === -1) {
    return res.status(404).json({ error: 'Expense not found' });
  }

  expenses.splice(expenseIndex, 1);
  res.status(204).end();
}

module.exports = {
  createExpense,
  getExpenses,
  getExpense,
  updateExpense,
  deleteExpense,
  expenses,
};
