'use strict';

const express = require('express');

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
      res.status(400).send('Required parameter is not passed');

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
      res.status(404).send('Expected entity does not exist');

      return;
    }

    res.send(user);
  });

  app.delete('/users/:id', (req, res) => {
    const { id } = req.params;

    const newUsers = users.find(user => user.id !== +id);

    if (newUsers.length === users.length) {
      res.status(404).send('Expected entity does not exist');

      return;
    }

    users = newUsers;

    res.sendStatus(204);
  });

  app.put('/users/:id', express.json(), (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
      res.status(400).send('Required parameter is not passed');

      return;
    }

    const user = users.find(item => item.id === +id);

    if (!user) {
      res.status(404).send('Expected entity does not exist');

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
        item.spentAt.getTime() < to.getTime()
          && item.spentAt.getTime() > from.getTime()
      ));
    }

    res.send(newExpenses);
  });

  app.post('/expenses', express.json(), (req, res) => {
    const payload = req.body;
    const postExpenseKeys = ['userId', ...expenseKeys];

    for (const key of postExpenseKeys) {
      if (!payload[key]) {
        res.status(400).send('Required parameter is not passed');

        return;
      }
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
      res.status(404).send('Expected entity does not exist');

      return;
    }

    res.send(expense);
  });

  app.delete('/expenses/:id', (req, res) => {
    const { id } = req.params;

    const newExpenses = expenses.find(expense => expense.id !== +id);

    if (newExpenses.length === users.length) {
      res.status(404).send('Expected entity does not exist');

      return;
    }

    expenses = newExpenses;

    res.sendStatus(204);
  });

  app.put('/expenses/:id', express.json(), (req, res) => {
    const { id } = req.params;
    const payload = req.body;

    for (const key of expenseKeys) {
      if (!payload[key]) {
        res.status(400).send('Required parameter is not passed');

        return;
      }
    }

    const expense = expenses.find(item => item.id === +id);

    if (!expense) {
      res.status(404).send('Expected entity does not exist');

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
