'use strict';

const express = require('express');

function createServer() {
  const app = express();

  app.use(express.json());

  let users = [];
  let expenses = [];
  let nextUserId = 1;
  let nextExpenseId = 1;

  app.get('/users', (req, res) => {
    res.json(users);
  });

  app.post('/users', (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Name is required' });
    }

    const newUser = {
      id: nextUserId++,
      name,
    };

    users.push(newUser);
    res.status(201).json(newUser);
  });

  app.get('/users/:id', (req, res) => {
    const id = +req.params.id;

    if (Number.isNaN(id)) {
      return res.status(400).json({ message: 'Invalid ID' });
    }

    const user = users.find((u) => u.id === id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  });

  app.delete('/users/:id', (req, res) => {
    const id = +req.params.id;

    if (Number.isNaN(id)) {
      return res.status(400).json({ message: 'Invalid ID' });
    }

    const user = users.find((u) => u.id === id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    users = users.filter((u) => u.id !== id);
    res.sendStatus(204);
  });

  app.patch('/users/:id', (req, res) => {
    const id = +req.params.id;

    if (Number.isNaN(id)) {
      return res.status(400).json({ message: 'Invalid ID' });
    }

    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Bad request' });
    }

    const user = users.find((u) => u.id === id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.name = name;
    res.status(200).json(user);
  });

  app.post('/expenses', (req, res) => {
    const { userId, title, amount, category, note, spentAt } = req.body;

    if (
      !userId ||
      !title ||
      amount === undefined ||
      !category ||
      !note ||
      !spentAt
    ) {
      return res.status(400).json({ message: 'Bad Request' });
    }

    const user = users.find((u) => u.id === userId);

    if (!user) {
      return res.status(400).json({ message: 'Bad Request' });
    }

    const newExpenses = {
      id: nextExpenseId++,
      userId,
      title,
      amount,
      category,
      note,
      spentAt: spentAt || new Date().toISOString(),
    };

    expenses.push(newExpenses);
    res.status(201).json(newExpenses);
  });

  app.get('/expenses', (req, res) => {
    const { userId, categories, from, to } = req.query;

    let filteredExpenses = [...expenses];

    if (userId) {
      filteredExpenses = filteredExpenses.filter((e) => e.userId === +userId);
    }

    if (categories) {
      const categoriesList = Array.isArray(categories)
        ? categories
        : [categories];

      filteredExpenses = filteredExpenses.filter((e) => {
        return categoriesList.includes(e.category);
      });
    }

    if (from) {
      filteredExpenses = filteredExpenses.filter(
        (e) => new Date(e.spentAt) >= new Date(from),
      );
    }

    if (to) {
      filteredExpenses = filteredExpenses.filter(
        (e) => new Date(e.spentAt) <= new Date(to),
      );
    }

    res.json(filteredExpenses);
  });

  app.get('/expenses/:id', (req, res) => {
    const id = +req.params.id;

    if (Number.isNaN(id)) {
      return res.status(400).json({ message: 'Invalid ID' });
    }

    const expens = expenses.find((exp) => exp.id === id);

    if (!expens) {
      return res.status(404).json({ message: 'Expens not found' });
    }

    res.json(expens);
  });

  app.delete('/expenses/:id', (req, res) => {
    const id = +req.params.id;

    if (Number.isNaN(id)) {
      return res.status(400).json({ message: 'Invalid ID' });
    }

    const expens = expenses.find((exp) => exp.id === id);

    if (!expens) {
      return res.status(404).json({ message: 'Expens not found' });
    }

    expenses = expenses.filter((exp) => exp.id !== id);
    res.sendStatus(204);
  });

  app.patch('/expenses/:id', (req, res) => {
    const id = +req.params.id;

    if (Number.isNaN(id)) {
      return res.status(400).json({ message: 'Invalid ID' });
    }

    const expens = expenses.find((exp) => exp.id === id);

    if (!expens) {
      return res.status(404).json({ message: 'Expens not found' });
    }

    const { title, amount, category, note, spentAt } = req.body;

    if (title !== undefined) {
      expens.title = title;
    }

    if (amount !== undefined) {
      expens.amount = amount;
    }

    if (category !== undefined) {
      expens.category = category;
    }

    if (note !== undefined) {
      expens.note = note;
    }

    if (spentAt !== undefined) {
      expens.spentAt = spentAt;
    }

    res.status(200).json(expens);
  });

  return app;
}

module.exports = {
  createServer,
};
