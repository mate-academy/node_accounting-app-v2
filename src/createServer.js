'use strict';

const express = require('express');

function createServer() {
  const app = express();

  app.use(express.json());

  const users = [];
  const expenses = [];

  let currentUserId = 1;
  let currentExpenseId = 1;

  function parseId(idParam, res) {
    const id = Number(idParam);

    if (!Number.isInteger(id) || id <= 0) {
      res.status(400).json({ message: 'Invalid id' });

      return null;
    }

    return id;
  }

  app.get('/users', (req, res) => {
    res.status(200).json(users);
  });

  app.get('/users/:id', (req, res) => {
    const id = parseId(req.params.id, res);

    if (id === null) {
      return;
    }

    const user = users.find((u) => u.id === id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  });

  app.post('/users', (req, res) => {
    const { name } = req.body;

    if (name == null || typeof name !== 'string' || name.trim() === '') {
      return res
        .status(400)
        .json({ message: 'Name is required and must be a string' });
    }

    const newUser = {
      id: currentUserId++,
      name,
    };

    users.push(newUser);
    res.status(201).json(newUser);
  });

  app.patch('/users/:id', (req, res) => {
    const id = parseId(req.params.id, res);

    if (id === null) {
      return;
    }

    const user = users.find((u) => u.id === id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { name } = req.body;

    if (name !== undefined) {
      if (typeof name !== 'string' || name.trim() === '') {
        return res.status(400).json({ message: 'Invalid name format' });
      }
      user.name = name;
    }

    res.status(200).json(user);
  });

  app.delete('/users/:id', (req, res) => {
    const id = parseId(req.params.id, res);

    if (id === null) {
      return;
    }

    const userIndex = users.findIndex((u) => u.id === id);

    if (userIndex === -1) {
      return res.status(404).json({ message: 'User not found' });
    }

    users.splice(userIndex, 1);

    res.sendStatus(204);
  });

  app.get('/expenses', (req, res) => {
    let filteredExpenses = [...expenses];
    const { userId, category, categories, from, to } = req.query;

    if (userId !== undefined && isNaN(Number(userId))) {
      return res.status(400).json({ message: 'Invalid userId format' });
    }

    if (userId) {
      filteredExpenses = filteredExpenses.filter((e) => {
        return e.userId === Number(userId);
      });
    }

    const categoryParam = category || categories;

    if (categoryParam) {
      const categoriesArray = Array.isArray(categoryParam)
        ? categoryParam
        : categoryParam.split(',');

      filteredExpenses = filteredExpenses.filter((e) => {
        return categoriesArray.includes(e.category);
      });
    }

    if (from) {
      filteredExpenses = filteredExpenses.filter((e) => {
        return new Date(e.spentAt) >= new Date(from);
      });
    }

    if (to) {
      filteredExpenses = filteredExpenses.filter((e) => {
        return new Date(e.spentAt) <= new Date(to);
      });
    }

    res.status(200).json(filteredExpenses);
  });

  app.get('/expenses/:id', (req, res) => {
    const id = parseId(req.params.id, res);

    if (id === null) {
      return;
    }

    const expense = expenses.find((e) => e.id === id);

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    res.status(200).json(expense);
  });

  app.post('/expenses', (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (
      userId == null ||
      typeof userId !== 'number' ||
      spentAt == null ||
      typeof spentAt !== 'string' ||
      title == null ||
      typeof title !== 'string' ||
      amount == null ||
      typeof amount !== 'number' ||
      category == null ||
      typeof category !== 'string'
    ) {
      return res
        .status(400)
        .json({ message: 'Bad request: Missing or malformed required fields' });
    }

    const userExists = users.some((u) => u.id === userId);

    if (!userExists) {
      return res.status(400).json({ message: 'User not found' });
    }

    const newExpense = {
      id: currentExpenseId++,
      userId,
      spentAt,
      title,
      amount,
      category,
      note: note || undefined,
    };

    expenses.push(newExpense);
    res.status(201).json(newExpense);
  });

  app.patch('/expenses/:id', (req, res) => {
    const id = parseId(req.params.id, res);

    if (id === null) {
      return;
    }

    const expense = expenses.find((e) => e.id === id);

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    const { userId, spentAt, title, amount, category, note } = req.body;

    if (userId !== undefined) {
      if (typeof userId !== 'number') {
        return res.status(400).json({ message: 'Invalid type' });
      }
      expense.userId = userId;
    }

    if (spentAt !== undefined) {
      if (typeof spentAt !== 'string') {
        return res.status(400).json({ message: 'Invalid type' });
      }
      expense.spentAt = spentAt;
    }

    if (title !== undefined) {
      if (typeof title !== 'string') {
        return res.status(400).json({ message: 'Invalid type' });
      }
      expense.title = title;
    }

    if (amount !== undefined) {
      if (typeof amount !== 'number') {
        return res.status(400).json({ message: 'Invalid type' });
      }
      expense.amount = amount;
    }

    if (category !== undefined) {
      if (typeof category !== 'string') {
        return res.status(400).json({ message: 'Invalid type' });
      }
      expense.category = category;
    }

    if (note !== undefined) {
      expense.note = note;
    }

    res.status(200).json(expense);
  });

  app.delete('/expenses/:id', (req, res) => {
    const id = parseId(req.params.id, res);

    if (id === null) {
      return;
    }

    const expenseIndex = expenses.findIndex((e) => e.id === id);

    if (expenseIndex === -1) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    expenses.splice(expenseIndex, 1);

    res.sendStatus(204);
  });

  return app;
}

module.exports = { createServer };
