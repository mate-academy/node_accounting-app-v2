'use strict';

const express = require('express');
const { uuid } = require('uuidv4');

function createServer() {
  const app = express();

  // services
  let users = [];

  app.get('/users', (req, res) => {
    res.send(users);
  });

  app.post('/users', express.json(), (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(422);

      return;
    }

    const newUser = {
      id: uuid(),
      name,
    };

    users.push(newUser);

    res.statusCode = 201;
    res.send(newUser);
  });

  app.get('/users/:userId', (req, res) => {
    const { userId } = req.params;
    const foundUser = users.find(user => user.id === userId);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    res.end(foundUser);
  });

  app.delete('/users/:userId', express.json(), (req, res) => {
    const { userId } = req.params;

    users = users.filter(user => user.id !== userId);

    if (!userId) {
      res.sendStatus(422);

      return;
    }

    res.sendStatus(204);
  });

  app.patch('/users/:userId', express.json(), (req, res) => {
    const { userId } = req.params;
    const foundUser = users.find(user => user.id === userId);
    const { name, id } = req.body;

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    if (typeof name !== 'string' || typeof id !== 'string') {
      res.sendStatus(422);

      return;
    }

    Object.assign(foundUser, {
      id,
      name,
    });

    res.send(foundUser);
  });

  // services
  let expenses = [];

  app.get('/expenses', (req, res) => {
    res.send(expenses);
  });

  app.post('./expenses', (req, res) => {
    const {
      userId,
      categories,
      from,
      to,
    } = req.body;

    if (!userId || !categories || !from || !to) {
      res.sendStatus(422);

      return;
    }

    const newExpense = {
    };

    users.push(newExpense);

    res.statusCode = 201;
    res.send(newExpense);
  });

  app.get('/expenses/:expenseId', (req, res) => {
    const { expenseId } = req.params;
    const findExpense = expenses.find(expense => expense.id === expenseId);

    if (!findExpense) {
      res.sendStatus(404);

      return;
    }

    res.end(findExpense);
  });

  app.delete('/expenses/:expenseId', express.json(), (req, res) => {
    const { expenseId } = req.params;

    expenses = expenses.filter(user => user.id !== expenseId);

    if (!expenseId) {
      res.sendStatus(422);

      return;
    }

    res.sendStatus(204);
  });

  app.patch('/expenses/:expenseId', express.json(), (req, res) => {
    const { expenseId } = req.params;
    const foundUser = users.find(user => user.id === expenseId);
    const { name, id } = req.body;

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    if (typeof name !== 'string' || typeof id !== 'string') {
      res.sendStatus(422);

      return;
    }

    Object.assign(foundUser, {
      id,
      name,
    });

    res.send(foundUser);
  });

  return app;
}

module.exports = {
  createServer,
};
