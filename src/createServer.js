'use strict';

const express = require('express');

const NOT_FOUND_CODE = 404;
const NOT_FOUND_MESSAGE = 'Expected entity does not exist';
const REQUIRED_CODE = 400;
const REQUIRED_MESSAGE = 'Required parameter is not passed';

const expenseKeys = [
  'spentAt',
  'title',
  'amount',
  'category',
  'note',
];

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
      id: users.length ? (Math.max(...users.map(el => el.id))) + 1 : 1,
      name,
    };

    users.push(user);
    res.statusCode = 201;
    res.send(user);
  });

  app.get('/users/:id', express.json(), (req, res) => {
    const { id } = req.params;

    const user = users.find(getUser => getUser.id === +id);

    if (!user) {
      res.status(NOT_FOUND_CODE).send(NOT_FOUND_MESSAGE);

      return;
    }

    res.send(user);
  });

  app.delete('/users/:id', (req, res) => {
    const { id } = req.params;

    const exists = users.find(u => u.id === +id);

    if (!exists) {
      res.status(NOT_FOUND_CODE).send(NOT_FOUND_MESSAGE);

      return;
    }

    users = users.filter(user => user.id !== +id);
    res.sendStatus(204);
  });

  app.patch('/users/:id', express.json(), (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    const user = users.find(patchUser => patchUser.id === +id);

    if (!user) {
      res.status(NOT_FOUND_CODE);
      res.send(NOT_FOUND_MESSAGE);

      return;
    }

    if (!name) {
      res.status(REQUIRED_CODE);
      res.send(REQUIRED_MESSAGE);

      return;
    }

    Object.assign(user, { name });
    res.send(user);
  });
  /// /////////////////////////////////////////////////////////////

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
    const request = req.body;
    const postExpenseKeys = ['userId', ...expenseKeys];

    const allKeys = postExpenseKeys.every(key => request.hasOwnProperty(key));
    const matchingUser = users.some(user => user.id === request.userId);

    if (!allKeys || !matchingUser) {
      res.status(REQUIRED_CODE);
      res.send(REQUIRED_MESSAGE);

      return;
    }

    const expense = {
      id: expenses.length ? (Math.max(expenses.map(el => el.id))) + 1 : 1,
      ...request,
    };

    expenses.push(expense);
    res.statusCode = 201;
    res.send(expense);
  });

  app.get('/expenses/:id', express.json(), (req, res) => {
    const { id } = req.params;

    const expense = expenses.find(getExpense => getExpense.id === +id);

    if (!expense) {
      res.status(NOT_FOUND_CODE).send(NOT_FOUND_MESSAGE);

      return;
    }

    res.send(expense);
  });

  app.delete('/expenses/:id', (req, res) => {
    const { id } = req.params;

    const exists = expenses.find(e => e.id === +id);

    expenses = expenses.filter(expense => expense.id !== +id);

    if (!exists) {
      res.status(NOT_FOUND_CODE).send(NOT_FOUND_MESSAGE);

      return;
    }
    res.sendStatus(204);
  });

  app.patch('/expenses/:id', express.json(), (req, res) => {
    const { id } = req.params;
    const request = req.body;
    const expense = expenses.find(patchExpense => patchExpense.id === +id);

    if (!expense) {
      res.status(NOT_FOUND_CODE).send(NOT_FOUND_MESSAGE);

      return;
    }

    Object.assign(expense, request);

    res.send(expense);
  });

  return app;
}

module.exports = {
  createServer,
};
