/* eslint-disable max-len */
'use strict';

const express = require('express');
const cors = require('cors');

function createServer() {
  let users = [];
  let expenses = [];

  const app = express();
  const router = express.Router();

  app.use(cors());
  app.use(router);

  router.get('/users', (req, res) => {
    res.status(200).send(users);
  });

  router.get('/users/:userId', (req, res) => {
    const { userId } = req.params;
    const foundUser = users.find(user => user.id === +userId);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    res.status(200).send(foundUser);
  });

  router.post('/users', express.json(), (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    const newUser = {
      name,
      id: generateId(users),
    };

    users.push(newUser);
    res.status(201).send(newUser);
  });

  router.delete('/users/:userId', (req, res) => {
    const { userId } = req.params;
    const filtredUsers = users.filter(user => user.id !== +userId);

    if (filtredUsers.length === users.length) {
      res.sendStatus(404);

      return;
    }

    users = filtredUsers;

    res.sendStatus(204);
  });

  router.patch('/users/:userId', express.json(), (req, res) => {
    const { userId } = req.params;
    const foundUser = users.find(user => user.id === +userId);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    const { name } = req.body;

    if (typeof name !== 'string' || !name) {
      res.sendStatus(400);

      return;
    }

    Object.assign(foundUser, { name });

    res.status(200).send(foundUser);
  });

  router.get('/expenses', (req, res) => {
    const { userId, categories, from, to } = req.query;

    let filtredExpenses = expenses;

    if (userId) {
      filtredExpenses = filtredExpenses.filter(exp => exp.userId === +userId);
    }

    if (categories) {
      filtredExpenses = filtredExpenses.filter(exp => categories.includes(exp.category));
    }

    if (from) {
      const dateFrom = new Date(from);

      filtredExpenses = filtredExpenses.filter(exp => new Date(exp.spentAt) >= dateFrom);
    }

    if (to) {
      const dateTo = new Date(to);

      filtredExpenses = filtredExpenses.filter(exp => new Date(exp.spentAt) <= dateTo);
    }

    res.status(200).send(filtredExpenses);
  });

  router.post('/expenses', express.json(), (req, res) => {
    const { userId, spentAt, title, amount, category } = req.body;
    const foundUser = users.find(user => user.id === +userId);

    if (!foundUser || !title || !spentAt || !amount || !category) {
      res.sendStatus(400);

      return;
    }

    const expense = {
      id: generateId(expenses),
      ...req.body,
    };

    expenses.push(expense);
    res.status(201).send(expense);
  });

  router.delete('/expenses/:id', (req, res) => {
    const { id } = req.params;
    const filtredExpenses = expenses.filter(exp => exp.id !== +id);

    if (filtredExpenses.length === expenses.length) {
      res.sendStatus(404);

      return;
    }

    expenses = filtredExpenses;

    res.sendStatus(204);
  });

  router.get('/expenses/:id', (req, res) => {
    const { id } = req.params;
    const foundExpence = expenses.find(exp => exp.id === +id);

    if (!foundExpence) {
      res.sendStatus(404);

      return;
    }

    res.status(200).send(foundExpence);
  });

  router.patch('/expenses/:id', express.json(), (req, res) => {
    const { id } = req.params;
    const foundExpense = expenses.find(exp => exp.id === +id);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    const expenseNewBody = req.body;

    for (const key in expenseNewBody) {
      if (expenseNewBody.hasOwnProperty('id') || expenseNewBody.hasOwnProperty('userId')) {
        res.sendStatus(400);

        return;
      }

      foundExpense[key] = expenseNewBody[key];
    }

    res.status(200).send(foundExpense);
  });

  return app;
}

function generateId(arr) {
  if (arr.length === 0) {
    return 1;
  }

  const id = Math.max(...arr.map(el => el.id)) + 1;

  return id;
}

module.exports = {
  createServer,
};
