'use strict';

const express = require('express');

function createServer() {
  const app = express();

  let users = [];
  let expenses = [];

  // #region users methods

  app.get('/users', (req, res) => {
    return res.status(200).json(users);
  });

  app.get('/users/:id', (req, res) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).send('Invalid id');
    }

    const user = users.find((u) => u.id === id);

    if (!user) {
      return res.status(404).send('User not found');
    }

    return res.status(200).json(user);
  });

  app.post('/users', express.json(), (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.status(400).send('Name is required');
    }

    const user = {
      id: Date.now(),
      name,
    };

    users.push(user);

    return res.status(201).json(user);
  });

  app.delete('/users/:id', (req, res) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).send('Invalid id');
    }

    const user = users.find((u) => u.id === id);

    if (!user) {
      return res.status(404).send('User not found');
    }

    users = users.filter((u) => u.id !== id);

    return res.status(204).send();
  });

  app.patch('/users/:id', express.json(), (req, res) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).send('Invalid id');
    }

    const user = users.find((u) => u.id === id);

    if (!user) {
      return res.status(404).send('User not found');
    }

    const { name } = req.body;

    if (!name) {
      return res.status(400).send('Name is required');
    }

    const newUser = {
      id,
      name,
    };

    const index = users.findIndex((u) => u.id === id);

    users[index] = newUser;

    return res.status(200).json(newUser);
  });

  // #endregion

  // #region expenses methods

  app.get('/expenses', (req, res) => {
    let results = expenses;

    if (req.query.userId !== undefined) {
      const userId = Number(req.query.userId);

      if (isNaN(userId)) {
        return res.status(400).send('Invalid userId');
      }
      results = results.filter((e) => e.userId === userId);
    }

    if (req.query.categories) {
      let categories = req.query.categories;

      if (typeof categories === 'string') {
        categories = [categories];
      }
      results = results.filter((e) => categories.includes(e.category));
    }

    if (req.query.from) {
      const from = new Date(req.query.from);

      if (isNaN(from.getTime())) {
        return res.status(400).send('Invalid from date');
      }
      results = results.filter((e) => new Date(e.spentAt) >= from);
    }

    if (req.query.to) {
      const to = new Date(req.query.to);

      if (isNaN(to.getTime())) {
        return res.status(400).send('Invalid to date');
      }
      results = results.filter((e) => new Date(e.spentAt) <= to);
    }

    return res.status(200).json(results);
  });

  app.post('/expenses', express.json(), (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (
      userId === undefined ||
      !spentAt ||
      !title ||
      amount === undefined ||
      !category ||
      note === undefined
    ) {
      return res.status(400).send('Missing required fields');
    }

    const user = users.find((u) => u.id === userId);

    if (!user) {
      return res.status(400).send('Invalid userId');
    }

    const newExpense = {
      id: Date.now(),
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    };

    expenses.push(newExpense);

    return res.status(201).json(newExpense);
  });

  app.get('/expenses/:id', (req, res) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).send('Invalid id');
    }

    const expense = expenses.find((e) => e.id === id);

    if (!expense) {
      return res.status(404).send('Expense not found');
    }

    return res.status(200).json(expense);
  });

  app.delete('/expenses/:id', (req, res) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).send('Invalid id');
    }

    const expense = expenses.find((e) => e.id === id);

    if (!expense) {
      return res.status(404).send('Expense not found');
    }

    expenses = expenses.filter((e) => e.id !== id);

    return res.status(204).send();
  });

  app.patch('/expenses/:id', express.json(), (req, res) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).send('Invalid id');
    }

    const expense = expenses.find((e) => e.id === id);

    if (!expense) {
      return res.status(404).send('Expense not found');
    }

    const { userId, spentAt, title, amount, category, note } = req.body;

    if (userId !== undefined) {
      const user = users.find((u) => u.id === userId);

      if (!user) {
        return res.status(400).send('Invalid userId');
      }
      expense.userId = userId;
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

    return res.status(200).json(expense);
  });

  // #endregion
  return app;
}

module.exports = {
  createServer,
};
