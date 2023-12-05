const express = require('express');

const keys = [
  'spentAt',
  'title',
  'amount',
  'category',
  'note',
];


function createServer() {

  let usersList = [];
  let expenseList = [];

  const app = express();
  app.get('/users', (res) => {
    res.send(usersList);
  });

  app.post('/users', express.json(), (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.status(400).send('Required parameter is not passed');

      return;
    }

    const user = {
      id: Number(new Date()),
      name,
    };

    usersList.push(user);

    res.statusCode = 201;
    res.send(user);
  });

  app.get('/users/:id', (req, res) => {
    const { id } = req.params;

    const user = usersList.find(item => item.id === id);

    if (!user) {
      res.status(404).send('Expected entity does not exist');

      return;
    }

    res.send(user);
  });

  app.delete('/users/:id', (req, res) => {
    const { id } = req.params;

    const newUsers = usersList.filter(user => user.id !== id);

    if (newUsers.length === usersList.length) {
      res.status(404).send('Expected entity does not exist');

      return;
    }

    usersList = newUsers;

    res.sendStatus(204);
  });

  app.patch('/users/:id', express.json(), (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    const user = usersList.find(item => item.id === id);

    if (!user) {
      res.status(404).send('Expected entity does not exist');

      return;
    }

    if (!name) {
      res.status(400).send('Required parameter is not passed');

      return;
    }

    Object.assign(user, { name });

    res.send(user);
  });

  app.get('/expenses', (req, res) => {
    const { userId, categories, from, to } = req.query;
    let newExpenses = expenseList;

    if (userId) {
      newExpenses = newExpenses.filter(item => item.userId === userId);
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
    const postExpenseKeys = ['userId', ...expenseKeys];

    const missingKeys = postExpenseKeys
      .filter(key => !req.body.hasOwnProperty(key));

    const isUserExists = usersList.some(user => user.id === req.body.userId);

    if (missingKeys.length || !isUserExists) {
      res.status(400).send('Required parameter is not passed');

      return;
    }

    const expense = {
      id: Number(new Date()),
      ...req.body,
    };

    expenseList.push(expense);

    res.statusCode = 201;
    res.send(expense);
  });

  app.get('/expenses/:id', (req, res) => {
    const { id } = req.params;

    const expense = expenseList.find(item => item.id === id);

    if (!expense) {
      res.status(404).send('Expected entity does not exist');

      return;
    }

    res.send(expense);
  });

  app.delete('/expenses/:id', (req, res) => {
    const { id } = req.params;

    const newExpenses = expenseList.filter(expense => expense.id !== id);

    if (newExpenses.length === usersList.length) {
      res.status(404).send('Expected entity does not exist');

      return;
    }

    expenseList = newExpenses;

    res.sendStatus(204);
  });

  app.patch('/expenses/:id', express.json(), (req, res) => {
    const { id } = req.params;
    const payload = req.body;

    const expense = expenseList.find(item => item.id === id);

    if (!expense) {
      res.status(404).send('Expected entity does not exist');

      return;
    }

    if (!payload.hasOwnProperty('title')) {
      res.status(400).send('Required parameter is not passed');

      return;
    }

    Object.assign(expense, payload);

    res.send(expense);
  });

  return app;
}

module.exports = { createServer };
