'use strict';

const express = require('express');

function createServer() {
  const app = express();
  const dataStore = {
    users: [],
    expenses: [],
  };

  app.use(express.json());

  app.get('/', (req, res) => {
    res.send('Welcome to the API');
  });

  app.get('/users', (req, res) => {
    res.status(200).send(dataStore.users);
  });

  app.post('/users', (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.status(400).send({ error: 'Name is required' });
    }

    const user = {
      id: dataStore.users.length,
      name,
    };

    dataStore.users.push(user);

    res.status(201).send(user);
  });

  app.get('/users/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const user = dataStore.users.find((u) => u.id === id);

    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }

    res.status(200).send(user);
  });

  app.delete('/users/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);

    const userIndex = dataStore.users.findIndex((u) => u.id === id);

    if (userIndex === -1) {
      return res.status(404).send('Not found');
    }

    dataStore.users.splice(userIndex, 1);
    res.sendStatus(204);
  });

  app.patch('/users/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);

    const { name } = req.body;

    if (!name) {
      res.status(400).send({ error: 'Name is required' });
    }

    const userIndex = dataStore.users.findIndex((u) => u.id === id);

    if (userIndex === -1) {
      res.status(404).send({ error: 'User not found' });
    }

    dataStore.users[userIndex].name = name;
    res.status(200).send(dataStore.users[userIndex]);
  });

  app.get('/expenses', (req, res) => {
    let expenses = dataStore.expenses;
    const { userId, from, to, categories } = req.query;

    if (userId) {
      const userIdInt = parseInt(userId, 10);

      expenses = expenses.filter((expense) => expense.userId === userIdInt);
    }

    if (from) {
      const fromDate = new Date(from);

      expenses = expenses.filter(
        (expense) => new Date(expense.spentAt) >= fromDate,
      );
    }

    if (to) {
      const toDate = new Date(to);

      expenses = expenses.filter(
        (expense) => new Date(expense.spentAt) <= toDate,
      );
    }

    if (categories) {
      expenses = expenses.filter((e) => categories.includes(e.category));
    }

    res.status(200).json(expenses);
  });

  app.post('/expenses', (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    const userExists = dataStore.users.some(
      (user) => user.id === parseInt(userId, 10),
    );

    if (!userExists) {
      return res.status(400).send({ error: 'User not found' });
    }

    const expense = {
      id: dataStore.expenses.length,
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    };

    dataStore.expenses.push(expense);

    res.status(201).send(expense);
  });

  app.get('/expenses/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const expense = dataStore.expenses.find((e) => e.id === id);

    if (!expense) {
      return res.status(404).send({ error: 'Expense not found' });
    }

    res.status(200).send(expense);
  });

  app.patch('/expenses/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { title, amount, category, note } = req.body;

    const index = dataStore.expenses.findIndex((e) => e.id === id);

    if (index === -1) {
      return res.status(404).send({ error: 'Expense not found' });
    }

    if (title) {
      dataStore.expenses[index].title = title;
    }

    if (amount) {
      dataStore.expenses[index].amount = amount;
    }

    if (category) {
      dataStore.expenses[index].category = category;
    }

    if (note) {
      dataStore.expenses[index].note = note;
    }

    res.status(200).send(dataStore.expenses[index]);
  });

  app.delete('/expenses/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);

    const index = dataStore.expenses.findIndex((u) => u.id === id);

    if (index === -1) {
      return res.status(404).send('Not found');
    }

    dataStore.expenses.splice(index, 1);
    res.sendStatus(204);
  });

  return app;
}

module.exports = {
  createServer,
};
