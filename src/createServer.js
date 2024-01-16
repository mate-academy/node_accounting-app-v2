'use strict';

const { getNewId } = require('./helpers/getNewId');
// const User = require('./types/User');

const express = require('express');

let users = [];

let expenses = [];

const getUserById = (id) => {
  return users.find(user => user.id === +id) || null;
};

const getExpenseById = (id) => {
  return expenses.find(expense => expense.id === +id) || null;
};

const server = express();

server.get('/users', (req, res) => {
  res.send(users);
});

server.get('/users/id', (req, res) => {
  const { id } = req.params;

  const expectedUser = getUserById(id);

  if (!expectedUser) {
    res.sendStatus(404);

    return;
  }

  res.send(expectedUser);
});

server.delete('/users/id', (req, res) => {
  const { id } = req.params;
  const normalizedId = +id;

  if (!normalizedId || normalizedId.isNaN) {
    res.sendStatus(400);

    return;
  }

  const userToDelete = getUserById(normalizedId);

  if (!userToDelete) {
    res.sendStatus(404);

    return;
  }

  const newUsers = users.filter(user => user.id !== normalizedId);

  users = [...newUsers];

  res.sendStatus(204);
});

server.post('/users', express.json(), (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = {
    id: getNewId(users),
    name,
  };

  users.push(newUser);

  res.send(newUser);
});

server.patch('/users/id', express.json(), (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const normalizedId = +id;

  if (!normalizedId || normalizedId.isNaN) {
    res.sendStatus(400);

    return;
  }

  if (typeof name !== 'string' || !name.length) {
    res.sendStatus(400);

    return;
  }

  if (!getUserById(normalizedId)) {
    res.sendStatus(404);

    return;
  }

  const userToUpdate = getUserById(normalizedId);

  Object.assign(userToUpdate, { name });

  res.send(userToUpdate);
});

server.get('/expenses', (req, res) => {
  res.send(expenses);
});

server.get('/expenses/id', (req, res) => {
  const { id } = req.params;

  const expense = getExpenseById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.send(expense);
});

server.delete('/expenses/id', (req, res) => {
  const { id } = req.params;
  const normalizedId = +id;

  if (!normalizedId || normalizedId.isNaN) {
    res.sendStatus(400);

    return;
  }

  const expenseToDelete = getExpenseById(normalizedId);

  if (!expenseToDelete) {
    res.sendStatus(404);

    return;
  }

  const newExpenses = expenses.filter(expense => expense.id !== normalizedId);

  expenses = [...newExpenses];

  res.sendStatus(204);
});

server.post('/expenses', express.json(), (req, res) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  if (!userId || !spentAt || !title || !amount || !category) {
    res.sendStatus(400);

    return;
  }

  const newExpense = {
    id: getNewId(expenses),
    userId,
    spentAt,
    title,
    amount,
    category,
    note: note || '',
  };

  expenses.push(newExpense);

  res.send(newExpense);
});

server.patch('/expenses/id', express.json(), (req, res) => {
  const { id } = req.params;
  const {
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  const normalizedId = +id;

  if (!normalizedId || normalizedId.isNaN) {
    res.sendStatus(400);

    return;
  }

  if ((typeof spentAt !== 'string' || !spentAt.length)
    || (typeof title !== 'string' || !title.length)
    || (typeof amount !== 'number' || (amount <= 0))
    || (typeof category !== 'string' || !category.length)
  ) {
    res.sendStatus(400);

    return;
  }

  if (!getExpenseById(normalizedId)) {
    res.sendStatus(404);

    return;
  }

  const expenseToUpdate = getExpenseById(normalizedId);

  Object.assign(expenseToUpdate, {
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.send(expenseToUpdate);
});

function createServer() {
  server.use('/', (req, res) => {
    res.send('Hello Express!');
  });

  // Use express to create a server
  // Add a routes to the server
  // Return the server (express app)

  return server;
}

module.exports = {
  createServer,
};
