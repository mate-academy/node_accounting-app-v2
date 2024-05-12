'use strict';

const express = require('express');
const usersController = require('./controllers/users.controller');
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

  app.get('/users', usersController.getAllUsers);

  app.get('/users/:id', usersController.getOneUser);

  app.post('/users', express.json(), usersController.createNewUser);

  app.delete('/users/:id', usersController.deleteUser);

  app.patch('/users/:id', express.json(), usersController.updateUser);

  return app;
}

module.exports = {
  createServer,
};
