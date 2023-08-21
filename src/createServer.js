'use strict';

const express = require('express');
const cors = require('cors');

function nextId(items) {
  if (!items.length) {
    return 0;
  }

  return Math.max(...items.map(({ id }) => id)) + 1;
}

function createServer() {
  let users = [];
  // eslint-disable-next-line prefer-const
  let expenses = [];

  const app = express();

  app.use(cors());

  // #region users

  app.get('/users', (req, res) => {
    res.send(users);
  });

  app.get('/users/:userId', (req, res) => {
    const userId = +req.params.userId;
    const foundUser = users.find(user => user.id === userId);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    res.send(foundUser);
  });

  app.delete('/users/:userId', (req, res) => {
    const userId = +req.params.userId;
    const foundUser = users.find(user => user.id === userId);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    users = users.filter(user => user.id !== foundUser.id);
    res.sendStatus(204);
  });

  app.post('/users', express.json(), (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    const newUser = {
      name,
      id: nextId(users),
    };

    users.push(newUser);

    res.statusCode = 201;
    res.send(newUser);
  });

  app.patch('/users/:userId', express.json(), (req, res) => {
    const userId = +req.params.userId;
    const { name } = req.body;

    const foundUser = users.find(user => user.id === userId);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    if (!name) {
      res.sendStatus(400);

      return;
    }

    const updatedUser = {
      name,
      id: +userId,
    };

    users = users.map(user => user.id === +userId ? updatedUser : user);

    res.send(updatedUser);
  });

  // #endregion

  app.get('/expenses', (req, res) => {
    const { userId, from, to, categories } = req.query;
    let filteredExpenses = expenses;

    if (userId) {
      filteredExpenses = filteredExpenses.filter(
        expense => expense.userId === +userId
      );
    }

    if (categories) {
      filteredExpenses = filteredExpenses.filter(
        expense => expense.category === categories
      );
    }

    if (from) {
      const dateFrom = new Date(from);

      filteredExpenses = filteredExpenses.filter(expense => {
        const spentDate = new Date(expense.spentAt);

        return dateFrom <= spentDate;
      });
    }

    if (to) {
      const dateFrom = new Date(to);

      filteredExpenses = filteredExpenses.filter(expense => {
        const spentDate = new Date(expense.spentAt);

        return dateFrom >= spentDate;
      });
    }

    res.send(filteredExpenses);
  });

  app.get('/expenses/:expenseId', (req, res) => {
    const expenseId = +req.params.expenseId;
    const foundExpense = expenses.find(({ id }) => id === expenseId);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    res.send(foundExpense);
  });

  app.delete('/expenses/:expenseId', (req, res) => {
    const expenseId = +req.params.expenseId;
    const foundExpense = expenses.find(({ id }) => id === expenseId);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    expenses = expenses.filter(({ id }) => id !== foundExpense.id);
    res.sendStatus(204);
  });

  app.post('/expenses', express.json(), (req, res) => {
    const { title, userId } = req.body;

    const user = users.find(({ id }) => id === userId);

    if (!title || !user) {
      res.sendStatus(400);

      return;
    }

    const newExpense = {
      id: nextId(expenses),
      ...req.body,
    };

    expenses.push(newExpense);

    res.statusCode = 201;
    res.send(newExpense);
  });

  app.patch('/expenses/:expenseId', express.json(), (req, res) => {
    const expenseId = +req.params.expenseId;
    const data = req.body;

    const expense = expenses.find(({ id }) => id === expenseId);

    if (!expense) {
      res.sendStatus(404);

      return;
    }

    for (const key in data) {
      expense[key] = data[key];
    }

    res.statusCode = 200;
    res.send(expense);
  });

  return app;
}

module.exports = {
  createServer,
};
