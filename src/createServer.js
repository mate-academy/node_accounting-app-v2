'use strict';

const express = require('express');
const cors = require('cors');

function createServer() {
  const app = express();
  const users = [];
  const expenses = [];

  let nextUserId = 1;
  let nextExpenseId = 1;

  app.use(cors());
  app.use(express.json());

  function isValidName(name) {
    return typeof name === 'string' && name.trim().length > 0;
  }

  function isValidExpense(expense) {
    return (
      users.some((user) => user.id === expense.userId) &&
      isValidName(expense.title) &&
      isValidName(expense.category) &&
      typeof expense.spentAt === 'string' &&
      Number.isFinite(Date.parse(expense.spentAt)) &&
      typeof expense.amount === 'number' &&
      Number.isFinite(expense.amount) &&
      (expense.note === undefined || typeof expense.note === 'string')
    );
  }

  app.get('/users', (req, res) => {
    res.json(users);
  });

  app.post('/users', (req, res) => {
    const { name } = req.body || {};

    if (!isValidName(name)) {
      res.status(400).json({ message: 'Name is required' });

      return;
    }

    const user = {
      id: nextUserId,
      name,
    };

    nextUserId += 1;
    users.push(user);

    res.status(201).json(user);
  });

  app.get('/users/:id', (req, res) => {
    const user = users.find((item) => item.id === Number(req.params.id));

    if (!user) {
      res.status(404).json({ message: 'User not found' });

      return;
    }

    res.json(user);
  });

  app.patch('/users/:id', (req, res) => {
    const user = users.find((item) => item.id === Number(req.params.id));

    if (!user) {
      res.status(404).json({ message: 'User not found' });

      return;
    }

    const { name } = req.body || {};

    if (!isValidName(name)) {
      res.status(400).json({ message: 'Name is required' });

      return;
    }

    user.name = name;

    res.json(user);
  });

  app.delete('/users/:id', (req, res) => {
    const index = users.findIndex((user) => user.id === Number(req.params.id));

    if (index === -1) {
      res.status(404).json({ message: 'User not found' });

      return;
    }

    users.splice(index, 1);

    res.status(204).end();
  });

  app.get('/expenses', (req, res) => {
    const { userId, from, to, categories } = req.query;
    const fromTime = from === undefined ? null : Date.parse(from);
    const toTime = to === undefined ? null : Date.parse(to);

    if (
      (fromTime !== null && !Number.isFinite(fromTime)) ||
      (toTime !== null && !Number.isFinite(toTime))
    ) {
      res.status(400).json({ message: 'Invalid date filter' });

      return;
    }

    let categoryList = [];

    if (categories !== undefined) {
      categoryList = []
        .concat(categories)
        .flatMap((value) => String(value).split(','))
        .map((value) => value.trim());
    }

    const result = expenses.filter((expense) => {
      const spentAt = Date.parse(expense.spentAt);

      if (userId !== undefined && expense.userId !== Number(userId)) {
        return false;
      }

      if (fromTime !== null && spentAt < fromTime) {
        return false;
      }

      if (toTime !== null && spentAt > toTime) {
        return false;
      }

      if (categoryList.length > 0 && !categoryList.includes(expense.category)) {
        return false;
      }

      return true;
    });

    res.json(result);
  });

  app.post('/expenses', (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body || {};

    const expense = {
      id: nextExpenseId,
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    };

    if (!isValidExpense(expense)) {
      res.status(400).json({ message: 'Invalid expense data' });

      return;
    }

    nextExpenseId += 1;
    expenses.push(expense);

    res.status(201).json(expense);
  });

  app.get('/expenses/:id', (req, res) => {
    const expense = expenses.find((item) => item.id === Number(req.params.id));

    if (!expense) {
      res.status(404).json({ message: 'Expense not found' });

      return;
    }

    res.json(expense);
  });

  app.patch('/expenses/:id', (req, res) => {
    const expense = expenses.find((item) => item.id === Number(req.params.id));

    if (!expense) {
      res.status(404).json({ message: 'Expense not found' });

      return;
    }

    const changes = req.body || {};
    const updatedExpense = { ...expense };
    const fields = ['userId', 'spentAt', 'title', 'amount', 'category', 'note'];

    for (const field of fields) {
      if (Object.prototype.hasOwnProperty.call(changes, field)) {
        updatedExpense[field] = changes[field];
      }
    }

    if (!isValidExpense(updatedExpense)) {
      res.status(400).json({ message: 'Invalid expense data' });

      return;
    }

    Object.assign(expense, updatedExpense);

    res.json(expense);
  });

  app.delete('/expenses/:id', (req, res) => {
    const index = expenses.findIndex(
      (expense) => expense.id === Number(req.params.id),
    );

    if (index === -1) {
      res.status(404).json({ message: 'Expense not found' });

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
