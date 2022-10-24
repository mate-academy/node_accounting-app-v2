'use strict';

const cors = require('cors');
const express = require('express');

function createServer() {
  let expenses = [];
  let users = [];
  const app = express();

  app.use(cors());
  app.use(express.json());

  // users endpoints

  app.get('/users', (req, res) => {
    res.send(users);
  });

  app.get('/users/:id', (req, res) => {
    const { id } = req.params;

    const foundUser = users.find((user) => user.id === Number(id));

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    res.statusCode = 200;
    res.send(foundUser);
  });

  app.post('/users', (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    const newUser = {
      id: users.length + 1,
      name,
    };

    users.push(newUser);

    res.statusCode = 201;
    res.send(newUser);
  });

  app.delete('/users/:id', (req, res) => {
    const { id } = req.params;

    const withoutDelited = users.filter((user) => user.id !== Number(id));

    if (withoutDelited.length === users.length) {
      res.sendStatus(404);

      return;
    }

    users = withoutDelited;
    res.sendStatus(204);
  });

  app.patch('/users/:id', (req, res) => {
    const { id } = req.params;

    const foundUser = users.find((user) => user.id === Number(id));

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    const { name } = req.body;

    if (typeof name !== 'string') {
      res.status(422);

      return;
    }

    Object.assign(foundUser, { name });

    res.send(foundUser);
    res.statusCode = 200;
  });

  // expenses endpoints

  app.get('/expenses', (req, res) => {
    const {
      userId,
      category,
      from,
      to,
    } = req.query;

    if (category) {
      const filteredExpenses = expenses
        .filter(expense => expense.category === category);

      res.statusCode = 200;
      res.send(filteredExpenses);

      return;
    }

    if (from && to) {
      const filteredExpenses = expenses
        .filter((expense) =>
          expense.spentAt > from && expense.spentAt < to
        );

      res.send(filteredExpenses);

      return;
    }

    if (userId) {
      const foundUser = expenses
        .filter(expense => expense.userId === Number(userId));

      res.send(foundUser);
      res.statusCode = 200;

      return;
    }

    res.send(expenses);
  });

  app.get('/expenses/:id', (req, res) => {
    const { id } = req.params;

    const foundExpense = expenses.find((expense) => expense.id === Number(id));

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    res.statusCode = 200;
    res.send(foundExpense);
  });

  app.post('/expenses', (req, res) => {
    const {
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    } = req.body;

    const foundUser = users.find((user) => user.id === Number(userId));

    if (!foundUser) {
      res.sendStatus(400);

      return;
    }

    const newExpense = {
      id: expenses.length + 1,
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    };

    expenses.push(newExpense);

    res.statusCode = 201;
    res.send(newExpense);
  });

  app.delete('/expenses/:id', (req, res) => {
    const { id } = req.params;

    const withoutDelited = expenses
      .filter((expense) => expense.id !== Number(id));

    if (withoutDelited.length === expenses.length) {
      res.sendStatus(404);

      return;
    }

    expenses = withoutDelited;
    res.sendStatus(204);
  });

  app.patch('/expenses/:id', (req, res) => {
    const { id } = req.params;

    const foundExpense = expenses.find(
      (expense) => expense.id === Number(id));

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    Object.assign(foundExpense, req.body);

    res.send(foundExpense);
    res.statusCode = 200;
  });

  // Use express to create a server
  // Add a routes to the server
  // Return the server (express app)

  return app;
}

module.exports = {
  createServer,
};
