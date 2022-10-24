'use strict';

const express = require('express');

function createServer() {
  const app = express();

  const users = {};
  const expenses = {};

  let nextUserId = 1;
  let nextExpenseId = 1;

  app.use(express.json());

  app.post('/users', (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.status(400).send('Name is required');
    }

    const user = {
      id: nextUserId++,
      name,
    };

    users[user.id] = user;

    res.status(201).json(user);
  });

  app.get('/users/', (req, res) => {
    res.status(200).json(Object.values(users));
  });

  app.get('/users/:id', (req, res) => {
    const { id } = req.params;
    const user = users[id];

    if (!user) {
      return res.status(404).send('User not found');
    }

    res.status(200).json(user);
  });

  app.patch('/users/:id', (req, res) => {
    const { id } = req.params;
    const user = users[id];

    if (!user) {
      return res.status(404).send('User not found');
    }

    const { name } = req.body;

    if (!name) {
      return res.status(400).send('Name is required');
    }

    user.name = name;

    res.status(200).json(user);
  });

  app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    const user = users[id];

    if (!user) {
      return res.status(404).send('User not found');
    }

    delete users[id];

    res.status(204).send();
  });

  app.post('/expenses', (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (!userId) {
      return res.status(400).send('User ID is required');
    }

    if (!title) {
      return res.status(400).send('Title is required');
    }

    if (!amount) {
      return res.status(400).send('Amount is required');
    }

    if (!spentAt) {
      return res.status(400).send('Spent at is required');
    }

    if (!category) {
      return res.status(400).send('Category is required');
    }

    if (!note) {
      return res.status(400).send('Note is required');
    }

    if (!users[userId]) {
      return res.status(400).send('User not found');
    }

    const expense = {
      id: nextExpenseId++,
      userId,
      amount,
      spentAt,
      category,
      title,
      note,
    };

    expenses[expense.id] = expense;

    res.status(201).json(expense);
  });

  app.get('/expenses/:id', (req, res) => {
    const { id } = req.params;
    const expense = expenses[id];

    if (!expense) {
      return res.status(404).send('Expense not found');
    }

    res.status(200).json(expense);
  });

  app.get('/expenses', (req, res) => {
    const allExpenses = Object.values(expenses);
    const { userId, to, from, category } = req.query;

    let expensesToReturn = allExpenses;

    if (userId) {
      expensesToReturn = expensesToReturn
        .filter(expense => expense.userId === Number(userId));
    }

    if (to) {
      expensesToReturn = expensesToReturn
        .filter(expense => new Date(expense.spentAt) <= new Date(to));
    }

    if (from) {
      expensesToReturn = expensesToReturn
        .filter(expense => new Date(expense.spentAt) >= new Date(from));
    }

    if (category) {
      expensesToReturn = expensesToReturn
        .filter(expense => expense.category === category);
    }

    res.status(200).json(expensesToReturn);
  });

  app.get('/expenses', (req, res) => {
    res.status(200).json(Object.values(expenses));
  });

  /*
  app.get('/expenses/:id', (req, res) => {
    const { id } = req.params;
    const expense = expenses[id];

    if (!expense) {
      return res.status(404).send('Expense not found');
    }

    res.status(200).json(expense);
  });
  */

  app.patch('/expenses/:id', (req, res) => {
    const { id } = req.params;
    const expense = expenses[id];

    if (!expense) {
      return res.status(404).send('Expense not found');
    }

    const { spentAt, title, amount, category, note } = req.body;

    if (spentAt) {
      expense.spentAt = spentAt;
    }

    if (title) {
      expense.title = title;
    }

    if (amount) {
      expense.amount = amount;
    }

    if (category) {
      expense.category = category;
    }

    if (note) {
      expense.note = note;
    }

    res.status(200).json(expense);
  });

  app.delete('/expenses/:id', (req, res) => {
    const { id } = req.params;
    const expense = expenses[id];

    if (!expense) {
      return res.status(404).send('Expense not found');
    }

    delete expenses[id];

    res.status(204).send();
  });

  return app;
}

module.exports = {
  createServer,
};
