'use strict';

const express = require('express');
const cors = require('cors');

function createServer() {
  const app = express();

  // Keep data in memory for this server instance.
  const users = [];
  const expenses = [];

  let nextUserId = 1;
  let nextExpenseId = 1;

  app.use(cors());
  app.use(express.json());

  // USERS

  // Create a user.
  app.post('/users', (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Name is required' });
    }

    const user = {
      id: nextUserId++,
      name,
    };

    users.push(user);

    return res.status(201).json(user);
  });

  // Get all users.
  app.get('/users', (req, res) => {
    res.status(200).json(users);
  });

  // Get a user by ID.
  app.get('/users/:id', (req, res) => {
    const user = users.find((item) => item.id === Number(req.params.id));

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(user);
  });

  // Update a user.
  app.patch('/users/:id', (req, res) => {
    const user = users.find((item) => item.id === Number(req.params.id));

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Name is required' });
    }

    user.name = name;

    return res.status(200).json(user);
  });

  // Delete a user.
  app.delete('/users/:id', (req, res) => {
    const index = users.findIndex((item) => item.id === Number(req.params.id));

    if (index === -1) {
      return res.status(404).json({ message: 'User not found' });
    }

    users.splice(index, 1);

    return res.status(204).end();
  });

  // EXPENSES

  // Create an expense.
  app.post('/expenses', (req, res) => {
    const { spentAt, title, amount, userId, category, note } = req.body;

    if (
      !spentAt ||
      !title ||
      amount === undefined ||
      amount === null ||
      userId === undefined ||
      userId === null
    ) {
      return res.status(400).json({
        message: 'spentAt, title, amount and userId are required',
      });
    }

    const user = users.find((item) => item.id === Number(userId));

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const expense = {
      id: nextExpenseId++,
      userId: Number(userId),
      spentAt,
      title,
      amount,
      ...(category !== undefined && { category }),
      ...(note !== undefined && { note }),
    };

    expenses.push(expense);

    return res.status(201).json(expense);
  });

  // Get all expenses, with optional filters.
  app.get('/expenses', (req, res) => {
    let result = [...expenses];
    const { userId, from, to, categories } = req.query;

    if (userId !== undefined) {
      result = result.filter((expense) => expense.userId === Number(userId));
    }

    if (from) {
      result = result.filter(
        (expense) => new Date(expense.spentAt) >= new Date(from),
      );
    }

    if (to) {
      result = result.filter(
        (expense) => new Date(expense.spentAt) <= new Date(to),
      );
    }

    if (categories) {
      const categoryList = categories.split(',');

      result = result.filter((expense) => {
        return categoryList.includes(expense.category);
      });
    }

    return res.status(200).json(result);
  });

  // Get an expense by ID.
  app.get('/expenses/:id', (req, res) => {
    const expense = expenses.find((item) => item.id === Number(req.params.id));

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    return res.status(200).json(expense);
  });

  // Update an expense.
  app.patch('/expenses/:id', (req, res) => {
    const expense = expenses.find((item) => item.id === Number(req.params.id));

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    const { spentAt, title, amount, userId, category, note } = req.body;

    if (userId !== undefined) {
      const user = users.find((item) => item.id === Number(userId));

      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }

      expense.userId = Number(userId);
    }

    if (spentAt !== undefined) {
      expense.spentAt = spentAt;
    }

    if (title !== undefined) {
      expense.title = title;
    }

    if (amount !== undefined) {
      expense.amount = amount;
    }

    if (category !== undefined) {
      expense.category = category;
    }

    if (note !== undefined) {
      expense.note = note;
    }

    return res.status(200).json(expense);
  });

  // Delete an expense.
  app.delete('/expenses/:id', (req, res) => {
    const index = expenses.findIndex(
      (item) => item.id === Number(req.params.id),
    );

    if (index === -1) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    expenses.splice(index, 1);

    return res.status(204).end();
  });

  return app;
}

module.exports = {
  createServer,
};
