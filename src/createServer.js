'use strict';

const express = require('express');
const cors = require('cors');

function createServer() {
  const app = express();

  let users = [];
  let expenses = [];

  app.use(cors());

  app.get('/users', (req, res) => {
    if (!users) {
      res.statusCode = 200;

      res.send([]);

      return;
    }

    res.statusCode = 200;
    res.send(users);
  });

  app.get('/users/:userId', (req, res) => {
    const { userId } = req.params;
    const foundUser = users.find(user => user.id === +userId);

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
      id: Math.max(0, ...users.map(({ id }) => id + 1)),
      name,
    };

    users.push(newUser);

    res.statusCode = 201;
    res.send(newUser);
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
    const { name } = req.body;

    const foundUser = users.find(user => user.id === +userId);

    if (!foundUser) {
      res.statusCode = 404;

      return;
    }

    if (typeof name !== 'string') {
      res.sendStatus(400);

      return;
    }

    Object.assign(foundUser, { name });

    res.send(foundUser);
  });

  app.get('/expenses', (req, res) => {
    const { userId, category, to, from } = req.query;

    if (from && to) {
      const foundExpensesByDate = expenses.filter(
        (expense) => expense.spentAt > from
          && expense.spentAt < to
      );

      res.send(foundExpensesByDate);
      res.statusCode = 200;

      return;
    }

    if (category) {
      const foundExpensesByCategory = expenses.filter(
        (expense) =>
          expense.userId === +userId
          && expense.category === category
      );

      res.send(foundExpensesByCategory);
      res.statusCode = 200;

      return;
    }

    if (userId) {
      const foundExpensesByUserId = expenses.filter(
        (expense) => expense.userId === +userId
      );

      res.send(foundExpensesByUserId);
      res.statusCode = 200;

      return;
    }

    res.statusCode = 200;

    res.send(expenses);
  });

  app.get('/expenses/:expenseId', (req, res) => {
    const { expenseId } = req.params;

    if (typeof +expenseId !== 'number') {
      res.sendStatus(400);

      return;
    }

    const foundExpense = expenses.find(expense => expense.id === +expenseId);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    res.statusCode = 200;

    res.send(foundExpense);
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

    const newExpense = {
      userId,
      spentAt,
      title,
      amount,
      category,
      id: Math.max(0, ...users.map(({ id }) => id + 1)),
      note,
    };

    const foundUser = users.find((user) => user.id === +userId);

    if (!foundUser) {
      res.sendStatus(400);

      return;
    }

    expenses.push(newExpense);

    res.statusCode = 201;

    res.send(newExpense);
  });

  app.delete('/expenses/:expenseId', (req, res) => {
    const { expenseId } = req.params;

    const filteredExpenses = expenses
      .filter(expense => expense.id !== +expenseId);

    if (filteredExpenses.length === expenses.length) {
      res.sendStatus(404);

      return;
    }

    expenses = filteredExpenses;

    res.sendStatus(204);
  });

  app.patch('/expenses/:expenseId', express.json(), (req, res) => {
    const { expenseId } = req.params;
    const { title } = req.body;

    const foundExpense = expenses.find(expense => expense.id === +expenseId);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    if (typeof title !== 'string') {
      res.sendStatus(400);

      return;
    }

    Object.assign(foundExpense, { title });

    res.send(foundExpense);
  });

  return app;
}

module.exports = {
  createServer,
};
