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

    const findUser = users.find((user) => user.id === Number(id));

    if (!findUser) {
      res.statusCode = 404;

      res.send();

      return;
    }

    if (Number.isNaN(Number(id))) {
      res.statusCode = 400;

      res.send();

      return;
    }

    res.statusCode = 200;

    res.send(findUser);
  });

  app.delete('/users/:id', express.json(), (req, res) => {
    const { id } = req.params;

    const findUser = users.find((user) => user.id === Number(id));

    if (!findUser) {
      res.statusCode = 404;

      res.send();

      return;
    }

    if (Number.isNaN(Number(id))) {
      res.statusCode = 400;

      res.send();

      return;
    }

    users.splice(users.indexOf(findUser), 1);

    res.statusCode = 204;

    res.send();
  });

  app.patch('/users/:id', express.json(), (req, res) => {
    const { id } = req.params;

    const findUser = users.find((user) => user.id === Number(id));

    if (!findUser) {
      res.statusCode = 404;

      res.send();

      return;
    }

    if (Number.isNaN(Number(id))) {
      res.statusCode = 400;

      res.send();

      return;
    }

    const { name } = req.body;

    if (!name) {
      res.statusCode = 400;

      res.send();

      return;
    }

    findUser.name = name;

    res.statusCode = 200;

    res.send(findUser);
  });

  const expenses = [];

  app.get('/expenses', express.json(), (req, res) => {
    const { userId, category, from, to } = req.query;

    if (category) {
      const filteredExpenses = expenses.filter(
        (expense) => expense.category === category
      );

      res.statusCode = 200;

      res.send(filteredExpenses);

      return;
    }

    if (userId) {
      const filteredExpenses = expenses.filter(
        (expense) => expense.userId === Number(userId)
      );

      res.statusCode = 200;

      res.send(filteredExpenses);

      return;
    }

    if (from && to) {
      const filteredExpenses = expenses.filter(
        (expense) => expense.spentAt >= from && expense.spentAt <= to
      );

      res.statusCode = 200;

      res.send(filteredExpenses);

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

    const findExpense = expenses.find(
      (expense) => expense.id === Number(expenseId)
    );

    if (!findExpense) {
      res.statusCode = 404;

      res.send();

      return;
    }

    res.statusCode = 200;

    res.send(findExpense);
  });

  app.delete('/expenses/:expenseId', (req, res) => {
    const { expenseId } = req.params;

    const filterExpense = expenses.filter(
      (expense) => expense.id !== Number(expenseId)
    );

    if (filterExpense.length === expenses.length) {
      res.statusCode = 404;

      res.send();

      return;
    }

    expenses.splice(0, expenses.length, ...filterExpense);

    res.statusCode = 204;

    res.send();
  });

  app.patch('/expenses/:expenseId', express.json(), (req, res) => {
    const { expenseId } = req.params;

    const findExpense = expenses.find(
      (expense) => expense.id === Number(expenseId)
    );

    if (!findExpense) {
      res.statusCode = 404;

      res.send();

      return;
    }

    Object.assign(findExpense, req.body);

    res.statusCode = 200;

    res.send(findExpense);
  });

  return app;
}

module.exports = {
  createServer,
};
