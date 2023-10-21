'use strict';

const express = require('express');
const users = [];
const expenses = [];
let userId = 0;
let expenseId = 0;

function createServer() {
  const app = express();

  app.use(express.json());

  // User Routes
  app.post('/users', (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.status(400).send();
    }

    const newUser = {
      id: ++userId,
      name,
    };

    users.push(newUser);
    res.status(201).json(newUser);
  });

  app.get('/users', (req, res) => {
    res.status(200).json(users);
  });

  app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));

    if (!user) {
      return res.status(404).send();
    }
    res.status(200).json(user);
  });

  app.put('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));

    if (!user) {
      return res.status(404).send();
    }

    const { name } = req.body;

    if (name) {
      user.name = name;
    }
    res.status(200).json(user);
  });

  app.delete('/users/:id', (req, res) => {
    const index = users.findIndex(u => u.id === parseInt(req.params.id));

    if (index === -1) {
      return res.status(404).send();
    }
    users.splice(index, 1);
    res.status(204).send();
  });

  // Expense Routes
  app.post('/expenses', (req, res) => {
    const { description, amount, userId: userIdFromReq } = req.body;

    if (!description || !amount || !userIdFromReq) {
      return res.status(400).send();
    }

    const newExpense = {
      id: ++expenseId,
      description,
      amount,
      userId: userIdFromReq,
    };

    expenses.push(newExpense);
    res.status(201).json(newExpense);
  });

  app.get('/expenses', (req, res) => {
    res.status(200).json(expenses);
  });

  app.get('/expenses/:id', (req, res) => {
    const expense = expenses.find(e => e.id === parseInt(req.params.id));

    if (!expense) {
      return res.status(404).send();
    }
    res.status(200).json(expense);
  });

  app.put('/expenses/:id', (req, res) => {
    const expense = expenses.find(e => e.id === parseInt(req.params.id));

    if (!expense) {
      return res.status(404).send();
    }

    const { description, amount } = req.body;

    if (description) {
      expense.description = description;
    }

    if (amount) {
      expense.amount = amount;
    }
    res.status(200).json(expense);
  });

  app.delete('/expenses/:id', (req, res) => {
    const index = expenses.findIndex(e => e.id === parseInt(req.params.id));

    if (index === -1) {
      return res.status(404).send();
    }
    expenses.splice(index, 1);
    res.status(204).send();
  });

  return app;
}

module.exports = {
  createServer,
};
