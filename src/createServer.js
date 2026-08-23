'use strict';

const express = require('express');
const cors = require('cors');

function createServer() {
  const app = express();
  const users = [];
  const expenses = [];
  let nextUserId = 1;
  let nextExpenseId = 1;

  app.use(cors());
  app.use(express.json());

  app.get('/users', (req, res) => {
    res.json(users);
  });

  app.post('/users', (req, res) => {
    const { name } = req.body || {};

    if (name === undefined) {
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

    const { name } = req.body || {};

    if (name === undefined) {
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

  app.get('/expenses', (req, res) => {
    const { userId, categories, from, to } = req.query;
    const requestedCategories = Array.isArray(categories)
      ? categories
      : categories === undefined
        ? []
        : [categories];

    const filteredExpenses = expenses.filter((expense) => {
      if (userId !== undefined && expense.userId !== Number(userId)) {
        return false;
      }

      if (
        requestedCategories.length > 0 &&
        !requestedCategories.includes(expense.category)
      ) {
        return false;
      }

      const spentAt = Date.parse(expense.spentAt);

      if (from !== undefined && spentAt < Date.parse(from)) {
        return false;
      }

      if (to !== undefined && spentAt > Date.parse(to)) {
        return false;
      }

      return true;
    });

    res.json(filteredExpenses);
  });

  app.post('/expenses', (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body || {};
    const requiredFields = [userId, spentAt, title, amount, category];

    if (requiredFields.some((field) => field === undefined)) {
      res.status(400).json({ message: 'Required expense field is missing' });

      return;
    }

    if (!users.some(({ id }) => id === userId)) {
      res.status(400).json({ message: 'User not found' });

      return;
    }

    const expense = {
      id: nextExpenseId,
      userId,
      spentAt,
      title,
      amount,
      category,
    };

    if (note !== undefined) {
      expense.note = note;
    }

    nextExpenseId += 1;
    expenses.push(expense);

    res.status(201).json(expense);
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

    const allowedFields = ['spentAt', 'title', 'amount', 'category', 'note'];

    allowedFields.forEach((field) => {
      if (req.body && req.body[field] !== undefined) {
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
