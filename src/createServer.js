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
    res.status(201).json(users);
  });

  app.post('/users', (req, res) => {
    const user = req.body.name;

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

    res.status(201).json(someUser);
  });

  app.delete('/users/:id', (req, res) => {
    const userId = req.params.id;

    if (userId) {
      res.sendStatus(400);
    }

    const deletedUser = usersService.deleteUserById(userId, users);

    if (!deletedUser) {
      res.sendStatus(404);

      return;
    }

    res.status(201).json(deletedUser);
  });

  app.patch('/users/:id', (req, res) => {
    const userId = req.params.id;
    const name = req.body.name;

    if (!name || !userId) {
      req.sendStatus(400);
    }

    const updateUser = usersService.patchItem(userId, name, users);

    if (!updateUser) {
      res.sendStatus(404);
      res.send('Not found such user');

      return;
    }

    res.status(201).json(updateUser);
  });

  // expenses

  app.get('/expenses', (req, res) => {
    res.send(expenses);
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
      res.sendStatus(404);

      return;
    }

    res.status(201).json(newExpense);
  });

  // app.post('/expenses', (req, res) => {
  //   const body = req.body;

  //   if (
  //     !body.userId ||
  //     !body.spentAt ||
  //     !body.title ||
  //     !body.amount ||
  //     !body.category ||
  //     !body.note
  //   ) {
  //     res.sendStatus(400);

  //     return;
  //   }

  //   const newExpense = expensesService.createExpense(body, expenses);

  //   if (!newExpense) {
  //     res.sendStatus(404);

  //     return;
  //   }

  //   res.send(newExpense);
  // });

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

    res.status(201).json(expense);
  });

  app.delete('/expenses/:id', (req, res) => {
    const id = req.params.id;

    if (!id) {
      req.sendStatus(400);
    }

    const deletedExpense = expensesService.deleteExpenseById(id, expenses);

    if (!deletedExpense) {
      res.sendStatus(400);

      return;
    }

    res.status(201).json(deletedExpense);
  });

  app.patch('/expenses/:id', (req, res) => {
    const id = req.params.id;
    const body = req.body;

    if (!id) {
      req.sendStatus(400);
    }

    if (
      body.userId === undefined ||
      body.spentAt === undefined ||
      body.title === undefined ||
      body.amount === undefined ||
      body.category === undefined ||
      body.note === undefined
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

    res.send(updatedExpense);

    res.status(201).json(updatedExpense);
  });

  return app;
}

module.exports = {
  createServer,
};
