'use strict';

const express = require('express');
const cors = require('cors');

function createServer() {
  let users = [];

  let expenses = [];

  const app = express();

  app.use(cors());

  app.get('/users', (req, res) => {
    res.send(users);
  });

  app.get('/users/:userId', (req, res) => {
    const { userId } = req.params;
    const foundUser = users.find(user => user.id === +userId);

    res.send(foundUser);
  });

  app.post('/users', express.json(), (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    const maxId = users.length
      ? Math.max(...users.map(({ id }) => id))
      : 0;

    const newUser = {
      id: maxId + 1,
      name: name,
    };

    users.push(newUser);

    res.send(newUser);
    res.sendStatus(201);
  });

  app.delete('/users/:userId', (req, res) => {
    const { userId } = req.params;
    const filteredUsers = users.filter(user => +user.id !== +userId);

    const isUserDeleted = filteredUsers.length !== users.length;

    if (!isUserDeleted) {
      res.sendStatus(404);

      return;
    }

    users = filteredUsers;

    res.sendStatus(204);
    res.send(users);
  });

  app.patch('/users/:userId', express.json(), (req, res) => {
    const { name } = req.body;
    const { userId } = req.params;

    const foundUser = users.find(user => user.id === +userId);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    if (typeof name !== 'string') {
      res.sendStatus(400);

      return;
    }

    Object.assign(foundUser, { name });

    res.sendStatus(200);
    res.send(foundUser);
  });

  //

  app.get('/expenses', (req, res) => {
    res.send(expenses);
  });

  app.get('/expenses/:expenseId', (req, res) => {
    const { expenseId } = req.params;
    const foundExpense = expenses.find(item => item.id === +expenseId);

    res.send(foundExpense);
  });

  app.post('/expenses', express.json(), (req, res) => {
    const { userId, spentAt, title, amount, category } = req.body;

    const isValidDataEntered = typeof userId === 'number'
      && typeof spentAt === 'string'
      && typeof title === 'string'
      && typeof amount === 'number'
      && typeof category === 'string';

    if (!isValidDataEntered) {
      res.sendStatus(400);

      return;
    }

    const maxId = expenses.length
      ? Math.max(...expenses.map(({ id }) => id))
      : 0;

    const newExpense = {
      id: maxId + 1,
      userId,
      spentAt,
      title,
      amount,
      category,
    };

    expenses.push(newExpense);

    res.send(newExpense);
    res.sendStatus(201);
  });

  app.delete('/expenses/:expenseId', (req, res) => {
    const { expenseId } = req.params;
    const filteredExpenses = expenses.find(item => item.id !== +expenseId);

    const isExpenseDeleted = filteredExpenses.length !== expenses.length;

    if (!isExpenseDeleted) {
      res.sendStatus(404);

      return;
    }

    expenses = filteredExpenses;

    res.sendStatus(204);
    res.send(expenses);
  });

  app.patch('/expenses/:expenseId', express.json(), (req, res) => {
    const { ...updatedData } = req.body;
    const { expenseId } = req.params;

    const foundExpense = expenses.find(item => item.id === +expenseId);

    const isValidDataEntered = typeof userId === 'number'
      && typeof spentAt === 'string'
      && typeof title === 'string'
      && typeof amount === 'number'
      && typeof category === 'string';

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    if (!isValidDataEntered) {
      res.sendStatus(400);

      return;
    }

    Object.assign(foundExpense, updatedData);

    res.sendStatus(200);
    res.send(foundExpense);
  });

  return app;
}

module.exports = {
  createServer,
};
