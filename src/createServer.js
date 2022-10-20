'use strict';

const express = require('express');

function createServer() {
  // Use express to create a server
  // Add a routes to the server
  // Return the server (express app)
  const app = express();

  const users = [];

  app.get('/users', express.json(), (req, res) => {
    if (!users) {
      res.statusCode = 200;

      res.send([]);

      return;
    }

    res.statusCode = 200;

    res.send(users);
  });

  app.post('/users', express.json(), (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.statusCode = 400;

      res.send();

      return;
    }

    const user = {
      name,
      id: users.length + 1,
    };

    users.push(user);

    res.statusCode = 201;

    res.send(user);
  });

  app.get('/users/:id', express.json(), (req, res) => {
    const { id } = req.params;

    const foundUser = users.find((user) => user.id === Number(id));

    if (!foundUser) {
      res.statusCode = 404;

      res.send();

      return;
    }

    const userId = Number(id);

    if (Number.isNaN(userId)) {
      res.statusCode = 400;

      res.send();

      return;
    }

    res.statusCode = 200;

    res.send(foundUser);
  });

  app.delete('/users/:id', express.json(), (req, res) => {
    const { id } = req.params;

    const foundUser = users.find((user) => user.id === Number(id));

    if (!foundUser) {
      res.statusCode = 404;

      res.send();

      return;
    }

    const index = users.indexOf(foundUser);

    users.splice(index, 1);

    res.statusCode = 204;

    res.send();
  });

  app.patch('/users/:id', express.json(), (req, res) => {
    const { id } = req.params;

    const foundUser = users.find((user) => user.id === Number(id));

    if (!foundUser) {
      res.statusCode = 404;

      res.send();

      return;
    }

    const { name } = req.body;

    if (!name) {
      res.statusCode = 400;

      res.send();

      return;
    }

    foundUser.name = name;

    res.statusCode = 200;

    res.send(foundUser);
  });

  const expenses = [];

  app.get('/expenses', express.json(), (req, res) => {
    const { userId, category, from, to } = req.query;

    if (category) {
      const foundExpenses = expenses.filter(
        (expense) => expense.category === category
      );

      res.statusCode = 200;

      res.send(foundExpenses);

      return;
    }

    if (userId) {
      const foundExpenses = expenses.filter(
        (expense) => expense.userId === Number(userId)
      );

      res.statusCode = 200;

      res.send(foundExpenses);

      return;
    }

    if (from && to) {
      const foundExpenses = expenses.filter(
        (expense) => expense.spentAt >= from && expense.spentAt <= to
      );

      res.statusCode = 200;

      res.send(foundExpenses);

      return;
    }

    res.statusCode = 200;

    res.send(expenses);
  });

  app.post('/expenses', express.json(), (req, res) => {
    const { userId } = req.body;

    const foundUser = users.find((user) => user.id === Number(userId));

    if (!foundUser) {
      res.statusCode = 400;

      res.send();

      return;
    }

    const newExpense = {
      id: expenses.length + 1,
      ...req.body,
    };

    expenses.push(newExpense);

    res.statusCode = 201;

    res.send(newExpense);
  });

  app.get('/expenses/:expenseId', (req, res) => {
    const { expenseId } = req.params;

    const foundExpense = expenses.find(
      (expense) => expense.id === Number(expenseId)
    );

    if (!foundExpense) {
      res.statusCode = 404;

      res.send();

      return;
    }

    res.statusCode = 200;

    res.send(foundExpense);
  });

  app.delete('/expenses/:expenseId', (req, res) => {
    const { expenseId } = req.params;

    const filteredExpenses = expenses.filter(
      (expense) => expense.id !== Number(expenseId)
    );

    if (filteredExpenses.length === expenses.length) {
      res.statusCode = 404;

      res.send();

      return;
    }

    expenses.splice(0, expenses.length, ...filteredExpenses);

    res.statusCode = 204;

    res.send();
  });

  app.patch('/expenses/:expenseId', express.json(), (req, res) => {
    const { expenseId } = req.params;

    const foundExpense = expenses.find(
      (expense) => expense.id === Number(expenseId)
    );

    if (!foundExpense) {
      res.statusCode = 404;

      res.send();

      return;
    }

    Object.assign(foundExpense, req.body);

    res.statusCode = 200;

    res.send(foundExpense);
  });

  return app;
}

module.exports = {
  createServer,
};
