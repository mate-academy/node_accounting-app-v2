'use strict';

const express = require('express');

function createServer() {
  const app = express();

  app.use(express.json());

  let users = [];
  let expenses = [];
  let userIdCounter = 0;
  let expensesCount = 0;

  // #region users

  app.get('/users', (req, res) => {
    return res.status(200).json(users);
  });

  app.post('/users', (req, res) => {
    const name = req.body.name;

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const newUser = { id: ++userIdCounter, name };

    users.push(newUser);

    return res.status(201).json(newUser);
  });

  app.get('/users/:id', (req, res) => {
    const userId = Number(req.params.id);

    if (!req.params.id || Number.isNaN(userId)) {
      return res.status(400).json({ error: 'Invalid id' });
    }

    const user = users.find((u) => u.id === userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json(user);
  });

  app.delete('/users/:id', (req, res) => {
    const userId = Number(req.params.id);

    if (!req.params.id || Number.isNaN(userId)) {
      return res.status(400).json({ error: 'Invalid id' });
    }

    const userExists = users.some((u) => u.id === userId);

    if (!userExists) {
      return res.status(404).json({ error: 'User not found' });
    }

    users = users.filter((user) => user.id !== userId);

    return res.status(204).end();
  });

  app.patch('/users/:id', (req, res) => {
    const userId = Number(req.params.id);

    if (!req.params.id || Number.isNaN(userId)) {
      return res.status(400).json({ error: 'Invalid id' });
    }

    const newName = req.body.name;
    const user = users.find((u) => u.id === userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (!newName) {
      return res.status(400).json({ error: 'Name is required' });
    }

    user.name = newName;

    return res.status(200).json(user);
  });

  // #endregion

  // #region expenses

  app.get('/expenses', (req, res) => {
    let result = expenses;

    if (req.query.userId) {
      result = result.filter((e) => e.userId === Number(req.query.userId));
    }

    if (req.query.categories) {
      const targetCategories = [].concat(req.query.categories);

      result = result.filter((e) => targetCategories.includes(e.category));
    }

    const startParam = req.query.startDate || req.query.from;
    const endParam = req.query.endDate || req.query.to;

    if (startParam) {
      const startTime = new Date(startParam).getTime();

      result = result.filter((e) => new Date(e.spentAt).getTime() >= startTime);
    }

    if (endParam) {
      const endTime = new Date(endParam).getTime();

      result = result.filter((e) => new Date(e.spentAt).getTime() <= endTime);
    }

    return res.status(200).json(result);
  });

  app.post('/expenses', (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (!userId || !title || amount === undefined || !category || !spentAt) {
      return res.status(400).json({ error: 'Required fields are missing' });
    }

    const userExists = users.some((u) => u.id === Number(userId));

    if (!userExists) {
      return res.status(400).json({ error: 'User not found' });
    }

    const newExpense = {
      id: ++expensesCount,
      userId: Number(userId),
      spentAt,
      title,
      amount: Number(amount),
      category,
      note: note || '',
    };

    expenses.push(newExpense);

    return res.status(201).json(newExpense);
  });

  app.get('/expenses/:id', (req, res) => {
    const idExpenses = Number(req.params.id);

    if (!req.params.id || Number.isNaN(idExpenses)) {
      return res.status(400).json({ error: 'Invalid id' });
    }

    const expense = expenses.find((e) => e.id === idExpenses);

    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    return res.status(200).json(expense);
  });

  app.delete('/expenses/:id', (req, res) => {
    const idExpenses = Number(req.params.id);

    if (!req.params.id || Number.isNaN(idExpenses)) {
      return res.status(400).json({ error: 'Invalid id' });
    }

    const expenseExists = expenses.some((e) => e.id === idExpenses);

    if (!expenseExists) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    expenses = expenses.filter((e) => e.id !== idExpenses);

    return res.status(204).end();
  });

  app.patch('/expenses/:id', (req, res) => {
    const idExpenses = Number(req.params.id);

    if (!req.params.id || Number.isNaN(idExpenses)) {
      return res.status(400).json({ error: 'Invalid id' });
    }

    const expense = expenses.find((e) => e.id === idExpenses);

    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    Object.assign(expense, req.body);

    if (req.body.id) {
      expense.id = Number(req.body.id);
    }

    if (req.body.userId) {
      expense.userId = Number(req.body.userId);
    }

    if (req.body.amount) {
      expense.amount = Number(req.body.amount);
    }

    return res.status(200).json(expense);
  });

  // #endregion

  return app;
}

module.exports = {
  createServer,
};
