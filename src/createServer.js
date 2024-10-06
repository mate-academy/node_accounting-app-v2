'use strict';

const express = require('express');
const cors = require('cors');
const { createAPI } = require('./utils/createAPI');

function createServer() {
  const app = express();
  let expenses = [];
  let users = [];
  const usersAPI = createAPI(users);
  const expensesAPI = createAPI(expenses);

  function filterExpenses(params) {
    const { userId, categories, from, to } = params;
    let expensesCopy = [...expenses];

    if (userId) {
      expensesCopy = expensesCopy.filter(
        (expense) => expense.userId === +userId,
      );
    }

    if (categories) {
      expensesCopy = expensesCopy.filter((expense) =>
        categories.includes(expense.category));
    }

    if (from) {
      expensesCopy = expensesCopy.filter((expense) => expense.spentAt > from);
    }

    if (to) {
      expensesCopy = expensesCopy.filter((expense) => expense.spentAt < to);
    }

    return expensesCopy;
  }

  app.use(cors());
  app.use(express.json());

  app.get('/', (req, res) => {
    res.send('Node js accounting!');
  });

  app.get('/users', (req, res) => {
    res.statusCode = 200;
    res.send(users);
  });

  app.post('/users', (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);
    }

    const rawUser = {
      name,
    };

    const user = usersAPI.add(rawUser);

    res.statusCode = 201;
    res.send(user);
  });

  app.get('/users/:id', (req, res) => {
    const { id } = req.params;

    if (!id) {
      res.sendStatus(400);
    }

    const user = usersAPI.get(+id);

    if (!user) {
      res.sendStatus(404);
    }

    res.send(user);
  });

  app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    const user = usersAPI.get(+id);

    if (!user) {
      res.sendStatus(404);

      return;
    }

    usersAPI.delete(+id);
    res.sendStatus(204);
  });

  app.patch('/users/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    if (!id || !name) {
      res.sendStatus(400);
    }

    const user = usersAPI.get(+id);

    if (!user) {
      res.sendStatus(404);
    }

    const newUser = {
      id: +id,
      name,
    };

    users = usersAPI.update(newUser);

    res.send(newUser);
  });

  app.get('/expenses', (req, res) => {
    const { userId, categories, from, to } = req.query;

    if (userId || categories || from || to) {
      res.statusCode = 200;
      res.send(filterExpenses(req.query));

      return;
    }

    res.statusCode = 200;
    res.send(expenses);
  });

  app.post('/expenses', (req, res) => {
    const { userId, category, spentAt, title, amount, note } = req.body;
    const user = users.find((tempUser) => tempUser.id === userId);

    if (!user || !category || !spentAt || !title || !amount) {
      res.sendStatus(400);

      return;
    }

    const rawExpense = {
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    };

    const expense = expensesAPI.add(rawExpense);

    res.statusCode = 201;
    res.send(expense);
  });

  app.get('/expenses/:id', (req, res) => {
    const { id } = req.params;
    const expense = expensesAPI.get(+id);

    if (!expense) {
      res.sendStatus(404);

      return;
    }

    res.statusCode = 200;
    res.send(expense);
  });

  app.delete('/expenses/:id', (req, res) => {
    const { id } = req.params;
    const expense = expensesAPI.get(+id);

    if (!expense) {
      res.sendStatus(404);

      return;
    }

    expensesAPI.delete(+id);
    res.sendStatus(204);
  });

  app.patch('/expenses/:id', (req, res) => {
    const { id } = req.params;
    const expense = expensesAPI.get(+id);

    if (!expense) {
      res.sendStatus(404);

      return;
    }

    const newExpense = Object.assign(expense, req.body);

    expenses = expensesAPI.update(newExpense);
    res.send(newExpense);
  });

  return app;
}

module.exports = {
  createServer,
};
