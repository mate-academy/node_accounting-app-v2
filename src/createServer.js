'use strict';

const express = require('express');
const {
  initUsers,
  getAllUsers,
  createUser,
  getUserById,
  removeUser,
  updateUser,
} = require('./services/user.service');

const {
  initExpenses,
  getAllExpenses,
  createExpense,
  getExpenseById,
  removeExpense,
  updateExpense,
} = require('./services/expense.service');

function createServer() {
  initUsers();
  initExpenses();

  const app = express();

  app.get('/users', (req, res) => {
    const allUsers = getAllUsers();

    res.send(allUsers);
  });

  app.post('/users', express.json(), (req, res) => {
    const { name } = req.body;

    if (!name || typeof name !== 'string') {
      res.sendStatus(400);

      return;
    }

    res.statusCode = 201;

    const user = createUser(name);

    res.send(user);
  });

  app.get('/users/:id', (req, res) => {
    const { id } = req.params;
    const user = getUserById(id);

    if (!user) {
      res.sendStatus(404);

      return;
    }

    res.send(user);
  });

  app.delete('/users/:id', (req, res) => {
    const { id } = req.params;

    if (!getUserById(id)) {
      res.sendStatus(404);

      return;
    }

    removeUser(id);

    res.sendStatus(204);
  });

  app.patch('/users/:id', express.json(), (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const user = getUserById(id);

    if (!user) {
      res.sendStatus(404);

      return;
    }

    if (!name || typeof name !== 'string') {
      res.sendStatus(400);

      return;
    }

    const updatedUser = updateUser({ id, name });

    res.send(updatedUser);
  });

  app.get('/expenses', (req, res) => {
    const { userId, categories, from, to } = req.query;
    const id = Number(userId);

    const AllExpenses = getAllExpenses(id, categories, from, to);

    res.send(AllExpenses);
  });

  app.post('/expenses', express.json(), (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;
    const user = getUserById(userId);

    if (!user) {
      res.sendStatus(400);

      return;
    }

    if (!userId || typeof userId !== 'number') {
      res.sendStatus(400);

      return;
    }

    if (!spentAt || isNaN(new Date(spentAt))) {
      res.sendStatus(400);

      return;
    }

    if (!title || typeof title !== 'string') {
      res.sendStatus(400);

      return;
    }

    if (!amount || typeof amount !== 'number') {
      res.sendStatus(400);

      return;
    }

    if (!category || typeof category !== 'string') {
      res.sendStatus(400);

      return;
    }

    if (!note || typeof note !== 'string') {
      res.sendStatus(400);

      return;
    }

    res.statusCode = 201;

    const expense = {
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    };

    const newExpense = createExpense(expense);

    res.send(newExpense);
  });

  app.get('/expenses/:id', (req, res) => {
    const { id } = req.params;
    const expense = getExpenseById(id);

    if (!expense) {
      res.sendStatus(404);

      return;
    }

    res.send(expense);
  });

  app.delete('/expenses/:id', (req, res) => {
    const { id } = req.params;

    if (!getExpenseById(id)) {
      res.sendStatus(404);

      return;
    }

    removeExpense(id);

    res.sendStatus(204);
  });

  app.patch('/expenses/:id', express.json(), (req, res) => {
    const { id } = req.params;
    const { spentAt, title, amount, category, note } = req.body;
    const expense = getExpenseById(id);

    if (!spentAt && !title && !amount && !category && !note) {
      res.sendStatus(404);

      return;
    }

    if (!expense) {
      res.sendStatus(404);

      return;
    }

    if (spentAt && isNaN(new Date(spentAt))) {
      res.sendStatus(400);

      return;
    }

    if (title && typeof title !== 'string') {
      res.sendStatus(400);

      return;
    }

    if (amount && typeof amount !== 'number') {
      res.sendStatus(400);

      return;
    }

    if (category && typeof category !== 'string') {
      res.sendStatus(400);

      return;
    }

    if (note && typeof note !== 'string') {
      res.sendStatus(400);

      return;
    }

    const fieldsToUpdate = {
      id: Number(id) || expense.id,
      spentAt: spentAt || expense.spentAt,
      title: title || expense.title,
      amount: amount || expense.amount,
      category: category || expense.category,
      note: note || expense.note,
    };

    const updatedExpense = updateExpense(fieldsToUpdate);

    res.send(updatedExpense);
  });

  return app;
}

module.exports = {
  createServer,
};
