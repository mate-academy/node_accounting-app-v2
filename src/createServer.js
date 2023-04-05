'use strict';

const express = require('express');
const cors = require('cors');

function createServer() {
  const app = express();

  app.use(cors());

  let users = [];
  let expenses = [];

  app.get('/expenses', express.json(), (req, res) => {
    const {
      userId,
      categories,
      from,
      to,
    } = req.query;

    const filteredExpenses = expenses.filter(expense => {
      const isUserIdMatch = userId
        ? expense.userId === +userId
        : true;

      const isCategoriesMatch = categories
        ? expense.category === categories
        : true;

      const isFromMatch = from
        ? expense.spentAt >= from
        : true;

      const isToMatch = to
        ? expense.spentAt <= to
        : true;

      return isUserIdMatch && isCategoriesMatch && isFromMatch && isToMatch;
    });

    res.send(filteredExpenses);
  });

  app.get('/expenses/:id', (req, res) => {
    const { id } = req.params;

    const foundExpense = expenses.find(expense => expense.id === +id);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

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

    const requiredFields = ['userId', 'spentAt', 'title', 'amount', 'category'];

    const requestFields = Object.keys(req.body);

    const isReqFieldsValid
      = requiredFields.every(field => requestFields.includes(field));

    if (!isReqFieldsValid) {
      res.sendStatus(400);

      return;
    }

    const foundUser = users.find(user => user.id === +userId);

    if (!foundUser) {
      res.sendStatus(400);

      return;
    }

    if (
      typeof userId !== 'number'
      && isNaN(Date.parse(spentAt))
      && typeof title !== 'string'
      && typeof amount !== 'number'
      && typeof category !== 'string'
      && typeof note !== 'string'
    ) {
      res.sendStatus(400);

      return;
    }

    const newExpense = {
      id: +Date.now(),
      ...req.body,
    };

    expenses.push(newExpense);

    res.status(201);
    res.send(newExpense);
  });

  app.patch('/expenses/:id', express.json(), (req, res) => {
    const { id } = req.params;

    const foundExpense = expenses.find(expense => expense.id === +id);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    const {
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    } = req.body;

    if (
      typeof userId !== 'number'
      && typeof title !== 'string'
      && typeof amount !== 'number'
      && typeof category !== 'string'
      && typeof note !== 'string'
      && isNaN(Date.parse(spentAt))
    ) {
      res.sendStatus(400);

      return;
    }

    Object.assign(foundExpense, { ...req.body });

    res.send(foundExpense);
  });

  app.delete('/expenses/:id', (req, res) => {
    const { id } = req.params;

    const filteredExpenses
      = expenses.filter(expense => expense.id !== +id);

    if (filteredExpenses.length === expenses.length) {
      res.sendStatus(404);

      return;
    }

    expenses = filteredExpenses;
    res.send(204);
  });

  app.get('/users', (req, res) => {
    res.send(users);
  });

  app.get('/users/:id', (req, res) => {
    const { id } = req.params;

    const foundUser = users.find(user => user.id === +id);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    res.send(foundUser);
  });

  app.post('/users', express.json(), (req, res) => {
    const { name } = req.body;

    if (typeof name !== 'string') {
      res.sendStatus(400);

      return;
    }

    const newUser = {
      id: +Date.now(),
      name,
    };

    users.push(newUser);

    res.status(201);
    res.send(newUser);
  });

  app.patch('/users/:id', express.json(), (req, res) => {
    const { id } = req.params;

    const foundUser = users.find(user => user.id === +id);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    const { name } = req.body;

    if (typeof name !== 'string') {
      res.sendStatus(400);

      return;
    }

    Object.assign(foundUser, { name });

    res.send(foundUser);
  });

  app.delete('/users/:id', (req, res) => {
    const { id } = req.params;

    const filteredUsers = users.filter(user => user.id !== +id);

    if (filteredUsers.length === users.length) {
      res.sendStatus(404);

      return;
    }

    users = filteredUsers;
    res.sendStatus(204);
  });
  // Use express to create a server
  // Add a routes to the server
  // Return the server (express app)

  return app;
}

module.exports = {
  createServer,
};
