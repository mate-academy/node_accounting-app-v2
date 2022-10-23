'use strict';

const express = require('express');

let users = [];

let expenseDatas = [];

function createServer() {
  const app = express();

  app.post('/users', express.json(), (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    let countId = 1;

    const newUser = {
      id: countId++,
      name,
    };

    users.push(newUser);

    res.statusCode = 201;

    res.send(newUser);
  });

  app.get('/users', (req, res) => {
    res.send(users);
  });

  app.get('/users/:userId', express.json(), (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const { userId } = req.params;

    const foundUser = users.find(user => user.id === +userId);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }
    res.statusCode = 200;
    res.send(foundUser);
  });

  app.patch('/users/:userId', express.json(), (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const { userId } = req.params;
    const { name } = req.body;

    const foundUser = users.find(user => user.id === +userId);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }
    Object.assign(foundUser, { name });

    res.statusCode = 200;
    res.send(foundUser);
  });

  app.delete('/users/:userId', express.json(), (req, res) => {
    const { userId } = req.params;

    const foundUser = users.find(user => user.id === +userId);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    users = users.filter(user => user.id !== Number(userId));

    res.sendStatus(204);
  });

  app.post('/expenses', express.json(), (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const { spentAt, userId, title, amount, category, note } = req.body;

    const findUser = users.find(user => user.id === +userId);

    if (!findUser) {
      res.sendStatus(400);

      return;
    }

    const newExpenseData = {
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    };

    Object.assign(newExpenseData, { id: expenseDatas.length + 1 });

    expenseDatas.push(newExpenseData);

    res.statusCode = 201;

    res.send(newExpenseData);
  });

  app.get('/expenses', express.json(), (req, res) => {
    const {
      userId,
      category,
      from,
      to,
    } = req.query;

    if (category) {
      const filterCategory = expenseDatas
        .filter(expense => expense.category === category);

      res.statusCode = 200;
      res.send(filterCategory);

      return;
    }

    if (from && to) {
      const filterDate = expenseDatas.filter((expense) =>
        expense.spentAt > from && expense.spentAt < to
      );

      res.send(filterDate);

      return;
    }

    if (userId) {
      const findUser = expenseDatas
        .filter(expense => expense.userId === +userId);

      res.send(findUser);
      res.statusCode = 200;

      return;
    }

    res.send(expenseDatas);
  });

  app.get('/expenses/:expensId', express.json(), (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const { expensId } = req.params;

    const foundUser = expenseDatas.find(expens => expens.id === +expensId);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }
    res.statusCode = 200;
    res.send(foundUser);
  });

  app.delete('/expenses/:expensId', express.json(), (req, res) => {
    const { expensId } = req.params;

    const foundExpens = expenseDatas.find(expens => expens.id === +expensId);

    const filterExpens = expenseDatas.filter(expens => expens.id !== +expensId);

    if (!foundExpens) {
      res.sendStatus(404);

      return;
    }

    expenseDatas = filterExpens;

    res.sendStatus(204);
  });

  app.patch('/expenses/:expensId', express.json(), (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const { expensId } = req.params;
    const { title } = req.body;
    const foundExpens = expenseDatas
      .find(expens => expens.userId === +expensId);

    if (!foundExpens) {
      res.sendStatus(404);

      return;
    }
    Object.assign(foundExpens, { title });

    res.statusCode = 200;
    res.send(foundExpens);
  });

  return app;
}

module.exports = {
  createServer,
};
