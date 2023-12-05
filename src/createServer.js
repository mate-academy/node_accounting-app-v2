'use strict';

const express = require('express');

const expenseKeys = [
  'spentAt',
  'title',
  'amount',
  'category',
  'note',
];

const NOT_FOUND_CODE = 404;
const NOT_FOUND_MESSAGE = 'Expected entity does not exist';
const REQUIRED_CODE = 400;
const REQUIRED_MESSAGE = 'Required parameter is not passed';

function createServer() {
  let users = [];
  let expenses = [];

  const app = express();

  app.get('/users', (req, res) => {
    res.send(users);
  });

  app.post('/users', express.json(), (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.status(REQUIRED_CODE).send(REQUIRED_MESSAGE);

      return;
    }

    const user = {
      id: +new Date(),
      name,
    };

    users.push(user);

    res.statusCode = 201;
    res.send(user);
  });

  app.get('/users/:id', (req, res) => {
    const { id } = req.params;

    const user = users.find(item => item.id === +id);

    if (!user) {
      res.status(NOT_FOUND_CODE).send(NOT_FOUND_MESSAGE);

      return;
    }

    res.send(user);
  });

  app.delete('/users/:id', (req, res) => {
    const { id } = req.params;

    const newUsers = users.filter(user => user.id !== +id);

    if (newUsers.length === users.length) {
      res.status(NOT_FOUND_CODE).send(NOT_FOUND_MESSAGE);

      return;
    }

    users = newUsers;

    res.sendStatus(204);
  });

  app.patch('/users/:id', express.json(), (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    const user = users.find(item => item.id === +id);

    if (!user) {
      res.status(NOT_FOUND_CODE).send(NOT_FOUND_MESSAGE);

      return;
    }

    if (!name) {
      res.status(REQUIRED_CODE).send(REQUIRED_MESSAGE);

      return;
    }

    Object.assign(user, { name });

    res.send(user);
  });

  app.get('/expenses', (req, res) => {
    const { userId, categories, from, to } = req.query;
    let newExpenses = expenses;

    if (userId) {
      newExpenses = newExpenses.filter(item => item.userId === +userId);
    }

    if (categories) {
      newExpenses = newExpenses.filter(item => item.category === categories);
    }

    if (from && to) {
      newExpenses = newExpenses.filter((item) => (
        Date.parse(item.spentAt) < Date.parse(to)
          && Date.parse(item.spentAt) > Date.parse(from)
      ));
    }

    res.send(newExpenses);
  });

  app.post('/expenses', express.json(), (req, res) => {
    const payload = req.body;
    const postExpenseKeys = ['userId', ...expenseKeys];

    const missingKeys = postExpenseKeys
      .filter(key => !payload.hasOwnProperty(key));

    const isUserExists = users.some(user => user.id === payload.userId);

    if (missingKeys.length || !isUserExists) {
      res.status(REQUIRED_CODE).send(REQUIRED_MESSAGE);

      return;
    }

    const expense = {
      id: +new Date(),
      ...payload,
    };

    expenses.push(expense);

    res.statusCode = 201;
    res.send(expense);
  });

  app.get('/expenses/:id', (req, res) => {
    const { id } = req.params;

    const expense = expenses.find(item => item.id === +id);

    if (!expense) {
      res.status(NOT_FOUND_CODE).send(NOT_FOUND_MESSAGE);

      return;
    }

    res.send(expense);
  });

  app.delete('/expenses/:id', (req, res) => {
    const { id } = req.params;

    const newExpenses = expenses.filter(expense => expense.id !== +id);

    if (newExpenses.length === users.length) {
      res.status(NOT_FOUND_CODE).send(NOT_FOUND_MESSAGE);

      return;
    }

    expenses = newExpenses;

    res.sendStatus(204);
  });

  app.patch('/expenses/:id', express.json(), (req, res) => {
    const { id } = req.params;
    const payload = req.body;

    const expense = expenses.find(item => item.id === +id);

    if (!expense) {
      res.status(NOT_FOUND_CODE).send(NOT_FOUND_MESSAGE);

      return;
    }

    if (!payload.hasOwnProperty('title')) {
      res.status(REQUIRED_CODE).send(REQUIRED_MESSAGE);

      return;
    }

    Object.assign(expense, payload);

    res.send(expense);
  });

  return app;
}

module.exports = {
  createServer,
};
