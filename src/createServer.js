'use strict';

const express = require('express');

function createServer() {
  const app = express();

  let users = [];
  let expenses = [];

  // users

  app.get('/users', (_, response) => {
    response.send(users);
  });

  app.get('/users/:userId', (request, response) => {
    const { userId } = request.params;
    const foundUser = users.find(user => user.id === userId);

    if (!foundUser) {
      response.sendStatus(404);

      return;
    }

    response.sendStatus(200);
    response.send(foundUser);
  });

  app.post('/users', express.json(), (request, response) => {
    const { name } = request.body;

    if (!name) {
      response.sendStatus(400);

      return;
    }

    const maxId = users.length
      ? Math.max(...users.map(user => user.id))
      : 0;

    const newUser = {
      id: maxId + 1,
      name,
    };

    users.push(newUser);

    response.sendStatus(201);
    response.send(newUser);
  });

  app.delete('/users/:userId', (request, response) => {
    const { userId } = request.params;
    const filteredUsers = users.filter(user => user.id !== userId);

    if (filteredUsers.length === users.length) {
      response.sendStatus(404);

      return;
    }

    users = filteredUsers;
    response.sendStatus(204);
  });

  app.patch('/users/:userId', (request, response) => {
    const { userId } = request.params;
    const foundUser = users.find(user => user.id === userId);

    if (!foundUser) {
      response.sendStatus(404);

      return;
    }

    const { name } = request.body;

    if (typeof name !== 'string') {
      response.sendStatus(422);

      return;
    }

    Object.assign(foundUser, { name });

    response.send(foundUser);
  });

  // expenses

  app.get('/expenses', (request, response) => {
    const {
      userId,
      category,
      from,
      to,
    } = request.query;

    if (category) {
      const filteredExpenses = expenses
        .filter(expense => expense.category === category);

      response.send(filteredExpenses);

      return;
    }

    if (from && to) {
      const filteredExpenses = expenses.filter((expense) =>
        expense.spentAt > from && expense.spentAt < to
      );

      response.send(filteredExpenses);

      return;
    }

    if (userId) {
      const filteredExpenses = expenses.filter(expense =>
        expense.userId === userId);

      response.send(filteredExpenses);
      response.statusCode = 200;

      return;
    }

    response.statusCode = 200;
    response.send(expenses);
  });

  app.post('/expenses', express.json(), (request, response) => {
    const {
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    } = request.body;
    const foundUser = users.find(user => user.id === userId);

    if (!foundUser) {
      response.sendStatus(400);

      return;
    }

    if (!spentAt || !title || !amount || !category) {
      response.sendStatus(400);

      return;
    }

    const maxId = expenses.length
      ? Math.max(...expenses.map(expense => expense.id))
      : 0;

    const newExpense = {
      id: maxId + 1,
      userId,
      spentAt,
      title,
      amount,
      category,
      note: note || '',
    };

    expenses.push(newExpense);

    response.sendStatus(201);
    response.send(newExpense);
  });

  app.get('/expenses/:expenseId', (request, response) => {
    const { expenseId } = request.params;
    const foundExpense = expenses.find(expense => expense.id === +expenseId);

    if (!foundExpense) {
      response.sendStatus(404);

      return;
    }

    response.statusCode = 200;
    response.send(foundExpense);
  });

  app.delete('/expenses/:expenseId', (request, response) => {
    const { expenseId } = request.params;
    const filteredExpenses = expenses
      .filter(expense => expense.id !== expenseId);

    if (filteredExpenses.length === users.length) {
      response.sendStatus(404);

      return;
    }

    expenses = filteredExpenses;
    response.sendStatus(204);
  });

  app.patch('/expenses/:expenseId', express.json(), (request, response) => {
    const { expenseId } = request.params;
    const foundExpense = expenses.find((expense) => expense.id === expenseId);

    if (!foundExpense) {
      response.sendStatus(404);

      return;
    }

    if (!request.body) {
      response.sendStatus(400);

      return;
    }

    Object.assign(foundExpense, request.body);

    response.statusCode = 200;
    response.send(foundExpense);
  });

  return app;
};

module.exports = {
  createServer,
};
