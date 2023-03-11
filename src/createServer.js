'use strict';

const express = require('express');
const cors = require('cors');

function getId(data) {
  const Ids = data.map(d => d.id);
  const newId = Math.max(...Ids, 0) + 1;

  return newId;
}

function createServer() {
  let users = [];
  let expenses = [];
  const app = express();

  app.use(cors());

  app.get('/users', (req, res) => {
    res.send(users);
  });

  app.get('/users/:userId', (req, res) => {
    const { userId } = req.params;

    if (isNaN(+userId)) {
      res.sendStatus(400);

      return;
    }

    const foundUser = users.find(user => user.id === +userId);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    res.send(foundUser);
  });

  app.post('/users', express.json(), (req, res) => {
    const { name } = req.body;

    if (typeof name !== 'string') {
      res.sendStatus(400);

      return;
    }

    const newUser = {
      id: getId(users),
      name,
    };

    users.push(newUser);

    res.status(201);
    res.send(newUser);
  });

  app.delete('/users/:userId', (req, res) => {
    const { userId } = req.params;
    const filteredUsers = users.filter(user => user.id !== +userId);

    if (filteredUsers.length === users.length) {
      res.sendStatus(404);

      return;
    }

    users = filteredUsers;
    res.sendStatus(204);
  });

  app.patch('/users/:userId', express.json(), (req, res) => {
    const { userId } = req.params;
    const foundUser = users.find(user => user.id === +userId);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    const { name } = req.body;

    if (typeof name !== 'string') {
      res.sendStatus(400);

      return;
    }

    if (name !== foundUser.name) {
      Object.assign(foundUser, { name });
    }

    res.send(foundUser);
  });

  app.get('/expenses', (req, res) => {
    const getFilteredExpenses = (filterCriterions) => {
      const { userId, categories, from, to } = filterCriterions;

      let receivedExpenses = expenses;

      if (userId) {
        receivedExpenses = expenses.filter(expense =>
          expense.userId === +userId);
      }

      if (categories) {
        receivedExpenses = expenses.filter(expense =>
          expense.category === categories);
      }

      if (from) {
        receivedExpenses = expenses.filter(expense => expense.spentAt >= from);
      }

      if (to) {
        receivedExpenses = expenses.filter(expense => expense.spentAt <= to);
      }

      return receivedExpenses;
    };

    const hasFilteredExpenses = getFilteredExpenses(req.query);

    res.send(hasFilteredExpenses);
  });

  app.get('/expenses/:expenseId', (req, res) => {
    const { expenseId } = req.params;

    if (isNaN(+expenseId)) {
      res.sendStatus(400);

      return;
    }

    const foundExpense = expenses.find(expense => expense.id === +expenseId);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    res.send(foundExpense);
  });

  app.post('/expenses', express.json(), (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    const foundUser = users.find(user => user.id === +userId);

    if (!foundUser) {
      res.sendStatus(400);

      return;
    }

    const isString = (str) => typeof str === 'string';
    const isNumber = (num) => typeof num === 'number';
    const hasInvalidDataTypes
      = ![spentAt, title, category, note].every(isString)
      || ![userId, amount].every(isNumber);

    if (hasInvalidDataTypes) {
      res.sendStatus(400);

      return;
    }

    const newExpense = {
      id: getId(expenses),
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    };

    expenses.push(newExpense);

    res.status(201);
    res.send(newExpense);
  });

  app.delete('/expenses/:expenseId', (req, res) => {
    const { expenseId } = req.params;
    const filteredExpenses = expenses.filter(expense => expense.id
      !== +expenseId);

    if (filteredExpenses.length === expenses.length) {
      res.sendStatus(404);

      return;
    }

    expenses = filteredExpenses;
    res.sendStatus(204);
  });

  app.patch('/expenses/:expenseId', express.json(), (req, res) => {
    const { expenseId } = req.params;
    const foundExpenses = expenses.find(expense => expense.id === +expenseId);

    if (!foundExpenses) {
      res.sendStatus(404);

      return;
    }

    Object.assign(foundExpenses, { ...req.body });
    res.send(foundExpenses);
  });

  return app;
}

module.exports = {
  createServer,
};
