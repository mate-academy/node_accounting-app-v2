const express = require('express');

function createServer() {
  const app = express();

  app.use(express.json());

  // Collections
  const users = [];
  const expenses = [];

  // ID counters
  let nextUserId = 1;
  let nextExpenseId = 1;

  // Helper: validate ID
  const isValidId = (id) => {
    return Number.isInteger(Number(id)) && Number(id) > 0;
  };

  // Helper: find entity
  const findById = (collection, id) => {
    return collection.find((item) => item.id === Number(id));
  };

  // =========================
  // USERS
  // =========================

  // GET /users
  app.get('/users', (req, res) => {
    res.status(200).json(users);
  });

  // POST /users
  app.post('/users', (req, res) => {
    const { name } = req.body || {};

    if (typeof name !== 'string') {
      return res.status(400).json({
        message: 'Name is required',
      });
    }

    const user = {
      id: nextUserId++,
      name,
    };

    users.push(user);

    res.status(201).json(user);
  });

  // GET /users/:id
  app.get('/users/:id', (req, res) => {
    const { id } = req.params;

    if (!isValidId(id)) {
      return res.status(400).json({
        message: 'Invalid user id',
      });
    }

    const user = findById(users, id);

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    res.status(200).json(user);
  });

  // PATCH /users/:id
  app.patch('/users/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body || {};

    if (!isValidId(id) || typeof name !== 'string') {
      return res.status(400).json({
        message: 'Invalid request',
      });
    }

    const user = findById(users, id);

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    user.name = name;

    res.status(200).json(user);
  });

  // DELETE /users/:id
  app.delete('/users/:id', (req, res) => {
    const { id } = req.params;

    if (!isValidId(id)) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    const index = users.findIndex((user) => user.id === Number(id));

    if (index === -1) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    users.splice(index, 1);

    res.status(204).send();
  });

  // =========================
  // EXPENSES
  // =========================

  // GET /expenses
  app.get('/expenses', (req, res) => {
    const { userId, categories, from, to } = req.query;

    let result = [...expenses];

    if (userId !== undefined) {
      if (!isValidId(userId)) {
        return res.status(400).json({
          message: 'Invalid userId',
        });
      }

      result = result.filter((expense) => expense.userId === Number(userId));
    }

    if (categories !== undefined) {
      const categoryList = Array.isArray(categories)
        ? categories
        : String(categories).split(',');

      result = result.filter((expense) => {
        return categoryList.includes(expense.category);
      });
    }

    if (from !== undefined) {
      const fromDate = Date.parse(from);

      if (Number.isNaN(fromDate)) {
        return res.status(400).json({
          message: 'Invalid from date',
        });
      }

      result = result.filter(
        (expense) => Date.parse(expense.spentAt) >= fromDate,
      );
    }

    if (to !== undefined) {
      const toDate = Date.parse(to);

      if (Number.isNaN(toDate)) {
        return res.status(400).json({
          message: 'Invalid to date',
        });
      }

      result = result.filter(
        (expense) => Date.parse(expense.spentAt) <= toDate,
      );
    }

    res.status(200).json(result);
  });

  // POST /expenses
  app.post('/expenses', (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body || {};

    if (
      !Number.isInteger(userId) ||
      typeof spentAt !== 'string' ||
      Number.isNaN(Date.parse(spentAt)) ||
      typeof title !== 'string' ||
      !Number.isInteger(amount) ||
      typeof category !== 'string'
    ) {
      return res.status(400).json({
        message: 'Invalid expense data',
      });
    }

    const user = findById(users, userId);

    if (!user) {
      return res.status(400).json({
        message: 'User not found',
      });
    }

    const expense = {
      id: nextExpenseId++,
      userId,
      spentAt,
      title,
      amount,
      category,
    };

    if (note !== undefined) {
      expense.note = note;
    }

    expenses.push(expense);

    res.status(201).json(expense);
  });

  // GET /expenses/:id
  app.get('/expenses/:id', (req, res) => {
    const { id } = req.params;

    if (!isValidId(id)) {
      return res.status(400).json({
        message: 'Invalid expense id',
      });
    }

    const expense = findById(expenses, id);

    if (!expense) {
      return res.status(404).json({
        message: 'Expense not found',
      });
    }

    res.status(200).json(expense);
  });

  // PATCH /expenses/:id
  app.patch('/expenses/:id', (req, res) => {
    const { id } = req.params;
    const body = req.body;

    if (
      !isValidId(id) ||
      !body ||
      typeof body !== 'object' ||
      Array.isArray(body)
    ) {
      return res.status(400).json({
        message: 'Invalid request',
      });
    }

    const expense = findById(expenses, id);

    if (!expense) {
      return res.status(404).json({
        message: 'Expense not found',
      });
    }

    const allowedFields = ['spentAt', 'title', 'amount', 'category', 'note'];

    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        if (
          field === 'spentAt' &&
          (typeof body[field] !== 'string' ||
            Number.isNaN(Date.parse(body[field])))
        ) {
          return res.status(400).json({
            message: 'Invalid spentAt',
          });
        }

        if (field === 'amount' && !Number.isInteger(body[field])) {
          return res.status(400).json({
            message: 'Invalid amount',
          });
        }

        if (
          ['title', 'category', 'note'].includes(field) &&
          typeof body[field] !== 'string'
        ) {
          return res.status(400).json({
            message: `Invalid ${field}`,
          });
        }
      }
    }

    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        expense[field] = body[field];
      }
    }

    res.status(200).json(expense);
  });

  // DELETE /expenses/:id
  app.delete('/expenses/:id', (req, res) => {
    const { id } = req.params;

    if (!isValidId(id)) {
      return res.status(404).json({
        message: 'Expense not found',
      });
    }

    const index = expenses.findIndex((expense) => expense.id === Number(id));

    if (index === -1) {
      return res.status(404).json({
        message: 'Expense not found',
      });
    }

    expenses.splice(index, 1);

    res.status(204).send();
  });

  return app;
}

module.exports = { createServer };
