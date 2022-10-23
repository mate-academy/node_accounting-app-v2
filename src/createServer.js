'use strict';

const express = require('express');
const cors = require('cors');

function createServer() {
  const app = express();

  app.use(express.json());

  app.use(cors());

  // USERS
  let users = [];

  app.get('/users', (req, res) => {
    res.statusCode = 200;
    res.send(users);
  });

  app.get('/users/:id', (req, res) => {
    const { id } = req.params;

    const foundUser = users.find(user => user.id === +id);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    res.statusCode = 200;
    res.send(foundUser);
  });

  app.post('/users', (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    const newUser = {

      id: Math.max(0, ...users.map(({ id }) => id + 1)),
      name,
    };

    users.push(newUser);

    res.statusCode = 201;

    res.send(newUser);
  });

  app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    const filteredUsers = users.filter((user) => user.id !== +id);

    if (filteredUsers.length === users.length) {
      res.sendStatus(404);

      return;
    }

    users = filteredUsers;

    res.sendStatus(204);
  });

  app.patch('/users/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    const foundUser = users.find(user => user.id === +id);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    if (typeof name !== 'string') {
      res.sendStatus(400);
    }

    Object.assign(foundUser, { name });

    res.statusCode = 200;

    res.send(foundUser);
  });

  // EXPENSES!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  let expenses = [];

  app.get('/expenses', (req, res) => {
    const { from, to, category, userId } = req.query;

    if (category) {
      const searchByCategoties = expenses
        .filter(expense => expense.category === category);

      res.statusCode = 200;
      res.send(searchByCategoties);

      return;
    }

    if (from && to) {
      const searchExpensesByDate = expenses.filter(
        (expense) => new Date(expense.spentAt)
          .getTime() > new Date(from).getTime()
        && new Date(expense.spentAt).getTime() < new Date(to).getTime()
      );

      res.send(searchExpensesByDate);
      res.statusCode = 200;

      return;
    }

    if (userId) {
      const searchByUserId = expenses
        .filter(expense => expense.userId === +userId);

      res.statusCode = 200;
      res.send(searchByUserId);

      return;
    }

    res.statusCode = 200;
    res.send(expenses);
  });

  app.get('/expenses/:id', (req, res) => {
    const { id } = req.params;

    const foundExpense = expenses.find(user => user.id === +id);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    res.statusCode = 200;
    res.send(foundExpense);
  });

  app.post('/expenses', (req, res) => {
    const expense = req.body;
    const { userId } = expense;

    const foundUser = users.find(user => user.id === +userId);

    if (!foundUser) {
      res.sendStatus(400);

      return;
    }

    const newExpense = {
      id: Math.max(...users.map(({ id }) => id + 1)),
      ...expense,
    };

    expenses.push(newExpense);
    res.statusCode = 201;
    res.send(newExpense);
  });

  app.delete('/expenses/:id', (req, res) => {
    const { id } = req.params;
    const filteredExpenses = expenses.filter((expense) => expense.id !== +id);

    if (filteredExpenses.length === expenses.length) {
      res.sendStatus(404);

      return;
    }

    expenses = filteredExpenses;

    res.sendStatus(204);
  });

  app.patch('/expenses/:id', (req, res) => {
    const { id } = req.params;

    const { title } = req.body;

    const foundExpense = expenses.find(expense => expense.id === +id);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    if (typeof title !== 'string') {
      res.sendStatus(400);
    }

    Object.assign(foundExpense, { title });

    res.statusCode = 200;
    res.send(foundExpense);
  });

  return app;
}

module.exports = {
  createServer,
};
