'use strict';

const express = require('express');

function createServer() {
  const app = express();

  let users = [];
  let expenseData = [];

  app.post('/expenses', express.json(), (req, res) => {
    const {
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    } = req.body;

    if (!title) {
      res.sendStatus(400);
    }

    const foundUser = users.find(user => user.id === userId);

    if (!foundUser) {
      res.sendStatus(400);

      return;
    }

    const newExpense = {
      id: Math.floor(Math.random() * 100),
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    };

    expenseData.push(newExpense);

    res.statusCode = 201;
    res.send(newExpense);
  });

  app.get('/expenses', (req, res) => {
    const { userId, category, from, to } = req.query;
    const id = Number(userId);
    const foundUser = users.find(user => user.id === id);

    if (foundUser) {
      let userExpenses = expenseData.filter(expense => expense.userId === id);

      if (category) {
        userExpenses = expenseData
          .filter(expense => expense.category === category);
      }

      res.send(userExpenses);

      return;
    }

    if (from && to) {
      const expensesBetweenDates = expenseData
        .filter(expense => expense.spentAt > from
        && expense.spentAt < to);

      res.send(expensesBetweenDates);

      return;
    }

    res.send(expenseData);
  });

  app.get('/expenses/:expenseId', (req, res) => {
    const expenseId = Number(req.params.expenseId);

    const foundExpense = expenseData
      .find(expense => expense.id === expenseId);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    res.send(foundExpense);
  });

  app.patch('/expenses/:expenseId', express.json(), (req, res) => {
    const expenseId = Number(req.params.expenseId);
    const foundExpense = expenseData
      .find(expense => expense.id === expenseId);
    const { title } = req.body;

    if (!foundExpense) {
      res.sendStatus(404);
    }

    if (foundExpense) {
      foundExpense.title = title;
    }

    res.send(foundExpense);
  });

  app.delete('/expenses/:expenseId', (req, res) => {
    const expenseId = Number(req.params.expenseId);
    const filteredExpenses = expenseData
      .filter(expense => expense.id !== expenseId);

    if (filteredExpenses.length === expenseData.length) {
      res.sendStatus(404);
    }

    expenseData = filteredExpenses;
    res.sendStatus(204);
  });

  app.post('/users', express.json(), (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);
    }

    const newUser = {
      id: Math.floor(Math.random() * 100),
      name,
    };

    users.push(newUser);

    res.statusCode = 201;
    res.send(newUser);
  });

  app.get('/users', (req, res) => {
    res.statusCode = 200;
    res.send(users);
  });

  app.get('/users/:userId', (req, res) => {
    const userId = Number(req.params.userId);

    const foundUser = users.find(user => user.id === userId);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    res.statusCode = 200;
    res.send(foundUser);
  });

  app.patch('/users/:userId', express.json(), (req, res) => {
    const userId = Number(req.params.userId);
    const foundUser = users.find(user => user.id === userId);
    const { name } = req.body;

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    if (foundUser) {
      foundUser.name = name;
    }

    res.statusCode = 200;
    res.send(foundUser);
  });

  app.delete('/users/:userId', (req, res) => {
    const userId = Number(req.params.userId);

    const filteredUsers = users.filter(user => user.id !== userId);

    if (filteredUsers.length === users.length) {
      res.sendStatus(404);
    }

    users = filteredUsers;
    res.sendStatus(204);
  });

  return app;
}

module.exports = {
  createServer,
};
