'use strict';

const express = require('express');

const {
  getPreparedExpenses,
  getFilteredItems,
  getItemById,
  getNewId,
} = require('./utils/utils');

function createServer() {
  const app = express();

  let users = [];
  let expenses = [];

  app.get('/users', (req, res) => {
    res.send(users);
  });

  app.get('/users/:id', (req, res) => {
    const { id } = req.params;
    const user = getItemById(id, users);

    if (!user) {
      res.status(404).send('The user with this ID does not exist.');
    }

    res.send(user);
  });

  app.post('/users', express.json(), (req, res) => {
    const { name } = req.body;
    const id = getNewId(users);

    if (!name) {
      res.status(400).send('Incorrect or missing request parameters.');
    }

    const newUser = {
      id,
      name,
    };

    users.push(newUser);

    res.status(201).send(newUser);
  });

  app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    const newUsers = getFilteredItems(id, users);

    if (users.length === newUsers.length) {
      res.status(404).send('The user with this ID does not exist.');
    }

    users = newUsers;
    res.status(204).send(`The user with ${id} ID was successfully deleted.`);
  });

  app.patch('/users/:id', express.json(), (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const user = getItemById(id, users);

    if (!user) {
      res.status(404).send('The user with this ID does not exist.');
    }

    if (typeof name !== 'string') {
      res.status(400).send('Incorrect or missing request parameters.');
    }

    Object.assign(user, { name });

    res.send(user);
  });

  app.get('/expenses', (req, res) => {
    res.send(getPreparedExpenses(req.query, expenses));
  });

  app.get('/expenses/:id', (req, res) => {
    const { id } = req.params;

    if (isNaN(Number(id))) {
      res.status(400).send('Incorrect or missing request parameters.');
    }

    const expense = getItemById(id, expenses);

    if (!expense) {
      res.status(404).send(`The expense with ${id} ID does not exist.`);
    }

    res.send(expense);
  });

  app.post('/expenses', express.json(), (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;
    const user = getItemById(userId, users);
    const id = getNewId(expenses);

    if (!user || !spentAt || !title || !amount || !category) {
      res.status(400).send('Incorrect or missing request parameters.');
    }

    const newExpense = {
      id,
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

  app.delete('/expenses/:id', (req, res) => {
    const { id } = req.params;
    const newExpenses = getFilteredItems(id, expenses);

    if (newExpenses.length === expenses.length) {
      res.status(404).send(`The expense with ${id} ID does not exist.`);
    }

    expenses = newExpenses;
    res.status(204).send(`The expense with ${id} ID was successfully deleted.`);
  });

  app.patch('/expenses/:id', express.json(), (req, res) => {
    const { id } = req.params;
    const { title, spentAt, amount, category, note } = req.body;
    const expense = getItemById(id, expenses);

    if (!expense) {
      res.status(404).send(`The expense with ${id} ID does not exist.`);
    }

    Object.assign(expense, {
      spentAt: spentAt || expense.spentAt,
      title: title || expense.title,
      amount: amount || expense.amount,
      category: category || expense.category,
      note: note || expense.note,
    });

    res.status(200).send(expense);
  });

  return app;
}

module.exports = {
  createServer,
};
