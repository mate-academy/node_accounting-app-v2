'use strict';

const express = require('express');

function createServer() {
  const server = express();
  const users = [];
  const expenses = [];

  server.get('/users', (req, res) => {
    res.send(users);
  });

  server.post('/users', express.json(), (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    const user = {
      id: Date.now(),
      name,
    };

    users.push(user);
    res.statusCode = 201;

    res.send(user);
  });

  server.get('/users/:id', (req, res) => {
    const { id } = req.params;
    const userToSend = users.find(u => u.id === +id);

    if (!userToSend) {
      res.sendStatus(404);

      return;
    }

    res.send(userToSend);
  });

  server.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    const index = users.findIndex(u => u.id === +id);

    if (index === -1) {
      res.sendStatus(404);

      return;
    }

    users.splice(index, 1);

    res.sendStatus(204);
  });

  server.patch('/users/:id', express.json(), (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const index = users.findIndex(u => u.id === +id);

    if (!name) {
      res.sendStatus(400);

      return;
    }

    if (index === -1) {
      res.sendStatus(404);

      return;
    }

    users[index] = {
      ...users[index],
      name,
    };

    res.send(users[index]);
  });

  server.get('/expenses', express.json(), (req, res) => {
    const { categories, userId, from, to } = req.query;
    let filteredResponse = [...expenses];

    if (categories) {
      filteredResponse = filteredResponse
        .filter(expense => expense.category === categories);
    }

    if (userId) {
      filteredResponse = filteredResponse
        .filter(expense => expense.userId === +userId);
    }

    if (from) {
      filteredResponse = filteredResponse
        .filter(expense => new Date(expense.spentAt) > new Date(from));
    }

    if (to) {
      filteredResponse = filteredResponse
        .filter(expense => new Date(expense.spentAt) < new Date(to));
    }

    res.send(filteredResponse);
  });

  server.post('/expenses', express.json(), (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    const index = users.findIndex(u => u.id === +userId);

    if (index === -1) {
      res.sendStatus(400);

      return;
    }

    if (!(userId && spentAt && title && amount && category && note)) {
      res.sendStatus(404);

      return;
    }

    const expense = {
      id: Date.now(),
      userId: +userId,
      spentAt: spentAt,
      amount: +amount,
      title,
      category,
      note,
    };

    expenses.push(expense);
    res.statusCode = 201;

    res.send(expense);
  });

  server.patch('/expenses/:id', express.json(), (req, res) => {
    const { id } = req.params;
    const { spentAt, title, amount, category, note } = req.body;
    const index = expenses.findIndex(expense => expense.id === +id);

    if (index === -1) {
      res.sendStatus(404);

      return;
    }

    expenses[index] = {
      ...expenses[index],
      spentAt: spentAt || expenses[index].spentAt,
      title: title || expenses[index].title,
      amount: amount || expenses[index].amount,
      category: category || expenses[index].category,
      note: note || expenses[index].note,
    };

    res.send(expenses[index]);
  });

  server.get('/expenses/:id', (req, res) => {
    const { id } = req.params;
    const expenseToSend = expenses.find(e => e.id === +id);

    if (!expenseToSend) {
      res.sendStatus(404);

      return;
    }

    res.send(expenseToSend);
  });

  server.delete('/expenses/:id', (req, res) => {
    const { id } = req.params;
    const index = expenses.findIndex(e => e.id === +id);

    if (index === -1) {
      res.sendStatus(404);

      return;
    }

    expenses.splice(index, 1);

    res.sendStatus(204);
  });

  return server;
}

module.exports = {
  createServer,
};
