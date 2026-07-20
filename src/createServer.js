'use strict';

const express = require('express');
const cors = require('cors');

function isBlank(value) {
  return value === undefined || value === null || value === '';
}

function createServer() {
  const app = express();

  // ---- in-memory "database" (fresh every time createServer is called) ----
  const users = [];
  const expenses = [];

  let nextUserId = 1;
  let nextExpenseId = 1;

  app.use(cors());
  app.use(express.json());

  // ============================= USERS =============================

  // GET /users
  app.get('/users', (req, res) => {
    res.json(users);
  });

  // GET /users/:id
  app.get('/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const user = users.find((u) => u.id === id);

    if (!user) {
      res.status(404).send('User not found');

      return;
    }

    res.json(user);
  });

  // POST /users
  app.post('/users', (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.status(400).send('Name is required');

      return;
    }

    const newUser = {
      id: nextUserId++,
      name,
    };

    users.push(newUser);

    res.status(201).json(newUser);
  });

  // PATCH /users/:id
  app.patch('/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const user = users.find((u) => u.id === id);

    if (!user) {
      res.status(404).send('User not found');

      return;
    }

    const { name } = req.body;

    if (name !== undefined) {
      user.name = name;
    }

    res.json(user);
  });

  // DELETE /users/:id
  app.delete('/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = users.findIndex((u) => u.id === id);

    if (index === -1) {
      res.status(404).send('User not found');

      return;
    }

    users.splice(index, 1);

    res.status(204).end();
  });

  // ============================ EXPENSES ============================

  // GET /expenses?userId=&categories=&from=&to=
  app.get('/expenses', (req, res) => {
    const { userId, categories, from, to } = req.query;

    let result = [...expenses];

    if (!isBlank(userId)) {
      const parsedUserId = Number(userId);

      result = result.filter((expense) => expense.userId === parsedUserId);
    }

    if (!isBlank(categories)) {
      const categoryList = categories.split(',').map((c) => c.trim());
      const matchesCategory = (expense) =>
        categoryList.includes(expense.category);

      result = result.filter(matchesCategory);
    }

    if (!isBlank(from)) {
      const fromDate = new Date(from);

      result = result.filter(
        (expense) => new Date(expense.spentAt) >= fromDate,
      );
    }

    if (!isBlank(to)) {
      const toDate = new Date(to);

      result = result.filter((expense) => new Date(expense.spentAt) <= toDate);
    }

    res.json(result);
  });

  // GET /expenses/:id
  app.get('/expenses/:id', (req, res) => {
    const id = Number(req.params.id);
    const expense = expenses.find((e) => e.id === id);

    if (!expense) {
      res.status(404).send('Expense not found');

      return;
    }

    res.json(expense);
  });

  // POST /expenses
  app.post('/expenses', (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (
      isBlank(userId) ||
      isBlank(spentAt) ||
      isBlank(title) ||
      isBlank(amount) ||
      isBlank(category)
    ) {
      res.status(400).send('Missing required expense fields');

      return;
    }

    const parsedUserId = Number(userId);
    const user = users.find((u) => u.id === parsedUserId);

    if (!user) {
      res.status(400).send('User not found');

      return;
    }

    const newExpense = {
      id: nextExpenseId++,
      userId: parsedUserId,
      spentAt,
      title,
      amount,
      category,
      note: note === undefined ? '' : note,
    };

    expenses.push(newExpense);

    res.status(201).json(newExpense);
  });

  // PATCH /expenses/:id
  app.patch('/expenses/:id', (req, res) => {
    const id = Number(req.params.id);
    const expense = expenses.find((e) => e.id === id);

    if (!expense) {
      res.status(404).send('Expense not found');

      return;
    }

    const { userId, spentAt, title, amount, category, note } = req.body;

    if (userId !== undefined) {
      const parsedUserId = Number(userId);
      const user = users.find((u) => u.id === parsedUserId);

      if (!user) {
        res.status(400).send('User not found');

        return;
      }

      expense.userId = parsedUserId;
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

    res.json(expense);
  });

  // DELETE /expenses/:id
  app.delete('/expenses/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = expenses.findIndex((e) => e.id === id);

    if (index === -1) {
      res.status(404).send('Expense not found');

      return;
    }

    expenses.splice(index, 1);

    res.status(204).end();
  });

  return app;
}

module.exports = {
  createServer,
};
