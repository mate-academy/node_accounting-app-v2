'use strict';

const express = require('express');
const cors = require('cors');
const usersService = require('./services/users');
const expensesService = require('./services/expenses');

function createServer() {
  usersService.removeAll();
  expensesService.removeAll();

  const app = express();

  app.use(cors());

  // #region users

  app.get('/users', (req, res) => {
    const users = usersService.getAll();

    res.send(users);
  });

  app.get('/users/:userId', (req, res) => {
    const userId = +req.params.userId;
    const foundUser = usersService.getById(userId);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    res.send(foundUser);
  });

  app.delete('/users/:userId', (req, res) => {
    const userId = +req.params.userId;
    const foundUser = usersService.getById(userId);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    usersService.remove(userId);
    res.sendStatus(204);
  });

  app.post('/users', express.json(), (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    const newUser = usersService.create(name);

    res.statusCode = 201;
    res.send(newUser);
  });

  app.patch('/users/:userId', express.json(), (req, res) => {
    const userId = +req.params.userId;
    const { name } = req.body;

    const foundUser = usersService.getById(userId);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    if (!name) {
      res.sendStatus(400);

      return;
    }

    const updatedUser = usersService.update(name, userId);

    res.send(updatedUser);
  });

  // #endregion

  app.get('/expenses', (req, res) => {
    const { userId, from, to, categories } = req.query;
    const filteredExpenses = expensesService.getFiltered({
      userId,
      from,
      to,
      categories,
    });

    res.send(filteredExpenses);
  });

  app.get('/expenses/:expenseId', (req, res) => {
    const expenseId = +req.params.expenseId;
    const foundExpense = expensesService.getById(expenseId);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    res.send(foundExpense);
  });

  app.delete('/expenses/:expenseId', (req, res) => {
    const expenseId = +req.params.expenseId;
    const foundExpense = expensesService.getById(expenseId);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    expensesService.remove(expenseId);
    res.sendStatus(204);
  });

  app.post('/expenses', express.json(), (req, res) => {
    const { title, userId } = req.body;

    const user = usersService.getById(userId);

    if (!title || !user) {
      res.sendStatus(400);

      return;
    }

    const newExpense = expensesService.create(req.body);

    res.statusCode = 201;
    res.send(newExpense);
  });

  app.patch('/expenses/:expenseId', express.json(), (req, res) => {
    const expenseId = +req.params.expenseId;
    const data = req.body;

    const expense = expensesService.getById(expenseId);

    if (!expense) {
      res.sendStatus(404);

      return;
    }

    const updatedExpense = expensesService.update(data, expenseId);

    res.statusCode = 200;
    res.send(updatedExpense);
  });

  return app;
}

module.exports = {
  createServer,
};
