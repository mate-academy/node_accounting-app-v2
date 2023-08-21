'use strict';

const express = require('express');

function createServer() {
  const helpers = require('./services/helpers.js');
  const userServices = require('./services/users.js');
  const expensesServices = require('./services/expenses.js');

  let users = [];
  let expenses = [];

  const app = express();

  const getAllExpenses = (req, res) => {
    const selectedUserId = +req.query.userId;
    const { categories, from, to } = req.query;

    const filteredExpenses = expensesServices.getFilteredExpenses(expenses, {
      selectedUserId,
      categories,
      from,
      to,
    });

    res.status(200).send(filteredExpenses);
  };

  const getExpenseById = (req, res) => {
    const expenseId = +req.params.expenseId;

    if (isNaN(expenseId)) {
      res.sendStatus(400);

      return;
    }

    const expenseById = helpers.getElementById(expenses, expenseId);

    if (!expenseById) {
      res.sendStatus(404);

      return;
    }

    res.status(200).send(expenseById);
  };

  const createExpense = (req, res) => {
    const {
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    } = req.body;

    const expenseData = {
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    };

    if (expensesServices.isDataValid({
      users,
      ...expenseData,
    })) {
      res.sendStatus(400);

      return;
    }

    const newExpense = {
      id: helpers.getNewId(expenses),
      ...expenseData,
    };

    expenses.push(newExpense);

    res.status(201).send(newExpense);
  };

  const updateExpense = (req, res) => {
    const expenseId = +req.params.expenseId;

    const expenseToUpdate = helpers.getElementById(expenses, expenseId);

    if (!expenseToUpdate) {
      res.sendStatus(404);

      return;
    }

    const {
      spentAt,
      title,
      amount,
      category,
      note,
    } = req.body;

    Object.assign(expenseToUpdate, {
      spentAt: spentAt || expenseToUpdate.spentAt,
      title: title || expenseToUpdate.title,
      amount: amount || expenseToUpdate.amount,
      category: category || expenseToUpdate.category,
      note: note || expenseToUpdate.note,
    });

    res.status(200).send(expenseToUpdate);
  };

  const deleteExpense = (req, res) => {
    const expenseId = +req.params.expenseId;

    const isExists = helpers.isElementExists(expenses, expenseId);

    if (!isExists) {
      res.sendStatus(404);

      return;
    }

    expenses = helpers.deleteElementById(expenses, expenseId);

    res.sendStatus(204);
  };

  const getAllUsers = (req, res) => {
    res.status(200).send(users);
  };

  const getUserById = (req, res) => {
    const userId = +req.params.userId;

    if (isNaN(userId)) {
      res.sendStatus(400);

      return;
    }

    const userById = helpers.getElementById(users, userId);

    if (!userById) {
      res.sendStatus(404);

      return;
    }

    res.status(200).send(userById);
  };

  const createUser = (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    const newUser = userServices.addUser(users, name);

    res.status(201).send(newUser);
  };

  const deleteUser = (req, res) => {
    const userId = +req.params.userId;

    if (!helpers.isElementExists(users, userId)) {
      res.sendStatus(404);

      return;
    }

    users = helpers.deleteElementById(users, userId);

    res.sendStatus(204);
  };

  const updateUser = (req, res) => {
    const userId = +req.params.userId;

    if (!helpers.isElementExists(users, userId)) {
      res.sendStatus(404);

      return;
    }

    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    const updatedUser = userServices.updateUserById(users, userId, name);

    res.status(200).send(updatedUser);
  };

  app.get('/expenses', getAllExpenses);

  app.get('/expenses/:expenseId', getExpenseById);

  app.post('/expenses', express.json(), createExpense);

  app.patch('/expenses/:expenseId', express.json(), updateExpense);

  app.delete('/expenses/:expenseId', deleteExpense);

  app.get('/users', getAllUsers);

  app.get('/users/:userId', getUserById);

  app.post('/users', express.json(), createUser);

  app.delete('/users/:userId', deleteUser);

  app.patch('/users/:userId', express.json(), updateUser);

  return app;
}

module.exports = {
  createServer,
};
