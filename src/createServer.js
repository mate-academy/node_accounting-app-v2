'use strict';

const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(cors());
app.use(bodyParser.json());

let expenses = [];
let users = [];
let currentId = 0;

const clearExpenses = () => {
  expenses = [];
};

const clearUsers = () => {
  users = [];
};

app.post('/expenses', express.json(), (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!title) {
    return res.send(400);
  }

  const userExists = users.some(u => u.id === userId);

  if (!userExists) {
    return res.status(400).send('User not found');
  }

  const newExpense = {
    id: currentId++,
    userId,
    spentAt,
    title,
    amount,
    category,
    note: note || '',
  };

  expenses.push(newExpense);
  res.status(201).send(newExpense);
});

app.get('/expenses', (req, res) => {
  const { userId, categories, from, to } = req.query;
  let filteredExpenses = [...expenses];

  if (!filteredExpenses.length) {
    return res.send([]);
  }

  if (userId) {
    filteredExpenses = filteredExpenses
      .filter(e => e.userId === Number(userId));
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
    return res.send(404);
  }

  res.send(expense);
});

app.put('/expenses/:id', express.json(), (req, res) => {
  const { id } = req.params;
  const { userId, spentAt, title, amount, category, note } = req.body;

  const expense = expenses.find(user => user.id === id);

  if (!expense) {
    return res.status(404);
  }

  Object.assign(expense, {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.send(expense);
});

app.delete('/expenses/:id', (req, res) => {
  const { id } = req.params;
  const expense = expenses.find(e => e.id === +id);

  if (!expense) {
    return res.send(404);
  }

  res.send(204);
});

app.post('/users', express.json(), (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.send(400);
  }

  const newUser = {
    id: users.length,
    name,
  };

  users.push(newUser);
  res.status(201).send(newUser);
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
    return res.send(404);
  }

  res.send(user);
});

app.put('/users/:id', express.json(), (req, res) => {
  const { id, name } = req.params;
  const user = users.find(u => u.id === +id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  Object.assign(user, { name });
  res.send(user);
});

app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  const newUsers = users.filter(user => user.id !== id);

  if (newUsers.length === users.length) {
    res.sendStatus(404);

    return;
  }

  users = newUsers;

  res.sendStatus(204);
});

function createServer() {
  clearExpenses();
  clearUsers();

  return app;
}

module.exports = {
  createServer,
};
