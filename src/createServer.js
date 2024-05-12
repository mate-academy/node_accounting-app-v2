'use strict';

const express = require('express');
const usersService = require('./services/users.service');
// const getCreateMaxId = require('./utils/getCreateMaxId');

// const users = [];
let expenses = [];

// function getUserById(userId) {
//   return users.find((user) => user.id === userId) || null;
// }

// let expenses = expensesArray.map((expense) => ({
//   ...expense,
//   user: getUserById(expense.userId),
// }));

function createServer() {
  const app = express();

  app.get('/expenses', (req, res) => {
    if (!expenses) {
      return [];
    }
    res.statusCode = 201;
    res.send(expenses);
  });

  app.get('/expenses/:id', (req, res) => {
    const { id } = req.params;

    const expense = expenses.find((item) => item.id === parseInt(id));

    if (!expense) {
      res.sendStatus(400);

      return;
    }
    res.statusCode = 201;
    res.send(expense);
  });

  app.post('/expenses', express.json(), (req, res) => {
    const { title, amount, category, note } = req.body;

    if (!title || !amount || !category || !note) {
      res.sendStatus(400);
    }

    const expense = {
      // id: getCreateMaxId(users),
      // userId: getCreateMaxId(users),

      spentAt: new Date().toISOString(),
      title,
      amount,
      category,
      note,
    };

    res.statusCode = 201;
    expenses.push(expense);
    res.send(expense);
  });

  app.delete('/expenses/:id', (req, res) => {
    const { id } = req.params;

    const newExpenses = expenses.filter((item) => item.id !== parseInt(id));

    if (newExpenses.length === expenses.length) {
      res.sendStatus(404);

      return;
    }

    expenses = newExpenses;
    res.sendStatus(204);
  });

  app.get('/users', (req, res) => {
    res.statusCode = 200;
    res.send(usersService.getUsers());
  });

  app.get('/users/:id', (req, res) => {
    const { id } = req.params;

    const user = usersService.getUserById(id);

    if (!user) {
      res.sendStatus(404);
    }
    res.statusCode = 200;
    res.send(user);
  });

  app.post('/users', express.json(), (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);
    }

    const user = usersService.createUser(name);

    res.statusCode = 201;

    res.send(user);
  });

  app.delete('/users/:id', (req, res) => {
    const { id } = req.params;

    if (!usersService.getUserById(id)) {
      res.sendStatus(404);

      return;
    }

    usersService.removeUser(id);

    res.sendStatus(204);
  });

  app.patch('/users/:id', express.json(), (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const user = usersService.getUserById(id);

    if (!user) {
      res.sendStatus(400);
    }

    if (typeof name !== 'string') {
      res.status(422);
    }

    const updatedUser = usersService.updateUser({ id, name });

    res.send(updatedUser);
  });

  return app;
}

module.exports = {
  createServer,
};
