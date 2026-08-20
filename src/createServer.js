'use strict';

const express = require('express');

function isMissing(value) {
  return (
    value === undefined ||
    value === null ||
    (typeof value === 'string' && value.trim() === '')
  );
}

function createServer() {
  const app = express();
  const users = [];
  const expenses = [];
  let nextUserId = 1;
  let nextExpenseId = 1;

  app.use(express.json());

  app.post('/users', (req, res) => {
    const { name } = req.body;

    if (isMissing(name)) {
      res.status(400).json({ message: 'Name is required' });

      return;
    }

    const user = {
      id: nextUserId,
      name,
    };

    nextUserId += 1;
    users.push(user);

    res.status(201).json(user);
  });

  app.get('/users', (req, res) => {
    res.json(users);
  });

  app.get('/users/:id', (req, res) => {
    const user = users.find(({ id }) => id === Number(req.params.id));

    if (!user) {
      res.status(404).json({ message: 'User not found' });

      return;
    }

    res.json(user);
  });

  app.patch('/users/:id', (req, res) => {
    const user = users.find(({ id }) => id === Number(req.params.id));

    if (!user) {
      res.status(404).json({ message: 'User not found' });

      return;
    }

    const { name } = req.body;

    if (isMissing(name)) {
      res.status(400).json({ message: 'Name is required' });

      return;
    }

    user.name = name;

    res.json(user);
  });

  app.delete('/users/:id', (req, res) => {
    const userIndex = users.findIndex(({ id }) => id === Number(req.params.id));

    if (userIndex === -1) {
      res.status(404).json({ message: 'User not found' });

      return;
    }

    users.splice(userIndex, 1);

    res.status(204).send();
  });

  app.post('/expenses', (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;
    const requiredFields = [userId, spentAt, title, amount];

    if (requiredFields.some(isMissing)) {
      res.status(400).json({ message: 'Required expense data is missing' });

      return;
    }

    const userExists = users.some(({ id }) => id === Number(userId));

    if (!userExists) {
      res.status(400).json({ message: 'User not found' });

      return;
    }

    const expense = {
      id: nextExpenseId,
      userId,
      spentAt,
      title,
      amount,
    };

    if (category !== undefined) {
      expense.category = category;
    }

    if (note !== undefined) {
      expense.note = note;
    }

    nextExpenseId += 1;
    expenses.push(expense);

    res.status(201).json(expense);
  });

  app.get('/expenses', (req, res) => {
    const { userId, from, to, categories } = req.query;
    const categoryList = categories ? String(categories).split(',') : null;

    const filteredExpenses = expenses.filter((expense) => {
      if (userId !== undefined && expense.userId !== Number(userId)) {
        return false;
      }

      if (from !== undefined && new Date(expense.spentAt) < new Date(from)) {
        return false;
      }

      if (to !== undefined && new Date(expense.spentAt) > new Date(to)) {
        return false;
      }

      if (categoryList && !categoryList.includes(expense.category)) {
        return false;
      }

      return true;
    });

    res.json(filteredExpenses);
  });

  app.get('/expenses/:id', (req, res) => {
    const expense = expenses.find(({ id }) => id === Number(req.params.id));

    if (!expense) {
      res.status(404).json({ message: 'Expense not found' });

      return;
    }

    res.json(expense);
  });

  app.patch('/expenses/:id', (req, res) => {
    const expense = expenses.find(({ id }) => id === Number(req.params.id));

    if (!expense) {
      res.status(404).json({ message: 'Expense not found' });

      return;
    }

    const allowedFields = [
      'userId',
      'spentAt',
      'title',
      'amount',
      'category',
      'note',
    ];

    if (
      req.body.userId !== undefined &&
      !users.some(({ id }) => id === Number(req.body.userId))
    ) {
      res.status(400).json({ message: 'User not found' });

      return;
    }

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        expense[field] = req.body[field];
      }
    });

    res.json(expense);
  });

  app.delete('/expenses/:id', (req, res) => {
    const expenseIndex = expenses.findIndex(
      ({ id }) => id === Number(req.params.id),
    );

    if (expenseIndex === -1) {
      res.status(404).json({ message: 'Expense not found' });

      return;
    }

    expenses.splice(expenseIndex, 1);

    res.status(204).send();
  });

  return app;
}

module.exports = {
  createServer,
};
