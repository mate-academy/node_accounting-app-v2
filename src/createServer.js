'use strict';

const express = require('express');
const cors = require('cors');

function createServer() {
  const app = express();

  app.use(cors());

  app.use(express.json());

  let users = [];

  let expenses = [];

  app.get('/users', (req, res) => {
    res.send(users);
  });

  app.get('/users/:id', (req, res) => {
    const { id } = req.params;
    const foundUser = users.find((user) => user.id === +id);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    res.send(foundUser);
  });

  app.post('/users', (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    const newUser = {
      id: users.length + 1,
      name,
    };

    users.push(newUser);

    res.status(201);
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
    const foundUser = users.find((user) => user.id === +id);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    if (!name) {
      res.sendStatus(400);

      return;
    }

    foundUser.name = name;
    res.send(foundUser);
  });

  app.get('/expenses', (req, res) => {
    const { userId, categories, from, to } = req.query;

    let filteredExpenses = expenses;

    if (userId) {
      filteredExpenses = filteredExpenses.filter(
        (expense) => expense.userId === +userId
      );
    }

    if (categories) {
      filteredExpenses = filteredExpenses.filter((expense) =>
        categories.includes(expense.category)
      );
    }

    if (from && to) {
      filteredExpenses = filteredExpenses.filter(expense => {
        const expenseDate = new Date(expense.spentAt);
        const fromDate = new Date(from);
        const toDate = new Date(to);

        return expenseDate < toDate && fromDate <= expenseDate;
      });
    }

    res.send(filteredExpenses);
  });

  app.get('/expenses/:id', (req, res) => {
    const { id } = req.params;
    const foundExpense = expenses.find((expense) => expense.id === +id);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    res.send(foundExpense);
  });

  app.post('/expenses', (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    const foundUser = users.find((user) => user.id === +userId);
    const hasAllData = userId && title && amount && category && note && spentAt;

    if (!foundUser || !hasAllData) {
      res.sendStatus(400);

      return;
    }

    const newExpense = {
      id: expenses.length + 1,
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
    const { ...data } = req.body;
    const foundExpense = expenses.find((expense) => expense.id === +id);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    Object.assign(foundExpense, { ...data });

    res.send(foundExpense);
  });

  return app;
}

module.exports = {
  createServer,
};
