'use strict';

const express = require('express');

const createServer = () => {
  const app = express();

  app.use(express.json());

  const users = [];
  const expenses = [];

  app.get('/users', (req, res) => {
    return res.status(200).json(users);
  });

  app.post('/users', (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.status(400)
        .json({
          message: 'Missing parameter: name',
        });
    }

    const user = {
      id: users.length + 1, name,
    };

    users.push(user);

    return res.status(201).json(user);
  });

  app.get('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);

    const userToGet = users.find((user) => user.id === userId);

    if (!userToGet) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(userToGet);
  });

  app.delete('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);

    const index = users.findIndex((user) => user.id === userId);

    if (index === -1) {
      return res.status(404).json({ message: 'User not found' });
    }

    users.splice(index, 1);

    return res.status(204).send();
  });

  app.get('/expenses', (req, res) => {
    return res.status(200).json(expenses);
  });

  app.post('/expenses', (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (!userId || !spentAt || !title || !amount || !category) {
      return res.status(400).json({ message: 'Missing required parameters' });
    }

    const expense = {
      id: expenses.length + 1,
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    };

    expenses.push(expense);

    return res.status(201).json(expense);
  });

  app.get('/expenses/:id', (req, res) => {
    const expenseId = parseInt(req.params.id);

    const expense2 = expenses.find((expense) => expense.id === expenseId);

    if (!expense2) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    return res.status(200).json(expense2);
  });

  app.delete('/expenses/:id', (req, res) => {
    const expenseId = parseInt(req.params.id);

    const index = expenses.findIndex((expense) => expense.id === expenseId);

    if (index === -1) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    expenses.splice(index, 1);

    return res.status(204).send();
  });

  return app;
};

module.exports = {
  createServer,
};
