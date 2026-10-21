'use strict';

const express = require('express');

function createExpens(id, userId, spentAt, title, amount, category, note) {
  const expens = {
    id,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  return expens;
}

function createUsers(id, name) {
  const user = {
    id,
    name,
  };

  return user;
}

function createServer() {
  const app = express();

  app.use(express.json());

  let expenses = [];
  let users = [];

  let nextExpenseId = 1;
  let nextUserId = 1;

  app.locals.resetData = () => {
    expenses = [];
    users = [];
    nextExpenseId = 1;
    nextUserId = 1;
  };

  app.get('/expenses', (req, res) => {
    let filtered = expenses;
    const { userId, categories, from, to } = req.query;

    if (userId) {
      filtered = filtered.filter(
        (expense) => expense.userId === Number(userId),
      );
    }

    if (categories) {
      const list = categories.split(',');

      filtered = filtered.filter((expense) => list.includes(expense.category));
    }

    if (from) {
      filtered = filtered.filter(
        (expense) => new Date(expense.spentAt) >= new Date(from),
      );
    }

    if (to) {
      filtered = filtered.filter(
        (expense) => new Date(expense.spentAt) <= new Date(to),
      );
    }
    res.status(200).send(filtered);
  });

  app.get('/expenses/:id', (req, res) => {
    const { id } = req.params;
    const getById = expenses.find((expense) => expense.id === Number(id));

    if (!getById) {
      return res.status(404).send('Not found');
    }

    res.send(getById);
  });

  app.post('/expenses', (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;
    const id = nextExpenseId++;

    if (!userId || !spentAt || !title || !amount || !category) {
      return res.status(400).send('Name is not provided');
    }

    const userExists = users.find((u) => u.id === userId);

    if (!userExists) {
      return res.status(400).send('User not found');
    }

    const newExpens = createExpens(
      id,
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    );

    expenses.push(newExpens);
    res.status(201).json(newExpens);
  });

  app.delete('/expenses/:id', (req, res) => {
    const { id } = req.params;
    const getById = expenses.findIndex((expense) => expense.id === Number(id));

    if (getById === -1) {
      return res.status(404).send('Not found');
    }

    const [deletedId] = expenses.splice(getById, 1);

    res.status(204).send(deletedId);
  });

  app.patch('/expenses/:id', (req, res) => {
    const { id } = req.params;
    const getById = expenses.find((expense) => expense.id === Number(id));

    if (!getById) {
      return res.status(404).send('Not found');
    }

    res.status(200).send(Object.assign(getById, req.body));
  });

  app.get('/users', (req, res) => {
    res.status(200).send(users);
  });

  app.get('/users/:id', (req, res) => {
    const { id } = req.params;
    const getById = users.find((user) => user.id === Number(id));

    if (!getById) {
      return res.status(404).send('Not found');
    }
    res.send(getById);
  });

  app.post('/users', (req, res) => {
    const { name } = req.body;
    const id = nextUserId++;

    if (!name) {
      return res.status(400).send('Name is not provided');
    }

    const newUsers = createUsers(id, name);

    users.push(newUsers);
    res.status(201).json(newUsers);
  });

  app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    const getById = users.findIndex((user) => user.id === Number(id));

    if (getById === -1) {
      return res.status(404).send('Not found');
    }

    const [deletedId] = users.splice(getById, 1);

    res.status(204).send(deletedId);
  });

  app.patch('/users/:id', (req, res) => {
    const { id } = req.params;
    const getById = users.find((user) => user.id === Number(id));

    if (!getById) {
      return res.status(404).send('Not found');
    }

    res.status(200).send(Object.assign(getById, req.body));
  });

  return app;
}

module.exports = {
  createServer,
};
