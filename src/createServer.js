'use strict';

const express = require('express');
const cors = require('cors');
const {
  validateReqBody,
} = require('../helpers.js');
const { UserService } = require('./services/userService.js');
const { ExpensesService } = require('./services/expensesService.js');
const { UserController } = require('./controllers/userController.js');

function createServer() {
  const userController = new UserController();
  const userService = new UserService();
  const expensesService = new ExpensesService();

  const app = express();

  app.use(express.json(), cors());

  app.get('/users', userController.getUsers);

  app.get('/users/:userId', (req, res) => {
    const { userId } = req.params;
    const foundUser = userService.getUserById(userId);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    res.status(200).send(foundUser);
  });

  app.post('/users', (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.status(400).send('Please, provide a valid user');

      return;
    }

    const newUser = userService.addUser(name);

    res.status(201).send(newUser);
  });

  app.delete('/users/:userId', (req, res) => {
    const { userId } = req.params;

    const foundUser = userService.getUserById(userId);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    userService.deleteUser(userId);
    res.sendStatus(204);
  });

  app.patch('/users/:userId', (req, res) => {
    const { userId } = req.params;
    const { name } = req.body;
    const foundUser = userService.getUserById(userId);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    if (!name) {
      res.sendStatus(400);

      return;
    }

    const updatedUser = userService.updateUser(userId, name);

    res.status(200).send(updatedUser);
  });

  app.get('/expenses', (req, res) => {
    const isMissingQuery = Object.keys(req.query).length === 0;

    if (isMissingQuery) {
      const expenses = expensesService.getExpenses();

      res.status(200).send(expenses);

      return;
    }

    const filteredExpenses = expensesService.filterExpensesByQuery(req.query);

    res.status(200).send(filteredExpenses);
  });

  app.get('/expenses/:expanseId', (req, res) => {
    const { expanseId: expenseId } = req.params;
    const foundExpense = expensesService.getExpenseById(expenseId);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    res.status(200).send(foundExpense);
  });

  app.post('/expenses', (req, res) => {
    const allowedFields = [
      'userId', 'spentAt', 'title', 'amount', 'category', 'note',
    ];
    const validatedRequestBody = validateReqBody(
      req.body, allowedFields
    );

    const { userId, spentAt, title, amount, category } = validatedRequestBody;

    const isUserExist = userService.getUserById(userId);

    if (!isUserExist || !spentAt || !title || !amount || !category) {
      res.sendStatus(400);

      return;
    }

    const newExpense = expensesService.addExpense(validatedRequestBody);

    res.status(201).send(newExpense);
  });

  app.delete('/expenses/:expanseId', (req, res) => {
    const { expanseId } = req.params;
    const foundExpense = expensesService.getExpenseById(expanseId);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    expensesService.deleteExpense(expanseId);
    res.sendStatus(204);
  });

  app.patch('/expenses/:expanseId', (req, res) => {
    const { expanseId } = req.params;
    const allowedFields = ['spentAt', 'title', 'amount', 'category', 'note'];
    const requestBody = validateReqBody(
      req.body, allowedFields
    );
    const { spentAt, title, amount, category, note } = requestBody;

    const foundExpense = expensesService.getExpenseById(expanseId);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    if (!spentAt && !title && !amount && !category && !note) {
      res.sendStatus(400);

      return;
    }

    const newExpense = expensesService
      .updateExpense(expanseId, requestBody);

    res.status(200).send(newExpense);
  });

  return app;
}

createServer().listen(3000);

module.exports = {
  createServer,
};
