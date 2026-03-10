'use strict';

const express = require('express');

const { v4: uuidv4 } = require('uuid');

function createServer() {


  const app = express();

  app.use(express.json());

  const users = [];

  app.get('/users', (req, res) => {
    res.json(users);
  })

  app.get('/users/:id', (req, res) => {
    // const { id } = req.params;
    const id = req.params.id;

    const user = users.find(user => user.id === id);

    if (!user) {
      return res.status(404).send('User not found');
    }

    res.json(user);

  })

  app.post('/users', (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.status(400).send('Name is required');
    }

    const user = {
      id: uuidv4(),
      name,
    }

    users.push(user);

    res.status(201).json(user);
  })

  app.patch('/users/:id', (req, res) => {
    //  const { id } = req.params;
    const id = req.params.id;

    const { name } = req.body;
    if (!name) {
      return res.status(400).send('Name is required');
    }

    const user = users.find(user => user.id === id);
    if (!user) {
      return res.status(404).send('User not found');
    }

    user.name = name;

    res.json(user);

  })

  app.delete('/users/:id', (req, res) => {
    // const { id } = req.params;
    const id = req.params.id;
    const OriginalLength = users.length;

    const filteredUsers = users.filter(user => user.id !== id);

    if (OriginalLength === filteredUsers.length) {
      return res.status(404).send('User not found');
    }

    users.length = 0;
    users.push(... filteredUsers);

    res.status(204).send();

  })

  const expenses = [];

  app.get('/expenses', (req, res) => {
    res.json(expenses);
  })

  app.post('/expenses', (req, res) => {
    const { title, amount } = req.body;

    if (!title || !amount) {
      return res.status(400).send('Title and Amount are required ')
    }

    const expense = {
      id: uuidv4(),
      title,
      amount,
    }

    expenses.push(expense);

    res.status(201).json(expense);
  })


  return app;
}

module.exports = {
  createServer,
};
