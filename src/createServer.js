'use strict';

const express = require('express');
const cors = require('cors');

function createServer() {
  // Use express to create a server
  // Add a routes to the server
  // Return the server (express app)

  const server = express();

  server.use(cors());

  let users = [];

  server.get('/users', (req, res) => {
    res.send(users);
  });

  server.get('/users/:userId', (req, res) => {
    const { userId } = req.params;
    const findedUser = users.find(user => user.id === Number(userId));

    if (!findedUser) {
      res.sendStatus(404);

      return;
    }

    res.send(findedUser);
  });

  server.post('/users', express.json(), (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    let newUser = {};

    if (!users.length) {
      newUser = {
        id: 0,
        name,
      };
    } else {
      const maxId = Math.max(...users.map(user => user.id));

      newUser = {
        id: maxId + 1,
        name,
      };
    }

    users.push(newUser);

    res.statusCode = 201;

    res.send(newUser);
  });

  server.delete('/users/:userId', (req, res) => {
    const { userId } = req.params;
    const filteredUsers = users.filter(user => user.id !== Number(userId));

    if (filteredUsers.length === users.length) {
      res.sendStatus(404);

      return;
    }

    users = filteredUsers;

    res.sendStatus(204);
  });

  server.patch('/users/:userId', express.json(), (req, res) => {
    const { userId } = req.params;

    const findedUser = users.find(user => user.id === Number(userId));

    if (!findedUser) {
      res.sendStatus(404);

      return;
    }

    const { name } = req.body;

    Object.assign(findedUser, { name });

    res.send(findedUser);
  });

  let expenses = [];

  server.get('/expenses', (req, res) => {
    const { userId, category, from, to } = req.query;
    let filteredExpenses = expenses;

    if (userId) {
      filteredExpenses = filteredExpenses
        .filter(expense => expense.userId === Number(userId));
    }

    if (category) {
      filteredExpenses = filteredExpenses
        .filter(expense => expense.category === category);
    }

    if (from) {
      filteredExpenses = filteredExpenses
        .filter(expense => expense.spentAt > from);
    }

    if (to) {
      filteredExpenses = filteredExpenses
        .filter(expense => expense.spentAt < to);
    }

    res.send(filteredExpenses);
  });

  server.get('/expenses/:expenseId', (req, res) => {
    const { expenseId } = req.params;

    const findedExpense = expenses
      .find(expense => expense.id === Number(expenseId));

    if (!findedExpense) {
      res.sendStatus(404);

      return;
    }

    res.send(findedExpense);
  });

  server.post('/expenses', express.json(), (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    const findedUser = users.find(user => user.id === Number(userId));

    if (!title || !findedUser) {
      res.sendStatus(400);

      return;
    }

    let newExpense = {};

    if (!expenses.length) {
      newExpense = {
        id: 0,
        userId,
        spentAt,
        title,
        amount,
        category,
        note,
      };
    } else {
      const maxId = Math.max(...expenses.map(expense => expense.id));

      newExpense = {
        id: maxId + 1,
        userId,
        spentAt,
        title,
        amount,
        category,
        note,
      };
    }

    expenses.push(newExpense);

    res.statusCode = 201;

    res.send(newExpense);
  });

  server.delete('/expenses/:expenseId', (req, res) => {
    const { expenseId } = req.params;

    const filteredExpense = expenses
      .filter(expense => expense.id !== Number(expenseId));

    if (expenses.length === filteredExpense.length) {
      res.sendStatus(404);

      return;
    }

    expenses = filteredExpense;

    res.sendStatus(204);
  });

  server.patch('/expenses/:expenseId', express.json(), (req, res) => {
    const { expenseId } = req.params;

    const findedExpense = expenses
      .find(expense => expense.id === Number(expenseId));

    if (!findedExpense) {
      res.sendStatus(404);

      return;
    }

    const { spentAt, title, amount, category, note } = req.body;

    if (spentAt) {
      Object.assign(findedExpense, { spentAt });
    }

    if (title) {
      Object.assign(findedExpense, { title });
    }

    if (amount) {
      Object.assign(findedExpense, { amount });
    }

    if (category) {
      Object.assign(findedExpense, { category });
    }

    if (note) {
      Object.assign(findedExpense, { note });
    }

    res.send(findedExpense);
  });

  return server;
}

module.exports = {
  createServer,
};
