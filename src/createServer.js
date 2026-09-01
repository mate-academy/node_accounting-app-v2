'use strict';

const express = require('express');

function createServer() {
  const app = express();
  const users = [];
  const expenses = [];
  let nextUserId = 1;
  let nextExpenseId = 1;

  app.use(express.json());

  const getId = (value) => {
    const id = Number(value);

    return Number.isInteger(id) && id > 0 ? id : null;
  };

  const findUser = (value) => {
    const id = getId(value);

    return id === null ? undefined : users.find((user) => user.id === id);
  };

  const findExpense = (value) => {
    const id = getId(value);

    return id === null
      ? undefined
      : expenses.find((expense) => expense.id === id);
  };

  app.post('/users', (req, res) => {
    if (!req.body || req.body.name === undefined) {
      return res.status(400).json({ message: 'Name is required' });
    }

    const user = { id: nextUserId, name: req.body.name };

    nextUserId += 1;
    users.push(user);

    return res.status(201).json(user);
  });

  app.get('/users', (req, res) => res.json(users));

  app.get('/users/:id', (req, res) => {
    const user = findUser(req.params.id);

    return user
      ? res.json(user)
      : res.status(404).json({ message: 'User not found' });
  });

  app.patch('/users/:id', (req, res) => {
    const user = findUser(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!req.body || req.body.name === undefined) {
      return res.status(400).json({ message: 'Name is required' });
    }

    user.name = req.body.name;

    return res.json(user);
  });

  app.delete('/users/:id', (req, res) => {
    const index = users.findIndex((user) => user.id === getId(req.params.id));

    if (index === -1) {
      return res.status(404).json({ message: 'User not found' });
    }

    users.splice(index, 1);

    return res.status(204).send();
  });

  app.post('/expenses', (req, res) => {
    const data = req.body || {};
    const requiredFields = ['userId', 'spentAt', 'title', 'amount', 'category'];
    const hasMissingField = requiredFields.some(
      (field) => data[field] === undefined,
    );

    if (hasMissingField) {
      return res.status(400).json({ message: 'Expense fields are required' });
    }

    if (!findUser(data.userId)) {
      return res.status(400).json({ message: 'User not found' });
    }

    const expense = { id: nextExpenseId, ...data };

    nextExpenseId += 1;
    expenses.push(expense);

    return res.status(201).json(expense);
  });

  app.get('/expenses', (req, res) => {
    let result = expenses;
    const { userId, from, to, categories } = req.query;

    if (userId !== undefined) {
      result = result.filter((expense) => expense.userId === Number(userId));
    }

    if (from !== undefined) {
      result = result.filter((expense) => expense.spentAt >= from);
    }

    if (to !== undefined) {
      result = result.filter((expense) => expense.spentAt <= to);
    }

    if (categories !== undefined) {
      const categoryList = (
        Array.isArray(categories) ? categories : [categories]
      ).flatMap((category) => category.split(','));

      result = result.filter((expense) =>
        categoryList.includes(expense.category),
      );
    }

    return res.json(result);
  });

  app.get('/expenses/:id', (req, res) => {
    const expense = findExpense(req.params.id);

    return expense
      ? res.json(expense)
      : res.status(404).json({ message: 'Expense not found' });
  });

  app.patch('/expenses/:id', (req, res) => {
    const expense = findExpense(req.params.id);

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    const changes = req.body || {};

    if (changes.userId !== undefined && !findUser(changes.userId)) {
      return res.status(400).json({ message: 'User not found' });
    }

    Object.assign(expense, changes);

    return res.json(expense);
  });

  app.delete('/expenses/:id', (req, res) => {
    const index = expenses.findIndex(
      (expense) => expense.id === getId(req.params.id),
    );

    if (index === -1) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    expenses.splice(index, 1);

    return res.status(204).send();
  });

  return app;
}

module.exports = {
  createServer,
};
