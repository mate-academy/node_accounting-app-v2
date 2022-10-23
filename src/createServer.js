'use strict';

const express = require('express');

function createServer() {
  const app = express();
  let users = [];
  let expenses = [];

  app.post('/users', express.json(), (req, res) => {
    const { name } = req.body;
    const newUser = {
      id: Math.floor(Math.random() * 10),
      name,
    };

    if (!name) {
      res.sendStatus(400);

      return;
    }

    users.push(newUser);

    res.statusCode = 201;
    res.send(newUser);
  });

  app.get('/users', express.json(), (req, res) => {
    if (!users.length) {
      res.send([]);

      return;
    }
    res.statusCode = 200;
    res.send(users);
  });

  app.get('/users/:userId', express.json(), (req, res) => {
    const { userId } = req.params;

    const id = Number(userId);
    const foundUser = users.find(user => user.id === id);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    res.statusCode = 200;

    res.send(foundUser);
  });

  app.patch('/users/:userId', express.json(), (req, res) => {
    const { userId } = req.params;
    const foundUser = users.find(user => user.id === +userId);

    if (typeof +userId !== 'number') {
      res.sendStatus(400);

      return;
    }

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    const { name } = req.body;

    if (typeof name !== 'string') {
      res.sendStatus(404);

      return;
    }

    Object.assign(foundUser, { name });

    res.statusCode = 200;

    res.send(foundUser);
  });

  app.delete('/users/:userId', express.json(), (req, res) => {
    const { userId } = req.params;
    const filterUser = users.filter(user => user.id !== +userId);

    if (filterUser.length === users.length) {
      res.sendStatus(404);

      return;
    }

    users = filterUser;

    res.sendStatus(204);
  });

  app.post('/expenses', express.json(), (req, res) => {
    const { userId } = req.body;
    const newExpense = {
      id: Math.floor(Math.random() * 10),
      ...req.body,
    };

    if (!users.some(user => user.id === userId)) {
      res.sendStatus(400);

      return;
    }

    expenses.push(newExpense);

    res.statusCode = 201;
    res.send(newExpense);
  });

  app.get('/expenses', express.json(), (req, res) => {
    const {
      userId,
      category,
      from,
      to,
    } = req.query;

    const idNumber = +userId;
    const foundUser = users.find(user => user.id === idNumber);
    const filterExpenses = expenses.filter(
      expense => expense.userId === idNumber
    );

    if (typeof idNumber !== 'number') {
      res.sendStatus(404);

      return;
    }

    if (!expenses.length) {
      res.send([]);

      return;
    }

    if (from && to) {
      const expensesFromData = expenses.filter(
        expense => expense.spentAt >= from && expense.spentAt <= to
      );

      res.statusCode = 200;
      res.send(expensesFromData);

      return;
    }

    if (foundUser && category) {
      const expensesCategory = filterExpenses.filter(
        expense => expense.category === category
      );

      res.statusCode = 200;
      res.send(expensesCategory);

      return;
    }

    if (foundUser) {
      res.statusCode = 200;
      res.send(filterExpenses);

      return;
    }

    res.statusCode = 200;
    res.send(expenses);
  });

  app.get('/expenses/:id', express.json(), (req, res) => {
    const { id } = req.params;

    const idNumber = Number(id);
    const foundExpense = expenses.find(expense => expense.id === idNumber);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    res.statusCode = 200;

    res.send(foundExpense);
  });

  app.patch('/expenses/:id', express.json(), (req, res) => {
    const { id } = req.params;
    const foundExpense = expenses.find(expense => expense.id === +id);

    if (typeof +id !== 'number') {
      res.sendStatus(400);

      return;
    }

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    const { title } = req.body;

    if (typeof title !== 'string') {
      res.sendStatus(404);

      return;
    }

    Object.assign(foundExpense, { title });

    res.statusCode = 200;

    res.send(foundExpense);
  });

  app.delete('/expenses/:id', express.json(), (req, res) => {
    const { id } = req.params;
    const filterExpenses = expenses.filter(expense => expense.id !== +id);

    if (filterExpenses.length === users.length) {
      res.sendStatus(404);

      return;
    }

    expenses = filterExpenses;

    res.sendStatus(204);
  });

  return app;
}

module.exports = {
  createServer,
};
