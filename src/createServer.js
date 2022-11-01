'use strict';

const express = require('express');

const app = express();

function createServer() {
  // const users = [];
  const users = [
    {
      id: 1667341222327,
      name: 'Petro',
    },
    {
      id: 1667341225825,
      name: 'Lion',
    },
    {
      id: 1667341228571,
      name: 'Frank',
    },
  ];
  const expenses = [];

  app.get('/users', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.setStatus = 200;
    res.send(users);
  });

  app.post('/users', express.json(), (req, res) => {
    const user = {
      id: null,
      name: '',
    };

    if (req.body.name) {
      user.id = new Date().getTime();
      user.name = req.body.name;
      users.push(user);
      res.setHeader('Content-Type', 'application/json');
      res.setStatus = 201;
      res.send(user);

      return;
    };
    res.statusCode = 400;
    res.send('Bad request');
  });

  app.get('/users/:userId', (req, res) => {
    const { userId } = req.params;

    const foundUser = users.find((person) => person.id === +userId);

    if (!userId) {
      res.statusCode = 400;
      res.send('Bad request');

      return;
    }

    if (!foundUser) {
      res.statusCode = 404;
      res.send('Not found');

      return;
    }
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;
    res.send(foundUser);
  });

  app.delete('/users/:userId', (req, res) => {
    const { userId } = req.params;
    const foundIndex = users.findIndex((person) => person.id === +userId);

    if (foundIndex === -1) {
      res.statusCode = 404;
      res.send('Not found');

      return;
    }

    users.splice(foundIndex, 1);
    res.statusCode = 204;
  });

  app.patch('/users/:userId', express.json(), (req, res) => {
    const { userId } = req.params;
    const foundIndex = users.findIndex((person) => person.id === +userId);

    if (!req.body.name) {
      res.sendStatus(400);

      return;
    }

    if (foundIndex === -1) {
      res.sendStatus(404);

      return;
    }

    users[foundIndex].name = req.body.name;
    res.send(users[foundIndex]);
  });

  app.get('/expenses', (req, res) => {
    if (req.userId && req.categories && req.from && req.to) {
      const currentExpenses = expenses
        .filter((item) => item.userId === req.userId)
        .filter((el) => (
          req.categories.includes(el.category)
        && req.from <= el.spentAt
        && req.to >= el.spentAt));

      res.statusCode = 200;
      res.send(currentExpenses);
    }
  });

  app.post('/expenses', express.json(), (req, res) => {
    if (!req.body) {
      res.sendStatus(400);

      return;
    };

    const expense = {
      id: new Date().getTime(),
      userId: req.body.userId,
      spentAt: req.body.spentAt,
      title: req.body.title,
      amount: req.body.amount,
      category: req.body.category,
      note: req.body.note,
    };

    expenses.push(expense);
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 201;
    res.send(expense);
  });

  app.get('/expenses/:expenseId', (req, res) => {
    const { expenseId } = req.params;
    const foundExpense = expenses.find((ex) => ex.id === +expenseId);

    if (!req.id) {
      res.sendStatus(400);

      return;
    }

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }
    res.send(foundExpense);
  });

  app.delete('/expenses/:expenseId', (req, res) => {
    const { expenseId } = req.params;
    const foundIndex = expenses.findIndex((ex) => ex.id === +expenseId);

    if (foundIndex === -1) {
      res.sendStatus(404);

      return;
    }

    expenses.splice(foundIndex, 1);
    res.sendStatus(204);
  });

  app.patch('/expenses/:expenseId', (req, res) => {
    const { expenseId } = req.params;
    const foundIndex = expenses.findIndex((ex) => ex.id === +expenseId);

    if (!req.id) {
      res.sendStatus(400);

      return;
    }

    if (foundIndex === -1) {
      res.sendStatus(404);

      return;
    }

    res.send(Object.assign(users[foundIndex], req.body));
  });

  return app;
}

module.exports = {
  createServer,
};
