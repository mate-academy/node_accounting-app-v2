/* eslint-disable no-console */
'use strict';

const express = require('express');

function getRandomDigits() {
  return +Math.random().toString().slice(2);
}

function validateExpenseCreation(body) {
  const allowedFields = [
    'userId', 'spentAt', 'title', 'amount', 'category', 'note',
  ];
  const receivedFields = Object.keys(body);

  // Check if every field is allowed
  const isValidOperation = receivedFields.every(
    field => allowedFields.includes(field)
  );

  if (!isValidOperation) {
    return false;
  }

  // Check that fields have allowed types
  if (
    isNaN(Date.parse(body.spentAt))
    && typeof body.title !== 'string'
    && typeof body.amount !== 'number'
    && typeof body.category !== 'string'
    && typeof body.note !== 'string'
  ) {
    return false;
  }

  return true;
}

function validateExpenseUpdate(body) {
  const allowedFields = [
    'userId', 'spentAt', 'title', 'amount', 'category', 'note',
  ];
  const receivedFields = Object.keys(body);

  // Check if every field is allowed
  const isValidOperation = receivedFields.every(
    update => allowedFields.includes(update)
  );

  if (!isValidOperation) {
    return false;
  }

  // Check that fields have allowed types if present
  if (
    (body.userId !== undefined && typeof body.userId !== 'number')
    || (body.spentAt !== undefined && isNaN(Date.parse(body.spentAt)))
    || (body.title !== undefined && typeof body.title !== 'string')
    || (body.amount !== undefined && typeof body.amount !== 'number')
    || (body.category !== undefined && typeof body.category !== 'string')
    || (body.note !== undefined && typeof body.note !== 'string')
  ) {
    return false;
  }

  return true;
}

function createServer() {
  let expenses = [];
  let users = [];
  const app = express();

  // expenses endpoints
  app.get('/expenses', (req, res) => {
    const {
      userId,
      categories,
      from,
      to,
    } = req.query;

    const filteredExpenses = expenses.filter(expense => {
      const isUserIdMatch = userId
        ? expense.userId === +userId
        : true;

      const isCategoryMatch = categories
        ? expense.category === categories
        : true;

      const isFromMatch = from
        ? expense.spentAt >= from
        : true;

      const isToMatch = to
        ? expense.spentAt <= to
        : true;

      return isUserIdMatch && isCategoryMatch && isFromMatch && isToMatch;
    });

    res.send(filteredExpenses);
  });

  app.post('/expenses', express.json(), (req, res) => {
    const { userId } = req.body;
    const foundUser = users.find(user => user.id === +userId);

    if (!foundUser) {
      res.sendStatus(400);

      return;
    }

    const isBodyValid = validateExpenseCreation(req.body);

    if (!isBodyValid) {
      res.sendStatus(400);

      return;
    }

    const newExpense = {
      id: getRandomDigits(),
      ...req.body,
    };

    expenses.push(newExpense);

    res.statusCode = 201;
    res.send(newExpense);
  });

  app.get('/expenses/:id', (req, res) => {
    const { id } = req.params;
    const foundExpense = expenses.find(expense => expense.id === +id);

    if (!foundExpense) {
      res.status(404).send('Expense does not exist');

      return;
    }

    res.send(foundExpense);
  });

  app.delete('/expenses/:id', (req, res) => {
    const { id } = req.params;
    const filteredExpenses = expenses.filter(expense => expense.id !== +id);

    if (filteredExpenses.length === expenses.length) {
      res.status(404).send('User does not exist');

      return;
    }

    expenses = filteredExpenses;
    res.sendStatus(204);
  });

  app.patch('/expenses/:id', express.json(), (req, res) => {
    const { id } = req.params;
    const foundExpense = expenses.find(expense => expense.id === +id);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    const isBodyValid = validateExpenseUpdate(req.body);

    if (!isBodyValid) {
      res.sendStatus(400);

      return;
    }

    Object.assign(foundExpense, { ...req.body });

    res.send(foundExpense);
  });

  // users endpoints
  app.get('/users', (req, res) => {
    res.send(users);
  });

  app.post('/users', express.json(), (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    const newUser = {
      id: getRandomDigits(),
      name,
    };

    users.push(newUser);

    res.statusCode = 201;
    res.send(newUser);
  });

  app.get('/users/:id', (req, res) => {
    const { id } = req.params;
    const foundUser = users.find(user => user.id === +id);

    if (!foundUser) {
      res.status(404).send('User does not exist');

      return;
    }

    res.send(foundUser);
  });

  app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    const filteredUsers = users.filter(user => user.id !== +id);

    if (filteredUsers.length === users.length) {
      res.status(404).send('User does not exist');

      return;
    }

    users = filteredUsers;
    res.sendStatus(204);
  });

  app.patch('/users/:id', express.json(), (req, res) => {
    const { name } = req.body;

    if (!name || typeof name !== 'string') {
      res.sendStatus(400);

      return;
    }

    const { id } = req.params;
    const foundUser = users.find(user => user.id === +id);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    Object.assign(foundUser, { name });

    res.send(foundUser);
  });

  return app;
}

module.exports = {
  createServer,
};
