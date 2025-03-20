'use strict';

const express = require('express');
const cors = require('cors');
const userService = require('./services/user.service');
const expenseService = require('./services/expense.service');

function createServer() {
  // Use express to create a server
  // Add a routes to the server
  // Return the server (express app)
  const app = express();

  app.use(express.json());
  app.use(cors());

  userService.emptyUsers();
  expenseService.emptyExpenses();

  app.get('/users', (req, res) => {
    const users = userService.getAll();

    res.json(users);
  });

  app.get('/users/:id', (req, res) => {
    const id = +req.params.id;
    const user = userService.getById(id);

    if (!user) {
      // console.log(`get user not found. id = ${id}`);

      return res.sendStatus(404);
    }

    res.json(user);
  });

  app.post('/users', (req, res) => {
    const name = req.body.name;

    if (!name) {
      return res.sendStatus(400);
    }

    const user = userService.create(name);

    // console.log('post users', user);

    res.status(201).json(user);
  });

  app.delete('/users/:id', (req, res) => {
    const id = +req.params.id;
    const user = userService.getById(id);

    if (!user) {
      return res.sendStatus(404);
    }

    userService.deleteById(id);

    res.sendStatus(204);
  });

  app.patch('/users/:id', (req, res) => {
    const { name } = req.body;

    const user = userService.getById(+req.params.id);

    if (!user) {
      // console.log(`update user not found. id = ${req.params.id}`);

      return res.sendStatus(404);
    }

    const updatedUser = userService.update({
      id: +req.params.id,
      name,
    });

    res.json(updatedUser);
  });

  app.get('/expenses', (req, res) => {
    const userId = +req.query.userId;
    const from = req.query.from;
    const to = req.query.to;
    const categories = req.query.categories;

    const expenses = expenseService.getExpenses(userId, from, to, categories);

    res.json(expenses);
  });

  app.get('/expenses/:id', (req, res) => {
    const id = +req.params.id;
    const expense = expenseService.getById(id);

    if (!expense) {
      return res.sendStatus(404);
    }

    res.json(expense);
  });

  app.post('/expenses', (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (!userId || !spentAt || !title || !amount || !category) {
      return res.sendStatus(400);
    }

    const user = userService.getById(userId);

    if (!user) {
      return res.sendStatus(400);
    }

    const expense = expenseService.create({
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    });

    res.status(201).json(expense);
  });

  app.delete('/expenses/:id', (req, res) => {
    const id = +req.params.id;
    const expense = expenseService.getById(id);

    if (!expense) {
      return res.sendStatus(404);
    }

    expenseService.deleteById(id);

    res.sendStatus(204);
  });

  app.patch('/expenses/:id', (req, res) => {
    const { spentAt, title, amount, category, note } = req.body;

    const expense = expenseService.getById(+req.params.id);

    if (!expense) {
      return res.sendStatus(404);
    }

    const updatedExpense = expenseService.update({
      id: +req.params.id,
      spentAt,
      title,
      amount,
      category,
      note,
    });

    res.json(updatedExpense);
  });

  return app;
}

module.exports = {
  createServer,
};
