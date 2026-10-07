'use strict';

const express = require('express');

function createServer() {
  const app = express();

  app.use(express.json());

  // ---------- In-memory storage (resets per createServer call) ----------
  const users = [];
  const expenses = [];
  let nextUserId = 1;
  let nextExpenseId = 1;

  const findUserIndex = (id) => users.findIndex((u) => u.id === Number(id));
  const findExpenseIndex = (id) =>
    expenses.findIndex((e) => e.id === Number(id));

  const notFound = (res, message) => res.status(404).json({ message });
  const badRequest = (res, message) => res.status(400).json({ message });

  // ============================ USERS ============================

  // GET /users
  app.get('/users', (req, res) => {
    res.json(users);
  });

  // POST /users
  app.post('/users', (req, res) => {
    const { name } = req.body || {};

    if (name === undefined) {
      return badRequest(res, 'name is required');
    }

    const user = { id: nextUserId++, name };

    users.push(user);
    res.status(201).json(user);
  });

  // GET /users/:userId
  app.get('/users/:userId', (req, res) => {
    const index = findUserIndex(req.params.userId);

    if (index === -1) {
      return notFound(res, 'User not found');
    }
    res.json(users[index]);
  });

  // PUT /users/:userId  (full replace)
  app.put('/users/:userId', (req, res) => {
    const index = findUserIndex(req.params.userId);

    if (index === -1) {
      return notFound(res, 'User not found');
    }

    const { name } = req.body || {};

    if (name === undefined) {
      return badRequest(res, 'name is required');
    }

    users[index] = { id: users[index].id, name };
    res.json(users[index]);
  });

  // PATCH /users/:userId
  app.patch('/users/:userId', (req, res) => {
    const index = findUserIndex(req.params.userId);

    if (index === -1) {
      return notFound(res, 'User not found');
    }

    const { name } = req.body || {};

    if (name !== undefined) {
      users[index].name = name;
    }

    res.json(users[index]);
  });

  // DELETE /users/:userId
  app.delete('/users/:userId', (req, res) => {
    const index = findUserIndex(req.params.userId);

    if (index === -1) {
      return notFound(res, 'User not found');
    }

    users.splice(index, 1);
    res.status(204).end();
  });

  // ========================== EXPENSES ==========================

  // GET /expenses ? userId & from & to & categories
  app.get('/expenses', (req, res) => {
    let result = expenses.slice();

    const { userId, from, to, categories } = req.query;

    if (userId !== undefined) {
      result = result.filter((e) => e.userId === Number(userId));
    }

    if (from !== undefined) {
      const fromTime = new Date(from).getTime();

      result = result.filter((e) => new Date(e.spentAt).getTime() >= fromTime);
    }

    if (to !== undefined) {
      const toTime = new Date(to).getTime();

      result = result.filter((e) => new Date(e.spentAt).getTime() <= toTime);
    }

    if (categories !== undefined) {
      const list = Array.isArray(categories)
        ? categories
        : String(categories).split(',');

      result = result.filter((e) => list.includes(e.category));
    }

    res.json(result);
  });

  // POST /expenses
  app.post('/expenses', (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body || {};

    if (
      userId === undefined ||
      spentAt === undefined ||
      title === undefined ||
      amount === undefined ||
      category === undefined
    ) {
      return badRequest(res, 'Missing required expense fields');
    }

    // Per tests: unknown user here → 400 (not 404)
    if (findUserIndex(userId) === -1) {
      return badRequest(res, 'User not found');
    }

    const expense = {
      id: nextExpenseId++,
      userId: Number(userId),
      spentAt,
      title,
      amount,
      category,
      note,
    };

    expenses.push(expense);
    res.status(201).json(expense);
  });

  // GET /expenses/:expenseId
  app.get('/expenses/:expenseId', (req, res) => {
    const index = findExpenseIndex(req.params.expenseId);

    if (index === -1) {
      return notFound(res, 'Expense not found');
    }
    res.json(expenses[index]);
  });

  // PATCH /expenses/:expenseId
  app.patch('/expenses/:expenseId', (req, res) => {
    const index = findExpenseIndex(req.params.expenseId);

    if (index === -1) {
      return notFound(res, 'Expense not found');
    }

    const patch = req.body || {};
    const expense = expenses[index];

    if (patch.userId !== undefined) {
      if (findUserIndex(patch.userId) === -1) {
        return badRequest(res, 'User not found');
      }
      expense.userId = Number(patch.userId);
    }

    ['spentAt', 'title', 'amount', 'category', 'note'].forEach((key) => {
      if (patch[key] !== undefined) {
        expense[key] = patch[key];
      }
    });

    res.json(expense);
  });

  // DELETE /expenses/:expenseId
  app.delete('/expenses/:expenseId', (req, res) => {
    const index = findExpenseIndex(req.params.expenseId);

    if (index === -1) {
      return notFound(res, 'Expense not found');
    }

    expenses.splice(index, 1);
    res.status(204).end();
  });

  return app;
}

module.exports = {
  createServer,
};
