/* eslint-disable no-console */
'use strict';

const express = require('express');

function createServer() {
  const app = express();

  app.use(express.json());

  let users = [];
  let expenses = [];
  // Users

  app.get('/users', (req, res) => {
    res.send(users);
  });

  app.get('/users/:userId', (req, res) => {
    const { userId } = req.params;
    const foundUser = users.find((user) => user.id === +userId);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }
    res.send(foundUser);
  });

  app.post('/users', (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    const newUser = {
      id: Math.random(users.length + 1),
      name,
    };

    users.push(newUser);

    res.statusCode = 201;
    res.send(newUser);
  });

  app.delete('/users/:userId', (req, res) => {
    const { userId } = req.params;
    const filteredUsers = users.filter((user) => user.id !== +userId);

    if (users.length === filteredUsers.length) {
      res.sendStatus(404);

      return;
    }

    users = filteredUsers;
    res.sendStatus(204);
  });

  app.patch('/users/:userId', (req, res) => {
    const { userId } = req.params;
    const { name } = req.body;
    const foundUser = users.find((user) => user.id === +userId);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    foundUser.name = name;
    res.send(foundUser);
  });

  // Expenses
  app.get('/expenses', (req, res) => {
    const { userId, categories, from, to } = req.query;

    if (userId) {
      expenses = expenses
        .filter((expense) => expense.userId === +userId);
    };

    if (categories) {
      expenses = expenses
        .filter((expense) => categories.includes(expense.category));
    }

    if (from && to) {
      expenses = expenses.filter(({ spentAt }) => (
        spentAt >= from && spentAt <= to
      ));
    }

    res.send(expenses);
  });

  app.get('/expenses/:expenseId', (req, res) => {
    const { expenseId } = req.params;
    const foundExpense = expenses.find((expense) => expense.id === +expenseId);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }
    res.send(foundExpense);
  });

  app.post('/expenses', (req, res) => {
    const {
      userId,
      title,
    } = req.body;

    const checkOnUser = users.find((user) => user.id === userId);

    if (!checkOnUser || !title) {
      res.sendStatus(400);

      return;
    }

    const newExpence = {
      id: Math.random(expenses.length + 1),
      ...req.body,
    };

    expenses.push(newExpence);

    res.statusCode = 201;
    res.send(newExpence);
  });

  app.delete('/expenses/:expenseId', (req, res) => {
    const { expenseId } = req.params;
    const filteredExpenses = expenses
      .filter((expense) => expense.id !== +expenseId);

    if (expenses.length === filteredExpenses.length) {
      res.sendStatus(404);

      return;
    }

    expenses = filteredExpenses;
    res.sendStatus(204);
  });

  app.patch('/expenses/:expenseId', (req, res) => {
    const { expenseId } = req.params;
    const {
      ...data
    } = req.body;
    const foundExpense = expenses.find((expense) => expense.id === +expenseId);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    Object.assign(foundExpense, { ...data });

    res.send(foundExpense);
  });

  return app;
}

module.exports = {
  createServer,
};
