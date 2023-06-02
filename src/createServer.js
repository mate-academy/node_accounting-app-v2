'use strict';

const express = require('express');
const { v4: uuidv4 } = require('uuid');

const cors = require('cors');

function createServer() {
  const app = express();
  let users = [];
  let expenses = [];

  app.use(cors());

  app.patch('/users/:userId', express.json(), (req, res) => {
    const { userId } = req.params;
    const foundUser = users.find(user => user.id === +userId);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    Object.assign(foundUser, req.body);

    res.send(foundUser);
  });

  app.delete('/users/:userId', (req, res) => {
    const { userId } = req.params;
    const filteredUsers = users.filter(user => user.id !== +userId);

    if (filteredUsers.length === users.length) {
      res.sendStatus(404);

      return;
    }

    users = filteredUsers;

    res.sendStatus(204);
  });

  app.post('/users', express.json(), (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    const newUser = {
      id: parseInt(uuidv4(), 16),
      name,
    };

    users.push(newUser);

    res.statusCode = 201;
    res.send(newUser);
  });

  app.get('/users', (req, res) => {
    res.send(users);
  });

  app.get('/users/:userId', (req, res) => {
    const { userId } = req.params;
    const foundUser = users.find(user => user.id === +userId);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    res.send(foundUser);
  });

  // expenses

  app.patch('/expenses/:expenseId', express.json(), (req, res) => {
    const { expenseId } = req.params;
    const foundExpense = expenses.find(expense => expense.id === +expenseId);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    Object.assign(foundExpense, req.body);

    res.send(foundExpense);
  });

  app.delete('/expenses/:expenseId', (req, res) => {
    const { expenseId } = req.params;
    const filteredExpenses = expenses.filter(expense => (
      expense.id !== +expenseId
    ));

    if (filteredExpenses.length === expenses.length) {
      res.sendStatus(404);

      return;
    }

    expenses = filteredExpenses;

    res.sendStatus(204);
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

    const foundUser = users.find(user => user.id === +userId);

    if (!foundUser) {
      res.sendStatus(400);

      return;
    }

    if (!userId || !spentAt || !title || !amount || !category || !note) {
      res.sendStatus(400);

      return;
    }

    const newExpense = {
      id: parseInt(uuidv4(), 16),
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    };

    expenses.push(newExpense);

    res.statusCode = 201;
    res.send(newExpense);
  });

  app.get('/expenses', (req, res) => {
    const { userId, categories, from, to } = req.query;

    let filteredExpenses = expenses;

    if (userId) {
      filteredExpenses = filteredExpenses.filter(expense => (
        expense.userId === +userId
      ));
    };

    if (categories) {
      filteredExpenses = filteredExpenses.filter(expense => (
        categories.includes(expense.category)
      ));
    }

    if (from && to) {
      filteredExpenses = filteredExpenses.filter(expense => (
        expense.spentAt >= from && expense.spentAt <= to
      ));
    }

    res.send(filteredExpenses);
  });

  app.get('/expenses/:expenseId', (req, res) => {
    const { expenseId } = req.params;
    const foundExpenses = expenses.find(expense => expense.id === +expenseId);

    if (!foundExpenses) {
      res.sendStatus(404);

      return;
    }

    res.send(foundExpenses);
  });

  return app;
}

module.exports = {
  createServer,
};
