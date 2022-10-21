'use strict';

const generateUniqueId = require('generate-unique-id');

const express = require('express');
const cors = require('cors');

function createServer() {
  const app = express();

  let users = [];
  let expenses = [];

  app.use(cors());

  app.post('/users', express.json(), (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    const newUser = {
      id: +generateUniqueId({
        length: 16,
        useLetters: false,
      }),
      name,
    };

    users.push(newUser);

    res.statusCode = 201;
    res.send(newUser);
  });

  app.get('/users', (req, res) => {
    res.send(users);
  });

  app.get('/users/:userId', express.json(), (req, res) => {
    const { userId } = req.params;
    const foundUser = users.find(user => user.id === +userId);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    res.send(foundUser);
  });

  app.patch('/users/:userId', express.json(), (req, res) => {
    const { userId } = req.params;
    const foundUser = users.find(user => user.id === +userId);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    const { name } = req.body;

    if (typeof name !== 'string') {
      res.sendStatus(404);

      return;
    }

    Object.assign(foundUser, { name });

    res.send(foundUser);
  });

  app.delete('/users/:userId', express.json(), (req, res) => {
    const { userId } = req.params;
    const filteredUsers = users.filter(user => user.id !== +userId);

    if (filteredUsers.length === users.length) {
      res.sendStatus(404);

      return;
    }

    users = filteredUsers;
    res.sendStatus(204);
  });

  app.post('/expenses', express.json(), (req, res) => {
    const { userId, title } = req.body;

    const foundUser = users.find(user => user.id === +userId);

    if (!title || !foundUser) {
      res.sendStatus(400);

      return;
    }

    const newExpense = {
      id: +generateUniqueId({
        length: 16,
        useLetters: false,
      }),
      ...req.body,
    };

    expenses.push(newExpense);

    res.statusCode = 201;
    res.send(newExpense);
  });

  app.get('/expenses', express.json(), (req, res) => {
    const { userId, from, to, category } = req.query;

    const foundUser = users.find(user => user.id === +userId);

    const categoryExpenses = expenses
      .filter(expense => expense.category === category);

    const userExpenses = expenses
      .filter(expense => expense.userId === +userId);

    const expensesBetweenDates = expenses
      .filter(({ spentAt }) => spentAt >= from && spentAt <= to);

    if (from && to) {
      res.send(expensesBetweenDates);

      return;
    }

    if (category) {
      res.send(categoryExpenses);

      return;
    }

    if (foundUser) {
      res.send(userExpenses);

      return;
    }

    res.send(expenses);
  });

  app.get('/expenses/:expenseId', express.json(), (req, res) => {
    const { expenseId } = req.params;
    const foundExpense = expenses.find(expense => expense.id === +expenseId);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    res.send(foundExpense);
  });

  app.patch('/expenses/:expenseId', express.json(), (req, res) => {
    const { expenseId } = req.params;
    const foundExpense = expenses.find(expense => expense.id === +expenseId);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    res.send({
      ...foundExpense, ...req.body,
    });
  });

  app.delete('/expenses/:expenseId', express.json(), (req, res) => {
    const { expenseId } = req.params;
    const filteredExpenses = expenses
      .filter(expense => expense.id !== +expenseId);

    if (filteredExpenses.length === expenses.length) {
      res.sendStatus(404);

      return;
    }

    expenses = filteredExpenses;
    res.sendStatus(204);
  });

  return app;
}

module.exports = {
  createServer,
};
