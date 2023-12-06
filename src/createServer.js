'use strict';
/* eslint-disable */

const express = require('express');

function createServer() {
  const app = express();
  let users = [];
  let expenses = [];

  app.use(express.json())

  app.get('/users', (req, res) => {
    res.send(users);
  });

  app.post('/users', (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    const user = {
      id: users.length ? Math.max(...users.map(user => user.id)) + 1 : 1,
      name,
    };

    users.push(user);
    res.statusCode = 201;

    res.send(user);
  });

  app.get('/users/:id', (req, res) => {
    const { id } = req.params;
    const user = users.find(person => person.id === +id) || null;

    if (!user) {
      res.sendStatus(404);

      return;
    }

    res.send(user);
  });

  app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    const newUsers = users.filter(person => person.id !== +id);

    if (newUsers.length === users.length) {
      res.sendStatus(404);

      return;
    }

    users = newUsers;

    res.sendStatus(204);
  });

  app.patch('/users/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    const user = users.find(person => person.id === +id);

    if (!user) {
      res.sendStatus(404);

      return;
    }

    if (typeof name !== 'string') {
      res.sendStatus(400);

      return;
    }

    Object.assign(user, { name });

    res.send(user);
  });

  /////////

  app.get('/expenses', (req, res) => {
    const { userId, categories, from, to } = req.query;
    let selectedExpenses = [...expenses];

    if (userId) {
      selectedExpenses = selectedExpenses
        .filter(expense => expense.userId === +userId);
    }

    if (categories) {
      selectedExpenses = selectedExpenses
        .filter(expense => expense.category === categories);
    }

    if (from && to) {
      selectedExpenses = selectedExpenses
        .filter(expense => (
          new Date(expense.spentAt) > new Date(from)
          && new Date(expense.spentAt) < new Date(to)
        ));
    };

    res.send(selectedExpenses);
  });

  app.post('/expenses', (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;
    const selectedUser = users.find(user => user.id === +userId);

    if (!userId || !spentAt || !title
      || !amount || !category || !note || !selectedUser) {
      res.sendStatus(400);

      return;
    }

    const expense = {
      id: expenses.length ? Math.max(...expenses.map(item => item.id)) + 1 : 1,
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    };

    expenses.push(expense);
    res.statusCode = 201;

    res.send(expense);
  });

  app.get('/expenses/:id', (req, res) => {
    const { id } = req.params;
    const expens = expenses.find(item => item.id === +id) || null;

    if (!expens) {
      res.sendStatus(404);

      return;
    }

    res.send(expens);
  });

  app.delete('/expenses/:id', (req, res) => {
    const { id } = req.params;
    const newExpenses = expenses.filter(item => item.id !== +id);

    if (newExpenses.length === expenses.length) {
      res.sendStatus(404);

      return;
    }

    expenses = newExpenses;

    res.sendStatus(204);
  });

  app.patch('/expenses/:id', (req, res) => {
    const { id } = req.params;
    const request = req.body;

    const expens = expenses.find(item => item.id === +id);

    if (!expens) {
      res.sendStatus(404);

      return;
    }

    Object.assign(expens, request);

    res.send(expens);
  });

  return app;
}

module.exports = {
  createServer,
};
