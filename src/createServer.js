'use strict';

const express = require('express');

function createServer() {
  const app = express();

  app.use(express.json());

  const users = [];
  const expenses = [];
  let userIdCounter = 1;
  let expenseIdCounter = 1;

  app.get('/users', (req, res) => {
    res.status(200).json(users);
  });

  app.get('/users/:id', (req, res) => {
    const { id } = req.params;
    const user = users.find((u) => u.id === Number(id));

    if (!user) {
      res.status(404).send('User not found');

      return;
    }

    res.status(200).json(user);
  });

  app.post('/users', (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.status(400).send('Name is required');

      return;
    }

    const newUser = {
      id: userIdCounter++,
      name,
    };

    users.push(newUser);
    res.status(201).json(newUser);
  });

  app.patch('/users/:id', (req, res) => {
    const { id } = req.params;
    const user = users.find((u) => u.id === Number(id));

    if (!user) {
      res.status(404).send('User not found');

      return;
    }

    const { name } = req.body;

    if (name) {
      user.name = name;
    }

    res.status(200).json(user);
  });

  app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    const userIndex = users.findIndex((u) => u.id === Number(id));

    if (userIndex === -1) {
      res.status(404).send('User not found');

      return;
    }

    users.splice(userIndex, 1);
    res.status(204).send();
  });

  app.get('/expenses', (req, res) => {
    const { userId, categories, from, to } = req.query;

    let result = expenses;

    if (userId) {
      result = result.filter((e) => e.userId === Number(userId));
    }

    if (categories) {
      const categoryList = Array.isArray(categories)
        ? categories
        : [categories];

      result = result.filter((e) => categoryList.includes(e.category));
    }

    if (from) {
      result = result.filter((e) => new Date(e.spentAt) >= new Date(from));
    }

    if (to) {
      result = result.filter((e) => new Date(e.spentAt) <= new Date(to));
    }

    res.status(200).json(result);
  });

  app.get('/expenses/:id', (req, res) => {
    const { id } = req.params;
    const expense = expenses.find((e) => e.id === Number(id));

    if (!expense) {
      res.status(404).send('User not found');

      return;
    }

    res.status(200).json(expense);
  });

  app.post('/expenses', (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    const NumberUserId = Number(userId);

    const sameUser = users.find((u) => u.id === NumberUserId);

    if (!sameUser) {
      res.status(404).send('User is already exist');

      return;
    }

    if (!userId || !spentAt || !title || !amount || !category) {
      res.status(400).send('Missing required fields');

      return;
    }

    const newExpense = {
      id: expenseIdCounter++,
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    };

    expenses.push(newExpense);
    res.status(201).json(newExpense);
  });

  app.patch('/expenses/:id', (req, res) => {
    const { id } = req.params;
    const expense = expenses.find((e) => e.id === Number(id));

    if (!expense) {
      res.status(404).send('Expense not found');

      return;
    }

    const { spentAt, title, amount, category, note } = req.body;

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

    res.status(200).json(expense);
  });

  app.delete('/expenses/:id', (req, res) => {
    const { id } = req.params;
    const expenseIndex = expenses.findIndex((e) => e.id === Number(id));

    if (expenseIndex === -1) {
      res.status(404).send('Expense not found');

      return;
    }

    expenses.splice(expenseIndex, 1);
    res.status(204).send();
  });

  return app;
}

module.exports = { createServer };
