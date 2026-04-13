'use strict';

const express = require('express');

function createServer() {
  const app = express();

  const users = [];
  const expenses = [];
  let nextUserId = 1;
  let nextExpenseId = 1;

  app.use(express.json());

  // --- USERS ---

  app.get('/users', (req, res) => {
    res.json(users);
  });

  app.post('/users', (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.sendStatus(400);
    }

    const newUser = { id: nextUserId++, name };

    users.push(newUser);
    res.status(201).json(newUser);
  });

  app.get('/users/:id', (req, res) => {
    const user = users.find((u) => u.id === Number(req.params.id));

    if (!user) {
      return res.sendStatus(404);
    }

    res.json(user);
  });

  app.patch('/users/:id', (req, res) => {
    const user = users.find((u) => u.id === Number(req.params.id));

    if (!user) {
      return res.sendStatus(404);
    }

    const { name } = req.body;

    if (!name) {
      return res.sendStatus(400);
    }

    user.name = name;
    res.json(user);
  });

  app.delete('/users/:id', (req, res) => {
    const index = users.findIndex((u) => u.id === Number(req.params.id));

    if (index === -1) {
      return res.sendStatus(404);
    }

    users.splice(index, 1);
    res.sendStatus(204);
  });

  // --- EXPENSES ---

  app.get('/expenses', (req, res) => {
    const { userId, categories, category, from, to } = req.query;

    let result = [...expenses];

    if (userId) {
      result = result.filter((e) => e.userId === Number(userId));
    }

    const rawCategories = categories || category;

    if (rawCategories) {
      const categoryList = rawCategories.split(',').map((c) => c.trim());

      result = result.filter((e) => categoryList.includes(e.category));
    }

    if (from) {
      result = result.filter((e) => e.spentAt >= from);
    }

    if (to) {
      result = result.filter((e) => e.spentAt <= to);
    }

    res.json(result);
  });

  app.post('/expenses', (req, res) => {
    const { userId, amount, category, title, spentAt } = req.body;

    if (!userId || amount === undefined || !category || !title || !spentAt) {
      return res.sendStatus(400);
    }

    const userExists = users.some((u) => u.id === Number(userId));

    if (!userExists) {
      return res.sendStatus(400);
    }

    const newExpense = {
      id: nextExpenseId++,
      ...req.body,
      userId: Number(userId),
      amount: Number(amount),
    };

    expenses.push(newExpense);
    res.status(201).json(newExpense);
  });

  app.get('/expenses/:id', (req, res) => {
    const expense = expenses.find((e) => e.id === Number(req.params.id));

    if (!expense) {
      return res.sendStatus(404);
    }

    res.json(expense);
  });

  app.patch('/expenses/:id', (req, res) => {
    const expense = expenses.find((e) => e.id === Number(req.params.id));

    if (!expense) {
      return res.sendStatus(404);
    }

    if (req.body.userId !== undefined) {
      const userExists = users.some((u) => u.id === Number(req.body.userId));

      if (!userExists) {
        return res.sendStatus(400);
      }
    }

    Object.assign(expense, req.body);

    if (expense.userId) {
      expense.userId = Number(expense.userId);
    }

    if (expense.amount) {
      expense.amount = Number(expense.amount);
    }

    res.json(expense);
  });

  app.delete('/expenses/:id', (req, res) => {
    const index = expenses.findIndex((e) => e.id === Number(req.params.id));

    if (index === -1) {
      return res.sendStatus(404);
    }

    expenses.splice(index, 1);
    res.sendStatus(204);
  });

  return app;
}

module.exports = {
  createServer,
};
