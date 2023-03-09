'use strict';

const express = require('express');
const cors = require('cors');

function createServer() {
  const app = express();

  let users = [];

  app.use(cors());

  app.get('/users', (req, res) => {
    res.send(users);
  });

  app.get('/users/:userId', (req, res) => {
    const userId = +req.params.userId;

    if (isNaN(userId)) {
      res.sendStatus(404);

      return;
    }

    const foundUser = users.find(user => user.id === userId);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    res.send(foundUser);
  });

  app.post('/users', express.json(), (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    const id = Math.max(0, ...users.map(user => user.id)) + 1;

    const newUser = {
      id,
      name,
    };

    users.push(newUser);

    res.statusCode = 201;
    res.send(newUser);
  });

  app.delete('/users/:userId', (req, res) => {
    const userId = +req.params.userId;

    const filteredUsers = users.filter(user => user.id !== userId);

    if (users.length === filteredUsers.length) {
      res.sendStatus(404);

      return;
    }

    users = filteredUsers;

    res.sendStatus(204);
  });

  app.patch('/users/:userId', express.json(), (req, res) => {
    const userId = +req.params.userId;

    const foundUser = users.find(user => user.id === userId);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    const { name } = req.body;

    Object.assign(foundUser, { name });

    res.send(foundUser);
  });

  let expenses = [];

  const getFilteredExpenses = (filterParams) => {
    const { userId, category, from, to } = filterParams;
    let filteredExpenses = expenses;

    if (userId) {
      filteredExpenses = expenses.filter(expense => expense.userId === +userId);
    }

    if (category) {
      filteredExpenses = expenses.filter(expense => (
        expense.category === category
      ));
    }

    if (from) {
      filteredExpenses = expenses.filter(expense => (
        expense.spentAt >= from
      ));
    }

    if (to) {
      filteredExpenses = expenses.filter(expense => (
        expense.spentAt <= to
      ));
    }

    return filteredExpenses;
  };

  app.get('/expenses', (req, res) => {
    const filterParams = req.query;
    const preperedExpenses = getFilteredExpenses(filterParams);

    res.send(preperedExpenses);
  });

  app.get('/expenses/:expenseId', (req, res) => {
    const expenseId = +req.params.expenseId;

    if (isNaN(expenseId)) {
      res.sendStatus(404);

      return;
    }

    const foundExpenses = expenses.find(expense => expense.id === expenseId);

    if (!foundExpenses) {
      res.sendStatus(404);

      return;
    }

    res.send(foundExpenses);
  });

  app.post('/expenses', express.json(), (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    const isValidDataType = typeof userId === 'number'
      && typeof spentAt === 'string'
      && typeof title === 'string'
      && typeof amount === 'number'
      && typeof category === 'string'
      && typeof note === 'string';

    const isUserExist = users.some(user => userId === user.id);

    if (!isValidDataType || !isUserExist) {
      res.sendStatus(400);

      return;
    }

    const id = Math.max(0, ...expenses.map(user => user.id)) + 1;

    const newExpense = {
      id,
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    };

    expenses.push(newExpense);

    res.statusCode = 201;
    res.send(newExpense);
  });

  app.delete('/expenses/:expenseId', (req, res) => {
    const expenseId = +req.params.expenseId;

    const filteredExpenses = expenses.filter(
      expense => expense.id !== expenseId
    );

    if (expenses.length === filteredExpenses.length) {
      res.sendStatus(404);

      return;
    }

    expenses = filteredExpenses;

    res.sendStatus(204);
  });

  app.patch('/expenses/:expenseId', express.json(), (req, res) => {
    const expenseId = +req.params.expenseId;

    const foundExpense = expenses.find(expense => expense.id === expenseId);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    Object.assign(foundExpense, { ...req.body });

    res.send(foundExpense);
  });

  return app;
}

module.exports = {
  createServer,
};
