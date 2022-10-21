'use strict';

const express = require('express');
const expenseServise = require('./services/expenses.js');
const userServise = require('./services/users.js');

function createServer() {
  const app = express();

  expenseServise.init();
  userServise.init();

  app.post('/expenses', express.json(), (req, res) => {
    const {
      userId,
      title,
    } = req.body;

    if (!title || !userServise.exist(userId)) {
      res.sendStatus(400);

      return;
    }

    const newExpense = {
      ...req.body,
      id: Math.floor(Math.random() * 10),
    };

    expenseServise.add(newExpense);

    res.statusCode = 201;

    res.send(newExpense);
  });

  app.get('/expenses', express.json(), (req, res) => {
    const expenses = expenseServise.getAll();

    const {
      userId,
      category,
      from,
      to,
    } = req.query;

    const id = Number(userId);

    if (typeof id !== 'number') {
      res.sendStatus(400);

      return;
    }

    res.statusCode = 200;

    if (!expenses.length) {
      res.send([]);

      return;
    }

    if (from && to) {
      const userExpenses = expenseServise.filter(
        expense => expense.spentAt > from && expense.spentAt < to
      );

      res.send(userExpenses);

      return;
    }

    if (userServise.findById(id)) {
      let userExpenses = expenseServise.filter(
        expense => expense.userId === id
      );

      if (category) {
        userExpenses = userExpenses.filter(
          expense => expense.category === category
        );
      }

      res.send(userExpenses);

      return;
    }

    res.send(expenseServise.getAll());
  });

  app.get('/expenses/:id', express.json(), (req, res) => {
    const expenseId = Number(req.params.id);

    if (typeof expenseId !== 'number') {
      res.sendStatus(400);

      return;
    }

    const foundExpense = expenseServise.findById(expenseId);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    res.statusCode = 200;

    res.send(foundExpense);
  });

  app.patch('/expenses/:id', express.json(), (req, res) => {
    const expenseId = Number(req.params.id);

    if (typeof expenseId !== 'number') {
      res.sendStatus(400);

      return;
    }

    const foundExpense = expenseServise.findById(expenseId);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    expenseServise.update(foundExpense, req.body);

    res.statusCode = 200;

    res.send(foundExpense);
  });

  app.delete('/expenses/:id', express.json(), (req, res) => {
    const expenseId = Number(req.params.id);

    const foundExpense = expenseServise.findById(expenseId);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    expenseServise.remove(expenseId);
    res.sendStatus(204);
  });

  app.post('/users', express.json(), (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    const newUser = {
      id: Math.floor(Math.random() * 10),
      name,
    };

    userServise.add(newUser);

    res.statusCode = 201;
    res.send(newUser);
  });

  app.get('/users', express.json(), (req, res) => {
    const users = userServise.getAll();

    res.statusCode = 200;

    if (!users) {
      res.send([]);

      return;
    }

    res.send(users);
  });

  app.get('/users/:id', express.json(), (req, res) => {
    const userId = Number(req.params.id);

    if (typeof userId !== 'number') {
      res.sendStatus(400);

      return;
    }

    const foundUser = userServise.findById(userId);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    res.statusCode = 200;

    res.send(foundUser);
  });

  app.patch('/users/:id', express.json(), (req, res) => {
    const userId = Number(req.params.id);

    if (typeof userId !== 'number') {
      res.sendStatus(400);

      return;
    }

    const foundUser = userServise.findById(userId);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    userServise.update(foundUser, { ...req.body });

    res.statusCode = 200;

    res.send(foundUser);
  });

  app.delete('/users/:id', express.json(), (req, res) => {
    const userId = Number(req.params.id);

    const foundUser = userServise.findById(userId);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    userServise.remove(foundUser.id);
    res.sendStatus(204);
  });

  return app;
}

module.exports = {
  createServer,
};
