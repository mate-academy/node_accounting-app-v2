/* eslint-disable function-paren-newline */
'use strict';

const uuid = require('uuid');

const express = require('express');

let users = [
  {
    id: 1,
    name: 'Jake',
  },
  {
    id: 2,
    name: 'Jake',
  },
  {
    id: 3,
    name: 'Jake',
  },
];

let expenses = [
  {
    id: 1,
    userId: 1,
    spentAt: new Date(),
    title: 'some',
    amount: 100,
    category: '',
    note: '',
  },
  {
    id: 1,
    userId: 1,
    spentAt: new Date(),
    title: 'someOne',
    amount: 100,
    category: '',
    note: '',
  },
  {
    id: 22,
    userId: 111,
    spentAt: new Date(),
    title: 'some',
    amount: 100,
    category: '',
    note: '',
  },
  {
    id: 11,
    userId: 11,
    spentAt: new Date(),
    title: 'some',
    amount: 100,
    category: '',
    note: '',
  },
];

function createServer() {
  const app = express();

  app.use(express.json());

  app.get('/users', (req, res) => {
    res.send(users);
  });

  app.get('/users/:id', (req, res) => {
    const { id } = req.params;

    const userById = users.find((user) => user.id === +id);

    if (!userById) {
      res.sendStatus(404);

      return;
    }

    res.send(userById);
  });

  app.post('/users', (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(422);

      return;
    }

    const newUser = {
      id: uuid.v4(),
      name,
    };

    users.push(newUser);

    res.statusCode = 201;

    res.send(newUser);
  });

  app.delete('/users/:id', (req, res) => {
    const { id } = req.params;

    if (!users.find((user) => user.id === +id)) {
      res.sendStatus(404);

      return;
    }

    const newUsers = users.filter((user) => user.id !== +id);

    users = newUsers;

    res.sendStatus(204);
  });

  app.patch('/users/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    const userById = users.find((user) => user.id === +id);

    if (!userById) {
      res.sendStatus(404);

      return;
    }

    if (!name) {
      res.sendStatus(422);

      return;
    }

    Object.assign(userById, { name });

    res.statusCode = 200;
    res.send(userById);
  });

  app.get('/expenses', (req, res) => {
    let copyExpenses = [...expenses];
    const { userId, categories, from, to } = req.query;

    if (userId) {
      copyExpenses = copyExpenses.filter(
        (expense) => expense.userId === parseInt(userId),
      );
    }

    if (categories) {
      const categoryList = categories.split(',');

      copyExpenses = copyExpenses.filter((expense) =>
        categoryList.includes(expense.category),
      );
    }

    if (from) {
      copyExpenses = copyExpenses.filter(
        (expense) => new Date(expense.spentAt) >= new Date(from),
      );
    }

    if (to) {
      copyExpenses = copyExpenses.filter(
        (expense) => new Date(expense.spentAt) <= new Date(to),
      );
    }

    res.send(copyExpenses);
  });

  app.get('/expenses/:id', (req, res) => {
    const { id } = req.params;

    const expenseById = expenses.find((expense) => expense.id === +id);

    if (!expenseById) {
      res.sendStatus(404);

      return;
    }

    res.send(expenseById);
  });

  app.post('/expenses', (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (!userId || !spentAt || !title || !amount || !category || !note) {
      res.sendStatus(422);

      return;
    }

    const newExpense = {
      id: uuid.v4(),
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

    if (expenses.find((expense) => expense.id === +id)) {
      const newExpenses = expenses.filter((expense) => expense.id !== +id);

      expenses = newExpenses;

      if (expenses.find((expense) => expense.id === +id)) {
        res.sendStatus(500);

        return;
      }

      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  });

  app.patch('/expenses/:id', (req, res) => {
    const { id } = req.params;

    const expenseById = expenses.find((expense) => expense.id === +id);

    if (!expenseById) {
      res.sendStatus(404);

      return;
    }

    Object.assign(expenseById, req.body);

    res.send(expenseById);
  });

  return app;
}

module.exports = {
  createServer,
};
