'use strict';

const express = require('express');
const { Users } = require('./services/users');
const { Expense } = require('./services/expense');

function createServer() {
  const app = express();
  const users = new Users();
  const expenses = new Expense();

  app.get('/users', express.json(), (req, res) => {
    res.send(users.getUsers());
  });

  app.post('/users', express.json(), (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    res.statusCode = 201;
    res.send(users.setUsers(name));
  });

  app.get('/users/:id', express.json(), (req, res) => {
    const user = users.getUserById(req.params.id);

    if (!user) {
      res.sendStatus(404);

      return;
    }

    res.statusCode = 200;
    res.send(user);
  });

  app.delete('/users/:id', express.json(), (req, res) => {
    const user = users.deleteUser(req.params.id);

    if (user) {
      res.statusCode = 204;
      res.end();

      return;
    }

    res.sendStatus(404);
  });

  app.patch('/users/:id', express.json(), (req, res) => {
    const user = users.updateUser(req.params.id, req.body);

    if (user) {
      res.statusCode = 200;
      res.send(user);

      return;
    }

    res.sendStatus(400);
  });

  app.get('/expenses', express.json(), (req, res) => {
    const response = expenses.getExpenses(req.query);

    if (!response) {
      res.sendStatus(400);

      return;
    }

    res.statusCode = 200;
    res.send(response);
  });

  app.post('/expenses', express.json(), (req, res) => {
    const { title } = req.body;

    if (!title) {
      res.sendStatus(400);

      return;
    }

    const expense = expenses.setExpenses(req.body, users);

    if (expense) {
      res.statusCode = 201;
      res.send(expense);

      return;
    }

    res.sendStatus(400);
  });

  app.get('/expenses/:id', express.json(), (req, res) => {
    const expense = expenses.getExpenseById(req.params.id);

    if (!expense) {
      res.sendStatus(404);

      return;
    }

    res.statusCode = 200;
    res.send(expense);
  });

  app.patch('/expenses/:id', express.json(), (req, res) => {
    const expense = expenses.updateExpense(req.params.id, req.body);

    if (expense) {
      res.statusCode = 200;
      res.send(expense);

      return;
    }

    res.sendStatus(404);
  });

  app.delete('/expenses/:id', express.json(), (req, res) => {
    const expense = expenses.deleteExpense(req.params.id);

    if (expense) {
      res.statusCode = 204;
      res.end();

      return;
    }

    res.sendStatus(404);
  });

  return app;
}

module.exports = {
  createServer,
};
