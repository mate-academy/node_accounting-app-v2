'use strict';

const express = require('express');
const expenseService = require('./services/expenses');
const userService = require('./services/users');

function createServer() {
  const app = express();

  app.use(express.json());

  // expenses routing

  app.get('/expenses', (req, res) => {
    const { userId, from, to, categories } = req.query;
    let copyExpenses = [...expenseService.getAll()];

    if (+userId) {
      copyExpenses = copyExpenses.filter(expense => expense.userId === +userId);
    }

    if (from) {
      copyExpenses = copyExpenses.filter(expense => expense.spentAt >= from);
    }

    if (to) {
      copyExpenses = copyExpenses.filter(expense => expense.spentAt <= to);
    }

    if (categories) {
      copyExpenses
        = copyExpenses.filter(expense => categories.includes(expense.category));
    }

    res.send(copyExpenses);
  });

  app.get('/expenses/:expenseId', (req, res) => {
    const { expenseId } = req.params;
    const foundExpense = expenseService.getById(expenseId);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    res.send(foundExpense);
  });

  app.post('/expenses', (req, res) => {
    const {
      amount,
      category,
      note,
      spentAt,
      title,
      userId,
    } = req.body;
    const foundUser = userService.getById(userId);

    if (!amount || !category || !note || !spentAt || !title || !foundUser) {
      res.sendStatus(400);

      return;
    }

    const newExpense = expenseService.create(req.body);

    res.status(201);
    res.send(newExpense);
  });

  app.delete('/expenses/:expenseId', (req, res) => {
    const { expenseId } = req.params;
    const foundExpense = expenseService.getById(expenseId);

    if (!foundExpense) {
      return res.sendStatus(404);
    }

    expenseService.remove(expenseId);
    res.sendStatus(204);
  });

  app.patch('/expenses/:expenseId', (req, res) => {
    const { expenseId } = req.params;
    const foundExpense = expenseService.getById(expenseId);

    if (!foundExpense) {
      return res.sendStatus(404);
    }

    expenseService.update(foundExpense, req.body);
    res.send(foundExpense);
  });

  // user routing

  app.get('/users', (req, res) => {
    const users = userService.getAll();

    res.send(users);
  });

  app.get('/users/:userId', (req, res) => {
    const { userId } = req.params;
    const foundUser = userService.getById(userId);

    if (!foundUser) {
      return res.sendStatus(404);
    }

    res.send(foundUser);
  });

  app.post('/users', (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    const newUser = userService.create(req.body);

    res.status(201);
    res.send(newUser);
  });

  app.delete('/users/:userId', (req, res) => {
    const { userId } = req.params;
    const foundUser = userService.getById(userId);

    if (!foundUser) {
      return res.sendStatus(404);
    }

    userService.remove(userId);
    res.sendStatus(204);
  });

  app.patch('/users/:userId', (req, res) => {
    const { userId } = req.params;
    const { name } = req.body;
    const foundUser = userService.getById(userId);

    if (!foundUser) {
      return res.sendStatus(404);
    }

    if (!name) {
      return res.sendStatus(400);
    }

    userService.update(userId, req.body);
    res.send(foundUser);
  });

  expenseService.reset();
  userService.reset();

  return app;
}

module.exports = {
  createServer,
};
