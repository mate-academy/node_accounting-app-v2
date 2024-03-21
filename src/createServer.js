'use strict';

const cors = require('cors');
const express = require('express');
const app = express();

app.use(cors());

const BAD_REQUES = 400;
const NOT_FOUND = 404;
const CREATED_STATUS = 201;
const NO_CONTENT = 204;

let expenses = [];
let users = [];

const clearExpenses = () => {
  expenses = [];
};

const clearUsers = () => {
  users = [];
};

app.post('/expenses', express.json(), (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!title) {
    return res.sendStatus(BAD_REQUES);
  }

  const userExists = users.some(u => u.id === userId);

  if (!userExists) {
    return res.status(BAD_REQUES).send('User not found');
  }

  const newExpense = {
    id: expenses.length,
    userId,
    spentAt,
    title,
    amount,
    category,
    note: note || '',
  };

  expenses.push(newExpense);
  res.status(CREATED_STATUS).send(newExpense);
});

app.get('/expenses', (req, res) => {
  const { userId, categories, from, to } = req.query;
  let filteredExpenses = [...expenses];

  if (!filteredExpenses.length) {
    return res.send([]);
  }

  if (userId) {
    filteredExpenses = filteredExpenses
      .filter(e => e.userId === +userId);
  }

  if (categories && categories.length) {
    filteredExpenses = filteredExpenses
      .filter(e => categories.includes(e.category));
  }

  if (from) {
    filteredExpenses = filteredExpenses
      .filter(expense => expense.spentAt >= from);
  }

  if (to) {
    filteredExpenses = filteredExpenses
      .filter(expense => expense.spentAt <= to);
  }

  res.send(filteredExpenses);
});

app.get('/expenses/:id', (req, res) => {
  const { id } = req.params;
  const expense = expenses.find(e => e.id === +id);

  if (!expense) {
    return res.send(NOT_FOUND);
  }

  res.send(expense);
});

app.patch('/expenses/:id', express.json(), (req, res) => {
  const { id } = req.params;

  const expense = expenses.find(e => e.id === +id);

  if (!expense) {
    return res.sendStatus(NOT_FOUND);
  }

  const newExpense = Object.assign(expense, req.body);

  res.send(newExpense);
});

app.delete('/expenses/:id', (req, res) => {
  const { id } = req.params;
  const expense = expenses.find(e => e.id === +id);

  if (!expense) {
    return res.sendStatus(NOT_FOUND);
  }

  expenses = expenses.filter(ex => ex.id !== +id);
  res.send(NO_CONTENT);
});

app.post('/users', express.json(), (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.sendStatus(BAD_REQUES);
  }

  const newUser = {
    id: users.length,
    name,
  };

  users.push(newUser);
  res.status(CREATED_STATUS).send(newUser);
});

app.get('/users', (req, res) => {
  if (!users.length) {
    return res.send([]);
  }

  res.send(users);
});

app.get('/users/:id', (req, res) => {
  const { id } = req.params;
  const user = users.find(u => u.id === +id);

  if (!user) {
    return res.send(NOT_FOUND);
  }

  res.send(user);
});

app.patch('/users/:id', express.json(), (req, res) => {
  const { id } = req.params;
  const user = users.find(u => u.id === +id);

  if (!user) {
    res.sendStatus(NOT_FOUND);

    return;
  }

  Object.assign(user, req.body);
  res.send(user);
});

app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  const newUsers = users.find(user => user.id === +id);

  if (!newUsers) {
    res.sendStatus(NOT_FOUND);

    return;
  }

  users = users.filter(user => user.id !== +id);

  res.sendStatus(NO_CONTENT);
});

function createServer() {
  clearExpenses();
  clearUsers();

  return app;
}

module.exports = {
  createServer,
};
