'use strict';

const express = require('express');

function createServer() {
  const app = express();
  let users = [];
  let expenses = [];

  app.use(express.json());

  app.get('/users', (req, res) => {
    res.statusCode = 200;

    res.send(users);
  });

  app.get('/users/:id', (req, res) => {
    const { id } = req.params;

    const findUser = users.find((user) => user.id === +id);

    if (!findUser) {
      res.sendStatus(404);

      return;
    }

    res.statusCode = 200;
    res.send(findUser);
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

    const filtereedUser = users.filter((user) => user.id !== +id);

    if (filtereedUser.length === users.length) {
      res.sendStatus(404);

      return;
    }

    users = filtereedUser;
    res.sendStatus(204);
  });

  app.patch('/users/:id', (req, res) => {
    const { id } = req.params;

    const findUser = users.find((user) => user.id === +id);

    if (!findUser) {
      res.sendStatus(404);
    }

    const { name } = req.body;

    Object.assign(findUser, { name });

    res.send(findUser);
    res.statusCode = 200;
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

    const findUser = users.find((user) => user.id === userId);

    if (!findUser) {
      res.sendStatus(400);

      return;
    }

    const newExpenses = {
      id: expenses.length + 1,
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    };

    expenses.push(newExpenses);
    res.statusCode = 201;
    res.send(newExpenses);
  });

  app.get('/expenses', (req, res) => {
    const {
      userId,
      category,
      from,
      to,
    } = req.query;

    if (category) {
      const filteredByCategory = expenses
        .filter((expense) => expense.category === category);

      res.statusCode = 200;
      res.send(filteredByCategory);

      return;
    }

    if (from && to) {
      const filterByDate = expenses
        .filter((expense) => expense.spentAt > from && expense.spentAt < to);

      res.send(filterByDate);

      return;
    }

    if (userId) {
      const findUser = expenses.filter((expense) => expense.userId === +userId);

      res.send(findUser);
      res.statusCode = 200;

      return;
    }

    res.send(expenses);
  });

  app.get('/expenses/:id', (req, res) => {
    const { id } = req.params;

    const findExpense = expenses.find((expense) => expense.id === +id);

    if (!findExpense) {
      res.sendStatus(404);

      return;
    }

    res.send(findExpense);
    res.statusCode = 200;
  });

  app.patch('/expenses/:id', (req, res) => {
    const { id } = req.params;
    const findExpense = expenses.find((expense) => expense.id === +id);

    if (typeof +id !== 'number') {
      res.sendStatus(400);

      return;
    }

    if (!findExpense) {
      res.sendStatus(404);

      return;
    }

    Object.assign(findExpense, req.body);

    res.send(findExpense);
    res.statusCode = 200;
  });

  app.delete('/expenses/:id', (req, res) => {
    const { id } = req.params;

    const filteredExpense = expenses.filter((expense) => expense.id !== +id);

    if (filteredExpense.length === users.length) {
      res.sendStatus(404);

      return;
    }

    expenses = filteredExpense;
    res.sendStatus(204);
  });

  return app;
}

module.exports = {
  createServer,
};
