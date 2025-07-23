'use strict';

const userService = require('./services/user.service');
const expensService = require('./services/expens.service');
const express = require('express');
const { getUser } = require('./services/user.service');

function createServer() {
  // Use express to create a server
  const app = express();

  app.get('/users', express.json(), (req, res) => {
    const users = userService.getUsers();

    res.status(200);
    res.send(users);
  });

  app.get('/users/:id', express.json(), (req, res) => {
    const { id } = req.params;

    if (!id) {
      res.status(400);
      res.send('user id is not provided');
    }

    const user = userService.getUser(id);

    if (!user) {
      res.status(404);
      res.send('User not found');
    }

    res.status(200);
    res.send(user);
  });

  app.post('/users', express.json(), (req, res) => {
    const { name } = req.body;
    if (!name || typeof name !== 'string' || name.trim() === '') {
      res.status(400);
      res.send('Name is not provided or invalid');

      return;
    }
    const newUser = userService.createUser(name);

    if (!newUser) {
      res.status(400);
      res.send('Name is not provided');
    }

    res.status(201);
    res.send(newUser);
  });

  app.delete('/users/:id', express.json(), (req, res) => {
    const { id } = req.params;
    const user = userService.getUser(id);

    if (!user) {
      res.status(404);
      res.send('Not Found');

      return;
    }

    userService.deleteUser(id);

    res.status(204);
    res.send();
  });

  app.patch('/users/:id', express.json(), (req, res) => {
    const { id } = req.params;
    const user = userService.getUser(id);

    if (!user) {
      res.status(404).send('Not Found');

      return;
    }

    const updatedUser = userService.updateUser(id, req.body.name);

    res.status(200).json(updatedUser);
  });

  app.get('/expenses', express.json(), (req, res) => {
    let expenses = expensService.getExpenses();
    const { userId, categories, from, to } = req.query;

    if (userId) {
      expenses = expenses.filter((exp) => exp.userId === Number(userId));
    }

    if (categories) {
      expenses = expenses.filter((exp) => exp.category === categories);
    }

    if (from && to) {
      const fromDate = new Date(from);
      const toDate = new Date(to);

      expenses = expenses.filter(
        (exp) =>
          new Date(exp.spentAt) >= fromDate && new Date(exp.spentAt) <= toDate,
      );
    }

    res.status(200);

    return res.send(expenses);
  });

  app.get('/expenses/:id', express.json(), (req, res) => {
    const { id } = req.params;

    const exp = expensService.getExpenseById(id);

    if (!exp) {
      res.status(404);
      res.send('Not Found');

      return;
    }

    res.status(200);
    res.send(exp);
  });

  app.post('/expenses', express.json(), (req, res) => {
    const { title, amount, category, userId } = req.body;

    if (!title || !amount || !category || !userId || !getUser(userId)) {
      res.status(400);
      res.send('Bad Request');

      return;
    }

    const newExpense = expensService.createExpense(req.body);

    res.status(201);
    res.send(newExpense);
  });

  app.patch('/expenses/:id', express.json(), (req, res) => {
    const { id } = req.params;
    const exp = expensService.getExpenseById(id);

    if (!exp) {
      res.status(404).send('Not Found');

      return;
    }

    const updatedExpense = expensService.updateExpense(id, req.body);

    res.status(200).json(updatedExpense);
  });

  app.delete('/expenses/:id', express.json(), (req, res) => {
    const id = Number(req.params.id);
    const exp = expensService.getExpenseById(id);

    if (!exp) {
      res.status(404).send('Not Found');

      return;
    }

    res.status(204).json(expensService.deleteExpense(id));
  });

  // Add a routes to the server

  return app;
}

module.exports = {
  createServer,
};
