'use strict';

const express = require('express');
const { v4: uuidv4 } = require('uuid');

function createServer() {
  const app = express();

  let users = [];
  let expenses = [];

  app.get('/users', (req, res) => {
    res.send(users);
  });

  app.get('/users/:userId', (req, res) => {
    const { userId } = req.params;
    const foundUser = users.find(({ id }) => id === Number(userId));

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    res.send(foundUser);
  });

  app.post('/users', express.json(), (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    const id = parseInt(uuidv4(), 16);

    const newUser = {
      id,
      name,
    };

    users.push(newUser);
    res.statusCode = 201;
    res.send(newUser);
  });

  app.delete('/users/:userId', (req, res) => {
    const { userId } = req.params;
    const filteredUsers = users.filter(({ id }) => id !== Number(userId));

    if (filteredUsers.length === users.length) {
      res.sendStatus(404);

      return;
    }

    users = filteredUsers;
    res.sendStatus(204);
  });

  app.patch('/users/:userId', express.json(), (req, res) => {
    const { userId } = req.params;
    const foundUser = users.find(({ id }) => id === Number(userId));

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    Object.assign(foundUser, { name });
    res.send(foundUser);
  });

  app.get('/expenses', (req, res) => {
    const {
      userId,
      categories,
      from,
      to,
    } = req.query;

    let filteredExpenses = expenses;

    if (userId) {
      filteredExpenses = filteredExpenses
        .filter(expense => expense.userId === Number(userId));
    }

    if (categories) {
      filteredExpenses = filteredExpenses
        .filter(({ category }) => categories.includes(category));
    }

    if (from && to) {
      filteredExpenses = filteredExpenses
        .filter(({ spentAt }) => spentAt <= to && spentAt >= from);
    }

    res.send(filteredExpenses);
  });

  app.get('/expenses/:expenseId', (req, res) => {
    const { expenseId } = req.params;
    const foundExpense = expenses
      .find(({ id }) => id === Number(expenseId));

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    res.send(foundExpense);
  });

  app.post('/expenses', express.json(), (req, res) => {
    const {
      userId,
      title,
      amount,
      spentAt,
      category,
      note,
    } = req.body;

    const foundUser = users.find(({ id }) => id === Number(userId));

    if (!foundUser) {
      res.sendStatus(400);

      return;
    }

    if (!userId || !title || !amount || !spentAt || !category || !note) {
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

  app.delete('/expenses/:expenseId', (req, res) => {
    const { expenseId } = req.params;
    const filteredExpenses = expenses
      .filter(({ id }) => id !== Number(expenseId));

    if (filteredExpenses.length === expenses.length) {
      res.sendStatus(404);

      return;
    }

    expenses = filteredExpenses;
    res.sendStatus(204);
  });

  app.patch('/expenses/:expenseId', express.json(), (req, res) => {
    const { expenseId } = req.params;
    const foundExpense = expenses
      .find(({ id }) => id === Number(expenseId));

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    Object.assign(foundExpense, { ...req.body });

    res.send(foundExpense);
  });

  return app;
}

module.exports = {
  createServer,
};
