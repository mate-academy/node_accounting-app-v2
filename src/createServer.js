'use strict';

const express = require('express');

function createServer() {
  const app = express();

  let users = [];

  app.get('/users', (req, res) => {
    res.send(users);
  });

  app.get('/users/:userId', (req, res) => {
    const { userId } = req.params;
    const regex = /^\d+$/;

    if (!regex.test(userId)) {
      res.sendStatus(400);

      return;
    }

    const user = users.find(({ id }) => +userId === id);

    if (!user) {
      res.sendStatus(404);

      return;
    }

    res.statusCode = 200;
    res.send(user);
  });

  app.post('/users', express.json(), (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    const userData = {
      id: users.length + 1,
      name,
    };

    users.push(userData);

    res.statusCode = 201;
    res.send(userData);
  });

  app.patch('/users/:userId', express.json(), (req, res) => {
    const { userId } = req.params;
    const { name } = req.body;
    const regex = /^\d+$/;

    if (!regex.test(userId)) {
      res.sendStatus(400);

      return;
    }

    const user = users.find(({ id }) => +userId === id);

    if (!user) {
      res.sendStatus(404);

      return;
    }

    Object.assign(user, { name });

    res.statusCode = 200;
    res.send(user);
  });

  app.delete('/users/:userId', (req, res) => {
    const { userId } = req.params;
    const regex = /^\d+$/;

    if (!regex.test(userId)) {
      res.sendStatus(400);

      return;
    }

    const filteredUsers = users.filter(({ id }) => +userId !== id);

    if (filteredUsers.length === users.length) {
      res.sendStatus(404);

      return;
    }

    users = filteredUsers;

    res.statusCode = 204;
    res.send();
  });

  // --------------------------------------
  let expenses = [];

  app.get('/expenses', (req, res) => {
    const { userId, categories, from, to } = req.query;

    if (userId) {
      expenses = expenses.filter((elem) => elem.userId === +userId);
    }

    if (categories) {
      expenses = expenses.filter((elem) => elem.category === categories);
    }

    if (from && to) {
      expenses = expenses.filter(({ spentAt }) => {
        const expanseDate = new Date(spentAt);
        const fromDate = new Date(from);
        const toDate = new Date(to);

        return fromDate <= expanseDate && toDate > expanseDate;
      });
    }

    res.send(expenses);
  });

  app.get('/expenses/:expensesId', (req, res) => {
    const { expensesId } = req.params;
    const regex = /^\d+$/;

    if (!regex.test(expensesId)) {
      res.sendStatus(400);

      return;
    }

    const expense = expenses.find(({ id }) => +expensesId === id);

    if (!expense) {
      res.sendStatus(404);

      return;
    }

    res.send(expense);
  });

  app.post('/expenses', express.json(), (req, res) => {
    const data = req.body;
    const userExpense = users.find(({ id }) => id === +data.userId);

    if (!Object.entries(data).length || !userExpense) {
      res.sendStatus(400);

      return;
    }

    const expenseData = {
      id: expenses.length + 1,
      ...data,
    };

    expenses.push(expenseData);

    res.statusCode = 201;
    res.send(expenseData);
  });

  app.patch('/expenses/:expensesId', express.json(), (req, res) => {
    const { expensesId } = req.params;
    const body = req.body;
    const regex = /^\d+$/;

    if (!regex.test(expensesId)) {
      res.sendStatus(400);

      return;
    }

    const expense = expenses.find(({ id }) => +expensesId === id);

    if (!expense) {
      res.sendStatus(404);

      return;
    }

    Object.assign(expense, body);

    res.statusCode = 200;
    res.send(expense);
  });

  app.delete('/expenses/:expensesId', (req, res) => {
    const { expensesId } = req.params;
    const regex = /^\d+$/;

    if (!regex.test(expensesId)) {
      res.sendStatus(400);

      return;
    }

    const filteredExpenses = expenses.filter(({ id }) => +expensesId !== id);

    if (filteredExpenses.length === expenses.length) {
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
