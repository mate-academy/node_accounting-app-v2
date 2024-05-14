'use strict';

const express = require('express');
const {
  findItemById,
  getId,
  getFilteredArray,
  getFilteredExpenses,
} = require('./services/helper.js');

function createServer() {
  const app = express();

  let users = [];

  let expenses = [];

  app.get('/users', (req, res) => {
    res.send(users);
  });

  app.get('/users/:id', (req, res) => {
    const { id } = req.params;
    const user = findItemById(users, id);

    if (!user) {
      res.statusCode = 404;
      res.send(res.statusCode);
    } else {
      res.statusCode = 200;
      res.send(user);
    }
  });

  app.post('/users', express.json(), (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.statusCode = 400;
      res.send(res.statusCode);

      return;
    }

    const user = {
      id: getId(users),
      name,
    };

    users.push(user);
    res.statusCode = 201;
    res.send(user);
  });

  app.delete('/users/:id', (req, res) => {
    const { id } = req.params;

    const newUsers = getFilteredArray(users, id);

    if (users.length === newUsers.length) {
      res.statusCode = 404;
      res.send(res.statusCode);
    } else {
      users = newUsers;
      res.statusCode = 204;
      res.send(res.statusCode);
    }
  });

  app.patch('/users/:id', express.json(), (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const user = findItemById(users, id);

    if (!user) {
      res.statusCode = 404;
      res.send('User not found');
    } else {
      user.name = name;
      res.send(user);
    }
  });

  app.get('/expenses', express.json(), (req, res) => {
    const filteredExpenses = getFilteredExpenses(expenses, req.query);

    res.send(filteredExpenses);
  });

  app.post('/expenses', express.json(), (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (!userId || !spentAt || !title || !amount || !category || !note) {
      res.statusCode = 400;
      res.send(res.statusCode);

      return;
    }

    if (!users.find((user) => String(user.id) === String(userId))) {
      res.statusCode = 400;
      res.send(res.statusCode);

      return;
    }

    const expense = {
      id: getId(expenses),
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
  });

  app.get('/expenses/:id', (req, res) => {
    const { id } = req.params;
    const expense = findItemById(expenses, id);

    if (!expense) {
      res.statusCode = 404;
      res.send(res.statusCode);
    } else {
      res.statusCode = 200;
      res.send(expense);
    }
  });

  app.delete('/expenses/:id', (req, res) => {
    const { id } = req.params;
    const newExpenses = getFilteredArray(expenses, id);

    if (expenses.length === newExpenses.length) {
      res.statusCode = 404;
      res.send('No content');
    } else {
      expenses = newExpenses;
      res.statusCode = 204;
      res.send('Expense deleted');
    }
  });

  app.patch('/expenses/:id', express.json(), (req, res) => {
    const { id } = req.params;
    const { spentAt, title, amount, category, note } = req.body;
    const expense = findItemById(expenses, id);

    if (!expense) {
      res.statusCode = 404;
      res.send('Expense not found');
    } else {
      expense.spentAt = spentAt || expense.spentAt;
      expense.title = title || expense.title;
      expense.amount = amount || expense.amount;
      expense.category = category || expense.category;
      expense.note = note || expense.note;
      res.send(expense);
    }
  });

  return app;
}

module.exports = {
  createServer,
};
