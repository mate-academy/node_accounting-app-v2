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

    if (!name || !userId) {
      res.sendStatus(404);

      return;
    }

    const updateUser = usersService.patchItem(userId, name, users);

    if (!updateUser) {
      res.status(404).json('Not found');

      return;
    }

    res.status(200).json(updateUser);
  });

  app.get('/expenses', (req, res) => {
    let filteredExpenses = expenses;
    const categories = req.query.categories;
    const userId = req.query.userId;

    if (userId !== undefined) {
      filteredExpenses = filteredExpenses.filter((exp) => {
        return exp.userId === +userId;
      });
    }

    if (categories) {
      filteredExpenses = filteredExpenses.filter((exp) => {
        return exp.category === categories;
      });
    }

    if (req.query.from && req.query.to) {
      const fromDate = new Date(req.query.from);
      const toDate = new Date(req.query.to);

      filteredExpenses = filteredExpenses.filter((expense) => {
        const expenseDate = new Date(expense.spentAt);

        return expenseDate >= fromDate && expenseDate <= toDate;
      });
    }

    res.status(200).json(filteredExpenses);
  });

  app.post('/expenses', (req, res) => {
    const body = req.body;

    if (
      body.spentAt === undefined ||
      body.title === undefined ||
      body.amount === undefined ||
      body.category === undefined ||
      body.note === undefined ||
      body.userId === undefined
    ) {
      res.sendStatus(400);

      return;
    }

    const user = expensesService.findUser(body.userId, users);
    const newExpense = expensesService.createExpense(body, expenses);

    if (!newExpense || user === undefined) {
      res.status(400).json('Not found');

      return;
    }

    res.status(201).json(newExpense);
  });

  app.get('/expenses/:id', (req, res) => {
    const id = req.params.id;

    if (!id) {
      res.status(400).json('Bad request');

      return;
    }

    const expense = expensesService.getExpenseById(id, expenses);

    if (!expense) {
      res.status(404).json('Not found');

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
      res.sendStatus(404);

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

    const updateExpenseIndex = expenses.findIndex((el) => el.id === +id);
    const patchingExpense = expenses[updateExpenseIndex];

    if (patchingExpense === undefined) {
      res.status(404).json('Not found');

      return;
    }

    const updatedExpense = expensesService.updateExpenseById(
      id,
      body,
      patchingExpense,
    );

    res.status(200).json(updatedExpense);
  });

  return app;
}

module.exports = {
  createServer,
};
