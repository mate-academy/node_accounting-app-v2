'use strict';
import * as expensesService from './services/Expenses';
import * as usersService from './services/User';

const express = require('express');

function createServer() {
  const app = express();

  const expenses = [];
  const users = [];

  app.use(express.json());

  app.get('/users', (req, res) => {
    res.statusCode = 200;
    res.send(users);
  });

  app.get('/users/:id', (req, res) => {
    const { id } = req.params;

    const findUser = usersService.getID(users, id);

    if (!id) {
      res.sendStatus(400);

      return;
    }

    if (!findUser) {
      res.sendStatus(404);

      return;
    }

    res.send(findUser);
  });

  app.post('/users', (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    const newUser = usersService.create(users, name);

    res.statusCode = 201;
    res.send(newUser);
  });

  app.delete('/users/:id', (req, res) => {
    const { id } = req.params;

    const filteredUsers = usersService.getID(users, id);

    if (!filteredUsers) {
      res.sendStatus(404);

      return;
    }

    usersService.remove(users, id);
    res.sendStatus(204);
  });

  app.patch('/users/:id', (req, res) => {
    const { id } = req.params;

    const foundUser = usersService.getID(users, id);

    if (!foundUser) {
      res.sendStatus(404);
    }

    const { name } = req.body;

    usersService.update(users, name);

    res.send(foundUser);
  });

  app.get('/expenses', (req, res) => {
    const {
      userId,
      category,
      from,
      to,
    } = req.query;

    if (category) {
      const filteredByCategory = expensesService
        .getByCategory(expenses, category);

      res.send(filteredByCategory);

      return;
    }

    if (from && to) {
      const filterByDate = expensesService.getByDate(expenses, from, to);

      res.send(filterByDate);

      return;
    }

    res.statusCode = 200;

    if (userId) {
      const findUser = expensesService.getByUser(expenses, userId);

      res.send(findUser);
      res.statusCode = 200;

      return;
    }

    res.send(expenses);
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

    const findUser = users.find((user) => user.id === +userId);

    if (!findUser) {
      res.sendStatus(400);

      return;
    }

    const newExpenses = expensesService.create(expenses,
      userId,
      spentAt,
      title,
      amount,
      category,
      note);

    res.statusCode = 201;
    res.send(newExpenses);
  });

  app.get('/expenses/:id', (req, res) => {
    const { id } = req.params;

    const findExpense = expensesService.getID(expenses, id);

    if (!findExpense) {
      res.sendStatus(404);

      return;
    }

    res.send(findExpense);
  });

  app.delete('/expenses/:id', (req, res) => {
    const { id } = req.params;

    const findExpense = expensesService.getID(expenses, id);

    if (!findExpense) {
      res.sendStatus(404);

      return;
    }

    expensesService.remove(expenses, id);
    res.sendStatus(204);
  });

  app.patch('/expenses/:id', (req, res) => {
    const { id } = req.params;
    const findExpense = expensesService.getID(expenses, id);

    if (typeof +id !== 'number') {
      res.sendStatus(400);

      return;
    }

    if (!findExpense) {
      res.sendStatus(404);

      return;
    }

    expensesService.update(findExpense, req.body);

    res.send(findExpense);
  });

  return app;
}

module.exports = {
  createServer,
};
