'use strict';

const express = require('express');

function createServer() {
  const app = express();

  let users = [];
  let expenses = [];

  app.get('/users', (req, res) => {
    res.send(users);
  });

  app.post('/users', express.json(), (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    const maxId = users.length ? Math.max(...users.map(user => user.id)) : 0;
    const newUser = {
      id: maxId + 1,
      name,
    };

    users.push(newUser);

    res.statusCode = 201;
    res.send(newUser);
  });

  app.get('/users/:userId', (req, res) => {
    const { userId } = req.params;
    const foundUser = users.find(user => user.id === +userId);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    res.statusCode = 200;
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
    res.sendStatus(204);
  });

  app.patch('/users/:userId', express.json(), (req, res) => {
    const { userId } = req.params;
    const foundUser = users.find((user) => user.id === +userId);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    const { name } = req.body;

    if (typeof name !== 'string') {
      res.sendStatus(422);

      return;
    }

    Object.assign(foundUser, { name });

    res.send(foundUser);
  });

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

      res.send(filteredExpenses);

      return;
    }

    if (from && to) {
      const filteredExpenses = expenses.filter((expense) =>
        expense.spentAt > from && expense.spentAt < to
      );

      res.send(filteredExpenses);

      return;
    }

    res.statusCode = 200;

    if (userId) {
      const filteredExpenses = expenses.filter(expense =>
        expense.userId === +userId);

      res.send(filteredExpenses);
      res.statusCode = 200;

      return;
    }

    res.send(expenses);
  });

  app.post('/expenses', express.json(), (req, res) => {
    const {
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    } = req.body;
    const foundUser = users.find(user => user.id === userId);

    if (!foundUser) {
      res.sendStatus(400);

      return;
    }

    if (!spentAt || !title || !amount || !category) {
      res.sendStatus(400);

      return;
    }

    const maxId = expenses.length
      ? Math.max(...expenses.map(expense => expense.id))
      : 0;
    const newExpense = {
      id: maxId + 1,
      userId,
      spentAt,
      title,
      amount,
      category,
      note: note || '',
    };

    expenses.push(newExpense);

    res.statusCode = 201;
    res.send(newExpense);
  });

  app.get('/expenses/:expenseId', (req, res) => {
    const { expenseId } = req.params;
    const foundExpense = expenses.find(expense => expense.id === +expenseId);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    res.statusCode = 200;
    res.send(foundExpense);
  });

  app.delete('/expenses/:expenseId', (req, res) => {
    const { expenseId } = req.params;
    const filteredExpenses = expenses
      .filter(expense => expense.id !== +expenseId);

    if (filteredExpenses.length === users.length) {
      res.sendStatus(404);

      return;
    }

    expenses = filteredExpenses;
    res.sendStatus(204);
  });

  app.patch('/expenses/:expenseId', express.json(), (req, res) => {
    const { expenseId } = req.params;
    const foundExpense = expenses.find((expense) => expense.id === +expenseId);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    if (!req.body) {
      res.sendStatus(400);

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
