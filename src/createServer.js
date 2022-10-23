'use strict';

const express = require('express');

function createServer() {
  // Use express to create a server
  // Add a routes to the server
  // Return the server (express app)

  const app = express();

  let users = [];
  let expenses = [];

  app.get('/expenses', express.json(), (req, res) => {
    const {
      userId,
      categories,
      from,
      to,
    } = req.query;

    const id = +userId;
    const correctUser = users.find(user => user.id === userId);
    const filteredExpenses = expenses.filter(expense =>
      expense.userId === id);

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

    if (correctUser && categories) {
      const expensesCategory = filteredExpenses.filter(
        expense => expense.category === categories
      );

      res.statusCode = 200;
      res.send(expensesCategory);

      return;
    }

    if (correctUser) {
      res.statusCode = 200;
      res.send(filteredExpenses);

      return;
    }

    res.statusCode = 200;
    res.send(expenses);
  });

  app.get('/expenses/:id', express.json(), (req, res) => {
    const { id } = req.params;

    const idExpense = Number(id);
    const correctExpense = expenses.find(expense => expense.id === idExpense);

    if (!correctExpense) {
      res.sendStatus(404);

      return;
    }

    res.statusCode = 200;

    res.send(correctExpense);
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

  app.delete('/expenses/:id', express.json(), (req, res) => {
    const { id } = req.params;
    const correctExpense = expenses.filter(expense => expense.id !== +id);

    if (correctExpense.length === users.length) {
      res.sendStatus(404);

      return;
    }

    expenses = correctExpense;

    res.sendStatus(204);
  });

  app.patch('/expenses/:id', express.json(), (req, res) => {
    const { id } = req.params;
    const correctExpense = expenses.find(expense => expense.id === +id);

    if (typeof +id !== 'number') {
      res.sendStatus(400);

      return;
    }

    if (!correctExpense) {
      res.sendStatus(404);

      return;
    }

    const { title } = req.body;

    if (typeof title !== 'string') {
      res.sendStatus(404);

      return;
    }

    Object.assign(correctExpense, { title });

    res.statusCode = 200;

    res.send(correctExpense);
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
    const correctUser = users.find(user => user.id === id);

    if (!correctUser) {
      res.sendStatus(404);

      return;
    }

    res.statusCode = 200;

    res.send(correctUser);
  });

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

  app.delete('/users/:userId', express.json(), (req, res) => {
    const { userId } = req.params;
    const correctUser = users.filter(user => user.id !== +userId);

    if (correctUser.length === users.length) {
      res.sendStatus(404);

      return;
    }

    users = correctUser;

    res.sendStatus(204);
  });

  app.patch('/users/:userId', express.json(), (req, res) => {
    const { userId } = req.params;
    const correctUser = users.find(user => user.id === +userId);

    if (typeof +userId !== 'number') {
      res.sendStatus(400);

      return;
    }

    if (!correctUser) {
      res.sendStatus(404);

      return;
    }

    const { name } = req.body;

    if (typeof name !== 'string') {
      res.sendStatus(404);

      return;
    }

    Object.assign(correctUser, { name });

    res.statusCode = 200;

    res.send(correctUser);
  });

  return app;
}

module.exports = {
  createServer,
};
