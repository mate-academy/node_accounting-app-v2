'use strict';

const express = require('express');

const { Expenses } = require('./services/Expenses.js');
const { Users } = require('./services/users.js');

function createServer() {
  const app = express();

  const expenses = new Expenses();
  const users = new Users();

  app.use(express.json());

  app.get('/users', (req, res) => {
    res.send(users.getAll());
  });

  app.get('/users/:userId', (req, res) => {
    const { userId } = req.params;

    const user = users.getOne(userId);

    if (!user) {
      res.sendStatus(404);

      return;
    }

    res.send(user);
  });

  app.post('/users', (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    res.statusCode = 201;
    res.send(users.create(name));
  });

  app.delete('/users/:userId', (req, res) => {
    const { userId } = req.params;

    const userToDelete = users.getOne(userId);

    if (!userToDelete) {
      res.sendStatus(404);

      return;
    }

    users.deleteOne(userId);
    res.sendStatus(204);
  });

  app.patch('/users/:userId', (req, res) => {
    const { userId } = req.params;
    const { name } = req.body;

    const user = users.getOne(userId);

    if (!user) {
      res.sendStatus(404);

      return;
    }

    if (!name) {
      res.sendStatus(400);

      return;
    }

    const modifiedUser = users.modifyOne(userId, name);

    res.statusCode = 200;
    res.send(modifiedUser);
  });

  app.get('/expenses', (req, res) => {
    const searchParams = req.query;

    if (!searchParams) {
      res.send(expenses.getAll());

      return;
    }

    res.send(expenses.getFiltered(searchParams));
  });

  app.get('/expenses/:expenseId', (req, res) => {
    const { expenseId } = req.params;

    const expense = expenses.getOne(expenseId);

    if (!expense) {
      res.sendStatus(404);

      return;
    }

    res.send(expense);
  });

  app.post('/expenses', (req, res) => {
    const {
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    } = req.body;

    const user = users.getOne(userId);

    const allCorrect = user && spentAt && title && amount && category;

    if (!allCorrect) {
      res.sendStatus(400);

      return;
    }

    res.statusCode = 201;

    res.send(expenses.create(
      userId,
      spentAt,
      title,
      amount,
      category,
      note
    ));
  });

  app.delete('/expenses/:expenseId', (req, res) => {
    const { expenseId } = req.params;

    const expense = expenses.getOne(expenseId);

    if (!expense) {
      res.sendStatus(404);

      return;
    }

    expenses.deleteOne(expenseId);
    res.sendStatus(204);
  });

  app.patch('/expenses/:expenseId', (req, res) => {
    const { expenseId } = req.params;
    const expenseBody = req.body;

    const expense = expenses.getOne(expenseId);

    if (!expense) {
      res.sendStatus(404);

      return;
    }

    if (!expenseBody) {
      res.sendStatus(400);

      return;
    }

    const modifiedExpense = expenses.modifyOne(expenseId, expenseBody);

    res.statusCode = 200;
    res.send(modifiedExpense);
  });

  return app;
}

module.exports = {
  createServer,
};
