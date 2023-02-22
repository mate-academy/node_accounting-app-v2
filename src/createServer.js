'use strict';

const express = require('express');

function createServer() {
  const app = express();

  let users = [];

  app.get('/users', (req, res) => {
    res.send(users);
  });

  app.patch('/users/:userId', express.json(), (req, res) => {
    const { userId } = req.params;
    const foundUser = users.find(user => user.id === +userId);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    const { name } = req.body;

    if (typeof name !== 'string') {
      res.sendStatus(422);

      return;
    }

    Object.assign(foundUser, { name });

    res.send(foundUser);
  });

  app.delete('/users/:userId', (req, res) => {
    const { userId } = req.params;

    const filteredUsers = users.filter(user => user.id !== +userId);

    if (filteredUsers.length === users.length) {
      res.sendStatus(404);

      return;
    }

    users = filteredUsers;

    res.sendStatus(204);
  });

  app.get('/users/:userId', (req, res) => {
    const userId = Number(req.params.userId);
    const isValid = !Number.isNaN(userId);

    if (!isValid) {
      res.sendStatus(422);

      return;
    }

    const foundUser = users.find(user => user.id === userId);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    res.send(foundUser);
  });

  const expenses = [];

  app.post('/users', express.json(), (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    const maxId = users.length
      ? Math.max(...users.map(user => user.id)) + 1
      : 0;

    const newUser = {
      id: maxId,
      name,
    };

    users.push(newUser);

    res.statusCode = 201;
    res.send(newUser);
  });

  app.get('/expenses', (req, res) => {
    res.send(expenses);
  });

  app.get('/expenses/:expenseId', (req, res) => {
    const expenseId = Number(req.params.expenseId);
    const isValid = !Number.isNaN(expenseId);

    if (!isValid) {
      res.sendStatus(422);

      return;
    }

    const foundExpense = expenses.find(expense => expense.id === expenseId);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    res.send(foundExpense);
  });
  app.use(express.json());

  app.post('/expenses', express.json(), (res, req) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    const maxId = expenses.length
      ? Math.max(...expenses.map(user => user.id)) + 1
      : 0;

    const isValidDataType = typeof userId !== 'number'
      || typeof spentAt !== 'string'
      || typeof title !== 'string'
      || typeof amount !== 'number'
      || typeof category !== 'string'
      || typeof note !== 'string';

    const foundUser = users.some(user => user.id === +userId);

    // const isDataValid = !userId
    //   || !spentAt
    //   || !title
    //   || !amount
    //   || !category;

    // if (isDataValid) {
    //   res.sendStatus(422);

    //   return;
    // };

    if (isValidDataType || !foundUser) {
      res.sendStatus(400);

      return;
    }

    const newExpense = {
      ...req.body,
      id: maxId,
    };

    expenses.push(newExpense);

    res.statusCode = 201;
    res.send(newExpense);
  });

  return app;
}

module.exports = {
  createServer,
};
