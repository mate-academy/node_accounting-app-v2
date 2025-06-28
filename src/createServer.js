'use strict';

const express = require('express');
const { expensesService } = require('./services/expensesService');
const { usersService } = require('./services/usersService');

function createServer() {
  usersService.reset();
  expensesService.reset();

  const app = express();

  app.use(express.json());

  app.get('/expenses', (req, res) => {
    const { userId, categories, from, to } = req.query;

    let expenses = expensesService.getExpenses();

    if (userId) {
      expenses = expenses.filter((e) => Number(e.userId) === Number(userId));
    }

    if (categories) {
      expenses = expenses.filter((e) => categories.includes(e.category));
    }

    if (from) {
      const fromDate = new Date(from);

      expenses = expenses.filter((e) => new Date(e.spentAt) >= fromDate);
    }

    if (to) {
      const toDate = new Date(to);

      expenses = expenses.filter((e) => new Date(e.spentAt) <= toDate);
    }

    res.json(expenses);
  });

  app.get('/expenses/:id', (req, res) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).send('Invalid id');
    }

    const expense = expensesService.getExpense(id);

    if (!expense) {
      return res.status(404).send('Not found');
    }

    return res.json(expense);
  });

  app.post('/expenses', (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (!userId || !spentAt || !title || !amount || !category) {
      return res.status(400).send('Bad request');
    }

    const user = usersService.getUser(userId);

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    const expense = expensesService.createExpense(
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    );

    return res.status(201).json(expense);
  });

  app.delete('/expenses/:id', (req, res) => {
    const id = Number(req.params.id);

    if (!id || isNaN(id)) {
      return res.status(404).send('Not found');
    }

    const deleted = expensesService.deleteExpense(id);

    if (!deleted) {
      return res.status(404).send('Not found');
    }

    return res.sendStatus(204);
  });

  app.patch('/expenses/:id', (req, res) => {
    const { spentAt, title, amount, category, note } = req.body;
    const id = Number(req.params.id);

    if (!id || isNaN(id)) {
      return res.sendStatus(404);
    }

    if (!spentAt && !title && !amount && !category && !note) {
      return res.status(404).send('Bad request');
    }

    const expense = expensesService.updateExpense(
      id,
      spentAt,
      title,
      amount,
      category,
      note,
    );

    if (!expense) {
      return res.status(404).send('Not found');
    }

    return res.json(expense);
  });

  app.get('/users', (req, res) => {
    const users = usersService.getUsers();

    res.json(users);
  });

  app.get('/users/:id', (req, res) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).send('Bad request');
    }

    const user = usersService.getUser(id);

    if (!user) {
      return res.status(404).send('Not found');
    }

    return res.json(user);
  });

  app.post('/users', (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.status(400).send('Bad request');
    }

    const user = usersService.createUser(name);

    return res.status(201).json(user);
  });

  app.delete('/users/:id', (req, res) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).send('Bad request');
    }

    const success = usersService.deleteUser(id);

    if (!success) {
      return res.sendStatus(404);
    }

    return res.sendStatus(204);
  });

  app.patch('/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const { name } = req.body;

    if (isNaN(id) || !name) {
      return res.status(400).send('Bad request');
    }

    const updated = usersService.updateUser(id, name);

    if (!updated) {
      return res.status(404).send('Not found');
    }
    res.json(updated);
  });

  return app;
}

module.exports = {
  createServer,
};
