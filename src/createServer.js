/* eslint-disable max-len */
'use strict';

const express = require('express');
const {
  getAllUsers,
  clearUsers,
  getUserById,
  deleteUser,
  createUser,
  updateUser,
} = require('./services/users');

const {
  getFilteredExpenses,
  getExpenseById,
  createExpense,
  deleteExpense,
  updateExpense,
  clearExpenses,
} = require('./services/expenses');

function createServer() {
  const app = express();

  app.use(express.json());

  clearUsers();
  clearExpenses();

  app.get('/users', (req, res) => {
    const users = getAllUsers();

    res.send(users);
  });

  app.get('/users/:id', (req, res) => {
    const { id } = req.params;
    const foundUser = getUserById(parseInt(id));

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    res.send(foundUser);
  });

  app.post('/users', express.json(), (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    const newUser = createUser(name);

    res.statusCode = 201;
    res.send(newUser);
  });

  app.delete('/users/:id', (req, res) => {
    const { id } = req.params;

    if (!getUserById(id)) {
      res.sendStatus(404);

      return;
    }

    deleteUser(id);

    res.sendStatus(204);
  });

  app.patch('/users/:id', express.json(), (req, res) => {
    const { id } = req.params;
    const foundUser = getUserById(parseInt(id));

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    const { name } = req.body;

    if (typeof name !== 'string') {
      res.sendStatus(400);

      return;
    }

    updateUser({
      id: parseInt(id),
      name,
    });

    res.send(foundUser);
  });

  app.get('/expenses', (req, res) => {
    const query = req.query;

    const filteredExpenses = getFilteredExpenses(query);

    res.send(filteredExpenses);
  });

  app.get('/expenses/:id', (req, res) => {
    const { id } = req.params;
    const foundExpense = getExpenseById(parseInt(id));

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    res.send(foundExpense);
  });

  app.post('/expenses', express.json(), (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (!userId || !spentAt || !title || !amount || !category || !note) {
      res.sendStatus(400);

      return;
    }

    const userExists = getUserById(userId);

    if (!userExists) {
      res.sendStatus(400);

      return;
    }

    const newExpense = createExpense(userId, spentAt, title, amount, category, note);

    res.statusCode = 201;
    res.send(newExpense);
  });

  app.delete('/expenses/:id', (req, res) => {
    const { id } = req.params;

    if (!getExpenseById(id)) {
      res.sendStatus(404);

      return;
    }

    deleteExpense(id);

    res.sendStatus(204);
  });

  app.patch('/expenses/:id', express.json(), (req, res) => {
    const { id } = req.params;
    const foundExpense = getExpenseById(id);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    const { body } = req;

    const updatedExpense = updateExpense(id, body);

    res.send(updatedExpense);
  });

  return app;
}

module.exports = {
  createServer,
};
