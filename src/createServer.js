'use strict';

const express = require('express');

const {
  getUsers,
  createUser,
  getOneUser,
  deleteUser,
  updateUser,
  resetUsers,
} = require('./usersServices');
const {
  getExpenses,
  createExpense,
  getExpense,
  deleteExpense,
  updateExpense,
  resetExpenses,
} = require('./expensesServices');

function createServer() {
  resetUsers();
  resetExpenses();

  const app = express();

  app.use(express.json());

  // USERS
  app.get('/users', (request, response) => {
    const users = getUsers();

    response.send(users);
  });

  app.post('/users', (request, response) => {
    try {
      const { name } = request.body;
      const newUser = createUser(name);

      response.statusCode = 201;
      response.send(newUser);
    } catch (err) {
      response.sendStatus(400);
    }
  });

  app.get('/users/:id', (request, response) => {
    try {
      const { id } = request.params;
      const user = getOneUser(id);

      response.send(user);
    } catch (err) {
      response.sendStatus(404);
    }
  });

  app.delete('/users/:id', (request, response) => {
    try {
      const { id } = request.params;

      deleteUser(id);
      response.sendStatus(204);
    } catch (err) {
      response.sendStatus(404);
    }
  });

  app.patch('/users/:id', (request, response) => {
    try {
      const { id } = request.params;
      const { name } = request.body;

      const updatedUser = updateUser(id, name);

      response.send(updatedUser);
    } catch (err) {
      if (err.message === 'User does not exist.') {
        response.sendStatus(404);
      }

      if (err.message === 'Name was not provided.') {
        response.sendStatus(422);
      }
    }
  });

  // EXPENSES
  app.get('/expenses', (request, response) => {
    const { userId, categories, from, to } = request.query;
    const expenses = getExpenses(userId, categories, from, to);

    response.json(expenses);
  });

  app.post('/expenses', (request, response) => {
    try {
      const { userId, spentAt, title, amount, category, note } = request.body;

      const newExpense = createExpense(
        userId,
        spentAt,
        title,
        amount,
        category,
        note
      );

      response.statusCode = 201;
      response.send(newExpense);
    } catch (err) {
      response.sendStatus(400);
    }
  });

  app.get('/expenses/:id', (request, response) => {
    try {
      const { id } = request.params;
      const expense = getExpense(id);

      response.send(expense);
    } catch (err) {
      response.sendStatus(404);
    }
  });

  app.delete('/expenses/:id', (request, response) => {
    try {
      const { id } = request.params;

      deleteExpense(id);

      response.sendStatus(204);
    } catch (err) {
      response.sendStatus(404);
    }
  });

  app.patch('/expenses/:id', (request, response) => {
    try {
      const { id } = request.params;
      const { spentAt, title, amount, category, note } = request.body;

      const updatedExpense = updateExpense(
        id,
        spentAt,
        title,
        amount,
        category,
        note
      );

      response.send(updatedExpense);
    } catch (err) {
      if (err.message === 'Expense not found.') {
        response.sendStatus(404);
      }

      if (err.message === 'Incomplete data provided.') {
        response.sendStatus(404);
      }
    }
  });

  return app;
}

module.exports = {
  createServer,
};
