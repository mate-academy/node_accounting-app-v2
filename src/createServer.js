/* eslint-disable no-console */
'use strict';

const express = require('express');

const usersService = require('./services/users');
const expensesService = require('./services/expenses');

function createServer() {
  usersService.reset();
  expensesService.reset();

  const app = express();

  app.use(express.json());

  let expenses = [];
  // Users

  app.get('/users', (req, res) => {
    const users = usersService.getAllUsers();

    res.send(users);
  });

  app.get('/users/:userId', (req, res) => {
    const { userId } = req.params;
    const foundUser = usersService.getUserById(userId);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }
    res.send(foundUser);
  });

  app.post('/users', (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    const newUser = usersService.createUser(name);

    res.statusCode = 201;
    res.send(newUser);
  });

  app.delete('/users/:userId', (req, res) => {
    const { userId } = req.params;
    const foundUser = usersService.getUserById(userId);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    usersService.removeUser(userId);
    res.sendStatus(204);
  });

  app.patch('/users/:userId', (req, res) => {
    const { userId } = req.params;
    const { name } = req.body;
    const foundUser = usersService.getUserById(userId);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    usersService.updateUser({
      id: userId,
      name,
    });
    res.send(foundUser);
  });

  // Expenses
  app.get('/expenses', (req, res) => {
    expenses = expensesService.filterExpenses(req.query);

    res.send(expenses);
  });

  app.get('/expenses/:expenseId', (req, res) => {
    const { expenseId } = req.params;
    const foundExpense = expensesService.getExpenseById(expenseId);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    res.send(foundExpense);
  });

  app.post('/expenses', (req, res) => {
    const {
      userId,
      title,
    } = req.body;

    const checkOnUser = usersService.getUserById(userId);

    if (!checkOnUser || !title) {
      res.sendStatus(400);

      return;
    }

    const newExpence = expensesService.createExpense(req.body);

    expenses.push(newExpence);

    res.statusCode = 201;
    res.send(newExpence);
  });

  app.delete('/expenses/:expenseId', (req, res) => {
    const { expenseId } = req.params;
    const foundExpense = expensesService.getExpenseById(expenseId);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    expensesService.removeExpense(expenseId);
    res.sendStatus(204);
  });

  app.patch('/expenses/:expenseId', (req, res) => {
    const { expenseId } = req.params;
    const {
      ...data
    } = req.body;
    const foundExpense = expensesService.getExpenseById(expenseId);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    expensesService.updateExpense({
      id: expenseId,
      ...data,
    });

    res.send(foundExpense);
  });

  return app;
}

module.exports = {
  createServer,
};
