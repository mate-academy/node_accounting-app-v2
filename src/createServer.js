'use strict';

const express = require('express');
const usersService = require('./services/users');
const expensesService = require('./services/expenses');

function createServer() {
  const app = express();

  usersService.init();
  expensesService.init();

  app.get('/users', express.json(), (req, res) => {
    const users = usersService.getAll();

    res.send(users);
  });

  app.post('/users', express.json(), (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    };

    const newUser = usersService.addOne(name);

    res.statusCode = 201;
    res.send(newUser);
  });

  app.get('/users/:userId', express.json(), (req, res) => {
    const { userId } = req.params;

    const foundUser = usersService.getOne(userId);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    res.statusCode = 200;
    res.send(foundUser);
  });

  app.delete('/users/:userId', express.json(), (req, res) => {
    const { userId } = req.params;

    const foundUser = usersService.getOne(userId);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    usersService.deleteOne(userId);
    res.sendStatus(204);
  });

  app.patch('/users/:userId', express.json(), (req, res) => {
    const { userId } = req.params;
    const { name } = req.body;

    const foundUser = usersService.getOne(userId);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    const updatedUser = usersService.updateOne(userId, name);

    res.send(updatedUser);
  });

  app.get('/expenses', express.json(), (req, res) => {
    const { userId, category, from, to } = req.query;
    const foundExpenses = expensesService.getAll(userId, category, from, to);

    res.send(foundExpenses);
  });

  app.post('/expenses', express.json(), (req, res) => {
    const {
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    } = req.body;

    const foundUser = usersService.getOne(userId);

    if (!foundUser) {
      res.sendStatus(400);

      return;
    }

    const newExpense = expensesService.addOne(
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    );

    res.statusCode = 201;
    res.send(newExpense);
  });

  app.get('/expenses/:expenseId', express.json(), (req, res) => {
    const { expenseId } = req.params;

    const foundExpense = expensesService.getOne(expenseId);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    res.send(foundExpense);
  });

  app.delete('/expenses/:expenseId', express.json(), (req, res) => {
    const { expenseId } = req.params;

    const foundExpense = expensesService.getOne(expenseId);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    expensesService.deleteOne(expenseId);
    res.sendStatus(204);
  });

  app.patch('/expenses/:expenseId', express.json(), (req, res) => {
    const { expenseId } = req.params;
    const { title } = req.body;

    let foundExpense = expensesService.getOne(expenseId);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    foundExpense = expensesService.updateOne(expenseId, title);

    res.send(foundExpense);
  });

  return app;
}

module.exports = {
  createServer,
};
