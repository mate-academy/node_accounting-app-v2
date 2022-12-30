'use strict';
// const { v4: uuidv4 } = require('uuid');

const express = require('express');

function createServer() {
  // Use express to create a server
  // Add a routes to the server
  // Return the server (express app)
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

    const id = +userId;
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
    const filteredUsers = users.filter(user => user.id !== +userId);

    if (filteredUsers.length === users.length) {
      res.sendStatus(404);

      return;
    }

    users = filteredUsers;

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
    const { userId, category, from, to } = req.query;

    const foundUser = users.find(user => user.id === +userId);
    const filteredExpenses = expenses.filter(
      expense => expense.userId === +userId
    );

    if (typeof +userId !== 'number') {
      res.sendStatus(404);

      return;
    }

    if (!expenses.length) {
      res.send([]);

      return;
    }

    if (from && to) {
      const expensesFromData = expenses.filter(
        expense => expense.spentAt >= from && expense.spentAt < to
      );

      res.statusCode = 200;
      res.send(expensesFromData);

      return;
    }

    if (foundUser && category) {
      const expensesCategory = filteredExpenses.filter(
        expense => expense.category === category
      );

      res.statusCode = 200;
      res.send(expensesCategory);

      return;
    }

    if (foundUser) {
      res.statusCode = 200;
      res.send(filteredExpenses);

      return;
    }

    res.statusCode = 200;
    res.send(expenses);
  });

  app.get('/expenses/:id', express.json(), (req, res) => {
    const { id } = req.params;
    const foundExpense = expenses.find(expense => expense.id === +id);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    res.statusCode = 200;

    res.send(foundExpense);
  });

  app.patch('/expenses/:id', express.json(), (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    const foundExpense = expenses.find(expense => expense.id === +id);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    Object.assign(foundExpense, { title });

    res.statusCode = 200;

    res.send(foundExpense);
  });

  app.delete('/expenses/:id', express.json(), (req, res) => {
    const { id } = req.params;
    const filteredExpenses = expenses.filter(expense => expense.id !== +id);

    if (filteredExpenses.length === users.length) {
      res.sendStatus(404);

      return;
    }

    expenses = filteredExpenses;

    res.sendStatus(204);
  });

  return app;
}

module.exports = {
  createServer,
};
