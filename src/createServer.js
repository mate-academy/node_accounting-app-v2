'use strict';

const express = require('express');

const notFound = 404;
const notFoundMessage = 'Expected entity does not exist';
const required = 400;
const requiredMessage = 'Required parameter is not passed';

const expenseKeys = [
  'spentAt',
  'title',
  'amount',
  'category',
  'note',
];

function sendError(res, code, message) {
  res.status(code).send(message);
}

function generateId(array) {
  return array.length ? Math.max(...array.map(el => el.id)) + 1 : 1;
}

function findById(array, id) {
  return array.find(item => item.id === +id);
}

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
      sendError(res, required, requiredMessage);

      return;
    }

    const user = {
      id: generateId(users),
      name,
    };

    users.push(user);
    res.statusCode = 201;
    res.send(user);
  });

  app.get('/users/:id', express.json(), (req, res) => {
    const { id } = req.params;
    const user = findById(users, id);

    if (!user) {
      sendError(res, notFound, notFoundMessage);

      return;
    }

    res.send(user);
  });

  app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    const exists = findById(users, id);

    if (!exists) {
      sendError(res, notFound, notFoundMessage);

      return;
    }

    users = users.filter(user => user.id !== +id);
    res.sendStatus(204);
  });

  app.patch('/users/:id', express.json(), (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const user = findById(users, id);

    if (!user) {
      sendError(res, notFound, notFoundMessage);

      return;
    }

    if (!name) {
      sendError(res, required, requiredMessage);

      return;
    }

    Object.assign(user, { name });
    res.send(user);
  });

  app.get('/expenses', (req, res) => {
    const { userId, categories, from, to } = req.query;

    const newExpenses = expenses.filter(item => {
      if (userId && item.userId !== +userId) {
        return false;
      }

      if (categories && item.category !== categories) {
        return false;
      }

      if (from && to) {
        const spentAt = Date.parse(item.spentAt);

        return !(spentAt < Date.parse(from) || spentAt > Date.parse(to));
      }

      return true;
    });

    res.send(newExpenses);
  });

  app.post('/expenses', express.json(), (req, res) => {
    const request = req.body;
    const postExpenseKeys = ['userId', ...expenseKeys];
    const allKeys = postExpenseKeys.every(key => request.hasOwnProperty(key));
    const matchingUser = users.some(user => user.id === request.userId);

    if (!allKeys || !matchingUser) {
      sendError(res, required, requiredMessage);

      return;
    }

    const expense = {
      id: generateId(expenses),
      ...request,
    };

    expenses.push(expense);
    res.statusCode = 201;
    res.send(expense);
  });

  app.get('/expenses/:id', express.json(), (req, res) => {
    const { id } = req.params;
    const expense = findById(expenses, id);

    if (!expense) {
      sendError(res, notFound, notFoundMessage);

      return;
    }

    res.send(expense);
  });

  app.delete('/expenses/:id', (req, res) => {
    const { id } = req.params;
    const exists = findById(expenses, id);

    expenses = expenses.filter(expense => expense.id !== +id);

    if (!exists) {
      sendError(res, notFound, notFoundMessage);

      return;
    }
    res.sendStatus(204);
  });

  app.patch('/expenses/:id', express.json(), (req, res) => {
    const { id } = req.params;
    const request = req.body;
    const expense = findById(expenses, id);

    if (!expense) {
      sendError(res, notFound, notFoundMessage);

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
