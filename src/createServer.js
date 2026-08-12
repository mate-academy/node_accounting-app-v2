'use strict';

const express = require('express');
const cors = require('cors');
const usersService = require('./usersService.js');
const expensesService = require('./expensesService.js');

function createServer() {
  const users = [];
  const expenses = [];

  const app = express();

  app.use(express.json());

  app.use(cors());

  app.use((req, res, next) => {
    res.set('Access-Control-Allow-Origin', '*');
    next();
  });

  app.get('/users', (req, res) => {
    res.status(200).json(users);
  });

  app.post('/users', (req, res) => {
    const user = req.body.name;

    if (user === undefined) {
      res.sendStatus(400);
    }

    const createdUser = usersService.addOneUser(user, users);

    res.status(201).json(createdUser);
  });

  app.get('/users/:id', (req, res) => {
    const userId = req.params.id;

    if (!userId) {
      res.sendStatus(400);

      return;
    }

    const someUser = usersService.getUserById(userId, users);

    if (someUser === undefined) {
      res.sendStatus(404);

      return;
    }

    res.status(200).json(someUser);
  });

  app.delete('/users/:id', (req, res) => {
    const userId = req.params.id;

    if (userId === undefined) {
      res.sendStatus(400);

      return;
    }

    const deletedUser = usersService.deleteUserById(userId, users);

    if (!deletedUser) {
      res.sendStatus(404);

      return;
    }

    res.status(204).json(deletedUser[0]);
  });

  app.patch('/users/:id', (req, res) => {
    const userId = req.params.id;
    const name = req.body.name;

    if (!name) {
      res.sendStatus(404);

      return;
    }

    if (!userId) {
      res.sendStatus(400);

      return;
    }

    const updateUser = usersService.patchItem(userId, name, users);

    if (!updateUser) {
      res.status(404);

      return;
    }

    res.status(200).json(updateUser);
  });

  app.get('/expenses', (req, res) => {
    res.status(200).json(expenses);
  });

  app.post('/expenses', (req, res) => {
    const body = req.body;

    if (
      body.spentAt === undefined ||
      body.title === undefined ||
      body.amount === undefined ||
      body.category === undefined ||
      body.note === undefined
    ) {
      res.sendStatus(400);

      return;
    }

    const newExpense = expensesService.createExpense(body, expenses);

    if (!newExpense) {
      res.status(400);

      return;
    }

    res.status(201).json(newExpense);
  });


  app.get('/expenses/:id', (req, res) => {
    const id = req.params.id;

    if (!id) {
      res.status(400);

      return;
    }

    const expense = expensesService.getExpenseById(id, expenses);

    if (!expense) {
      res.status(400);

      return;
    }

    res.status(200).json(expense);
  });

  app.delete('/expenses/:id', (req, res) => {
    const id = req.params.id;

    if (!id) {
      res.sendStatus(400);

      return;
    }

    const deletedExpense = expensesService.deleteExpenseById(id, expenses);

    if (!deletedExpense) {
      res.sendStatus(400);

      return;
    }

    res.status(204).json(deletedExpense);
  });

  app.patch('/expenses/:id', (req, res) => {
    const id = req.params.id;
    const body = req.body;

    if (id === undefined) {
      res.sendStatus(400);

      return;
    }

    if (
      body.userId === undefined ||
      body.spentAt === undefined ||
      body.title === undefined ||
      body.amount === undefined ||
      body.category === undefined ||
      body.note === undefined
    ) {
      res.sendStatus(400);

      return;
    }

    const updatedExpense = expensesService.updateExpenseById(
      id,
      body,
      expenses,
    );

    if (!updatedExpense) {
      res.status(404);

      return;
    }

    res.status(201).json(updatedExpense);
  });

  return app;
}

module.exports = {
  createServer,
};
