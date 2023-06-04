'use strict';

const express = require('express');

function createServer() {
  const app = express();

  let users = [];
  let expenses = [];

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

  app.post('/users', express.json(), (req, res) => {
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

  app.patch('/users/:userId', express.json(), (req, res) => {
    const { userId } = req.params;
    const { name } = req.body;
    const foundUser = users.find((user) => user.id === +userId);

    Object.assign(foundUser, { name });

    res.send(foundUser);
  });

  app.delete('/users/:userId', (req, res) => {
    const { userId } = req.params;
    const filteredUsers = users.filter(user => user.id !== +userId);

    if (filteredUsers.length === users.length) {
      res.sendStatus(404);

      return;
    }

    users = filteredUsers;
    res.statusCode = 204;
    res.send();
  });

  app.get('/expenses', (req, res) => {
    const { userId, categories, from, to } = req.query;

    if (userId) {
      expenses = expenses.filter(expense => +userId === expense.userId);
    }

    if (categories) {
      expenses = expenses.filter(expense => expense.category === categories);
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

  app.post('/expenses', express.json(), (req, res) => {
    const {
      userId,
      title,
    } = req.body;

    const hasUser = users.find(user => user.id === userId);

    const newExpense = {
      id: Math.random(users.length + 1),
      ...req.body,
    };

    if (!title || !hasUser) {
      res.sendStatus(400);

      return;
    }

    expenses.push(newExpense);

    res.statusCode = 201;
    res.send(newExpense);
  });

  app.patch('/expenses/:expenseId', express.json(), (req, res) => {
    const { expenseId } = req.params;
    const data = req.body;
    const foundExpense = expenses.find((expense) => expense.id === +expenseId);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    Object.assign(foundExpense, data);

    res.statusCode = 200;
    res.send(foundExpense);
  });

  app.delete('/expenses/:expenseId', (req, res) => {
    const { expenseId } = req.params;
    const filteredExpenses = expenses.filter(
      expense => expense.id !== +expenseId
    );

    if (filteredExpenses.length === users.length) {
      res.sendStatus(404);

      return;
    }

    expenses = filteredExpenses;
    res.statusCode = 204;
    res.send();
  });

  return app;
}

module.exports = {
  createServer,
};
