'use strict';

const express = require('express');

function createServer() {
  const app = express();

  let users = [];
  const expenses = [];
  let nextId = 1;
  let nextExpenseId = 1;

  app.use(express.json());

  app.get('/users', (req, res) => {
    res.status(200).json(users);
  });

  app.post('/users', (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    users.push({
      id: nextId,
      name: name,
    });
    nextId += 1;
    res.status(201).json({ id: nextId - 1, name: name });
  });

  app.get('/users/:userId', (req, res) => {
    const userId = Number(req.params.userId);

    if (!userId) {
      return res.status(400).json({ error: 'Bad request' });
    }

    const result = users.find((user) => user.id === userId);

    if (!result) {
      return res.status(404).json({ error: 'Not found' });
    }
    res.status(200).json(result);
  });

  app.delete('/users/:userId', (req, res) => {
    const userId = Number(req.params.userId);

    if (!userId) {
      return res.status(400).json({ error: 'Bad request' });
    }

    const result = users.find((user) => user.id === userId);

    if (!result) {
      return res.status(404).json({ error: 'Not found' });
    }

    const idx = users.findIndex((u) => u.id === userId);

    if (idx === -1) {
      return res.status(404).json({ error: 'Not found' });
    }
    users.splice(idx, 1);
    res.status(204).end();
  });

  app.patch('/users/:userId', (req, res) => {
    const userId = Number(req.params.userId);
    const { name } = req.body;

    if (!userId || !name) {
      return res.status(400).json({ error: 'Bad request' });
    }

    const userIn = users.find((user) => user.id === userId);

    if (!userIn) {
      return res.status(404).json({ error: 'Not found' });
    }

    userIn.name = name;

    res.status(200).json(userIn);
  });

  if (process.env.NODE_ENV === 'test') {
    app.post('/__reset__', (req, res) => {
      users = [];
      nextId = 1;
      res.status(204).end();
    });
  }

  app.get('/expenses', (req, res) => {
    let result = expenses;

    if (req.query.userId !== undefined) {
      const userId = Number(req.query.userId);

      result = result.filter((e) => e.userId === userId);
    }

    if (req.query.from || req.query.to) {
      result = result.filter((e) => {
        const date = new Date(e.spentAt);

        if (req.query.from && date < new Date(req.query.from)) {
          return false;
        }

        if (req.query.to && date > new Date(req.query.to)) {
          return false;
        }

        return true;
      });
    }

    if (req.query.categories) {
      const cats = req.query.categories.split(',').map((c) => c.trim());

      result = result.filter((e) => cats.includes(e.category));
    }

    res.status(200).json(result);
  });

  app.post('/expenses', (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;
    const userIm = users.find((user) => user.id === userId);

    if (
      userId === undefined ||
      !spentAt ||
      !title ||
      amount === undefined ||
      !category ||
      !note ||
      !userIm
    ) {
      return res.status(400).json({ error: 'Bad Request' });
    }

    const expense = {
      id: nextExpenseId++,
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    };

    expenses.push(expense);
    res.status(201).json(expense);
  });

  app.get('/expenses/:expenseId', (req, res) => {
    const expenseId = Number(req.params.expenseId);

    if (!expenseId) {
      return res.status(400).json({ error: 'Bad request' });
    }

    const result = expenses.find((expense) => expense.id === expenseId);

    if (!result) {
      return res.status(404).json({ error: 'Not found' });
    }
    res.status(200).json(result);
  });

  app.patch('/expenses/:expenseId', (req, res) => {
    const expenseId = Number(req.params.expenseId);
    const expense = expenses.find((e) => e.id === expenseId);

    if (!expense) {
      return res.status(404).json({ error: 'Not found' });
    }

    // Only update fields that are present in the request body
    Object.assign(expense, req.body);

    res.status(200).json(expense);
  });

  app.delete('/expenses/:expenseId', (req, res) => {
    const expenseId = Number(req.params.expenseId);

    if (!expenseId) {
      return res.status(400).json({ error: 'Bad request' });
    }

    const result = expenses.find((expense) => expense.id === expenseId);

    if (!result) {
      return res.status(404).json({ error: 'Not found' });
    }

    const idx = expenses.findIndex((e) => e.id === expenseId);

    if (idx === -1) {
      return res.status(404).json({ error: 'Not found' });
    }
    expenses.splice(idx, 1);
    res.status(204).end();
  });

  return app;
}

module.exports = {
  createServer,
};
