'use strict';

const express = require('express');

let users = [];
let expenses = [];

function createServer() {
  const app = express();

  users.length = 0;
  expenses.length = 0;

  app.get('/users', (req, res) => {
    res.send(users);
  });

  app.get('/users/:userId', (req, res) => {
    const { userId } = req.params;

    const foundUser = users.find(user => user.id === Number(userId)) || null;

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    res.statusCode = 200;
    res.send(foundUser);
  });

  app.post('/users', express.json(), (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    const maxId = Math.max(...users.map(user => user.id));

    const newUser = {
      id: maxId > 0 ? maxId + 1 : 1,
      name,
    };

    users.push(newUser);

    res.statusCode = 201;
    res.send(newUser);
  });

  app.delete('/users/:usersId', (req, res) => {
    const { usersId } = req.params;

    const foundUser = users.find(user => user.id === Number(usersId));

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    const filteredUsers = users.filter(user => user.id !== Number(usersId));

    users = filteredUsers;

    res.sendStatus(204);
  });

  app.patch('/users/:userId', express.json(), (req, res) => {
    const { userId } = req.params;
    const { name } = req.body;

    const foundUser = users.find(user => user.id === Number(userId));

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    const updatedUser = Object.assign(foundUser, { name });

    res.send(updatedUser);
  });

  app.get('/expenses', (req, res) => {
    const { userId, category, from, to } = req.query;

    if (userId) {
      expenses = [expenses.find(expense => expense.userId === Number(userId))];
    }

    if (from && to) {
      expenses = expenses.filter(
        expense => expense.spentAt >= from && expense.spentAt <= to,
      );
    }

    if (category) {
      expenses = expenses.filter(expense => expense.category === category);
    }

    res.send(expenses);
  });

  app.get('/expenses/:expenseId', (req, res) => {
    const { expenseId } = req.params;

    const foundExpense = expenses.find(
      expense => expense.id === Number(expenseId),
    );

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    res.send(foundExpense);
  });

  app.post('/expenses', express.json(), (req, res) => {
    const {
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    } = req.body;

    const foundUser = users.find(user => user.id === Number(userId));

    if (!foundUser) {
      res.sendStatus(400);

      return;
    }

    const maxId = Math.max(...expenses.map(expense => expense.id));
    const newExpense = {
      id: maxId > 0 ? maxId + 1 : 1,
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
    const { expenseId } = req.params;

    const foundExpense = expenses.find(
      expense => expense.id === Number(expenseId),
    );

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    expenses = expenses.filter(expense => expense.id !== Number(expenseId));

    res.sendStatus(204);
  });

  app.patch('/expenses/:expenseId', express.json(), (req, res) => {
    const { expenseId } = req.params;
    const { title } = req.body;

    const foundExpense = expenses.find(
      expense => expense.id === Number(expenseId),
    );

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    const updatedExpence = Object.assign(foundExpense, { title });

    res.send(updatedExpence);
  });

  return app;
}

module.exports = {
  createServer,
};
