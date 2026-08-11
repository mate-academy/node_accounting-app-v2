'use strict';

const express = require('express');
// const Router = require('express');
const cors = require('cors');
const usersService = require('./usersService');
const { expensesService } = require('./expensesService');

function createServer() {
  const users = [];
  const expenses = [];

  const app = express();

  app.use(express.json());

  app.use(cors());

  app.get('/users', (req, res) => {
    res.send(users);
  });

  app.post('/users', (req, res) => {
    const user = req.body.name;

    usersService.addOneUser(user, users);

    res.send(users);
  });

  app.get('/users/:id', (req, res) => {
    const userId = req.params.id;

    const someUser = usersService.getUserById(userId, users);

    if (someUser === undefined) {
      res.sendStatus(404);

      return;
    }

    res.send(someUser);
  });

  app.delete('/users/:id', (req, res) => {
    const userId = req.params.id;

    const deletedUser = usersService.deleteUserById(userId, users);

    if (!deletedUser) {
      res.sendStatus(404);

      return;
    }

    res.send(deletedUser);
  });

  app.patch('/users/:id', (req, res) => {
    const userId = req.params.id;
    const name = req.body.name;

    if (!name) {
      req.sendStatus(400);
    }

    const updateUser = usersService.patchItem(userId, name, users);

    if (!updateUser) {
      res.sendStatus(404);
      res.send('Not found such user');

      return;
    }

    res.send(updateUser);
  });

  // expenses

  app.get('/expenses', (req, res) => {
    res.send(expenses);
  });

  app.post('/expenses', (req, res) => {
    const body = req.body;

    if (
      !body.userId ||
      !body.spentAt ||
      !body.title ||
      !body.amount ||
      !body.category ||
      !body.note
    ) {
      res.sendStatus(400);

      return;
    }

    const newExpense = expensesService.createExpense(body, expenses);

    if (!newExpense) {
      res.sendStatus(404);

      return;
    }

    res.send(newExpense);
  });

  app.get('/expenses/:id', (req, res) => {
    const id = req.params.id;

    if (!id) {
      req.sendStatus(400);
    }

    const expense = expensesService.getExpenseById(id, expenses);

    if (!expense) {
      res.sendStatus(400);

      return;
    }

    res.send(expense);
  });

  app.delete('/expenses/:id', (req, res) => {
    const id = req.params.id;

    if (!id) {
      req.sendStatus(400);
    }

    const deletedExpense = expensesService.getExpenseById(id, expenses);

    if (!deletedExpense) {
      res.sendStatus(400);

      return;
    }

    res.send(deletedExpense);
  });

  app.patch('/expenses/:id', (req, res) => {
    const id = req.params.id;
    const body = req.body;

    if (!id) {
      req.sendStatus(400);
    }

    if (
      !body.spentAt ||
      !body.title ||
      !body.amount ||
      !body.category ||
      !body.note
    ) {
      req.statusCode(400);
    }

    const updatedExpense = expensesService.updateExpenseById(
      id,
      body,
      expenses,
    );

    if (!updatedExpense) {
      req.sendStatus(404);
    }

    console.log(updatedExpense);

    req.send(updatedExpense);
  });

  return app;
}

module.exports = {
  createServer,
};
