/* eslint-disable no-console */
'use strict';

const express = require('express');
const cors = require('cors');

function createServer() {
  // const services = require('./services/users.js');

  const app = express();

  app.use(cors());

  let users = [];
  let expensesData = [];

  app.get('/expenses', (req, res) => {
    const {
      userId,
      category,
      from,
      to,
    } = req.query;

    const id = Number(userId);

    res.statusCode = 200;

    if (!expensesData.length) {
      res.send([]);

      return;
    }

    if (from && to) {
      const userExpenses = expensesData
        .filter(expense => expense.spentAt > from
          && expense.spentAt < to);

      res.send(userExpenses);
    }

    const foundUser = users.find(user => user.id === id);

    if (foundUser) {
      let userExpenses = expensesData
        .filter(expense => expense.userId === id);

      if (category) {
        userExpenses = expensesData
          .filter(expense => expense.category === category);
      }

      res.send(userExpenses);

      return;
    }

    res.send(expensesData);
  });

  app.get('/expenses/:expenseId', (req, res) => {
    const expenseId = Number(req.params.expenseId);

    const foundExpense = expensesData
      .find(expense => expense.id === expenseId);

    if (!foundExpense) {
      res.send(404);

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

    if (!title) {
      res.sendStatus(400);

      return;
    }

    const foundUser = users.find(user => user.id === userId);

    if (!foundUser) {
      res.sendStatus(400);

      return;
    }

    const newExpense = {
      id: Math.floor(Date.now() * Math.random()),
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    };

    expensesData.push(newExpense);

    res.statusCode = 201;

    res.send(newExpense);
  });

  app.patch('/expenses/:expenseId', express.json(), (req, res) => {
    const expenseId = Number(req.params.expenseId);
    const { title } = req.body;

    const foundExpense = expensesData
      .find(expense => expense.id === expenseId);

    if (!foundExpense) {
      res.send(404);

      return;
    }

    Object.assign(foundExpense, { title });

    res.statusCode = 200;

    res.send(foundExpense);
  });

  app.delete('/expenses/:expenseId', (req, res) => {
    const expenseId = Number(req.params.expenseId);

    const filteredExpenses = expensesData
      .filter(expense => expense.id !== expenseId);

    if (filteredExpenses.length === expensesData.length) {
      res.send(404);

      return;
    }

    expensesData = filteredExpenses;

    res.send(204);
  });

  app.get('/users', (req, res) => {
    res.statusCode = 200;
    res.send(users);
  });

  app.post('/users', express.json(), (req, res) => {
    const { name } = req.body;

    console.log(name);

    if (!name) {
      res.send(400);
    }

    const newUser = {
      id: Math.floor(Math.random() * 1000000),
      name,
    };

    users.push(newUser);

    res.statusCode = 201;
    res.send(newUser);
  });

  app.get('/users/:userId', cors(), (req, res) => {
    const userId = Number(req.params.userId);

    const foundUser = users.find(user => user.id === userId);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    res.setHeader('Content-Type', 'application/json');

    res.send(foundUser);
  });

  app.patch('/users/:userId', express.json(), (req, res) => {
    const userId = Number(req.params.userId);
    const { name } = req.body;

    const foundUser = users.find(user => user.id === userId);

    if (!foundUser) {
      res.send(404);

      return;
    }

    Object.assign(foundUser, { name });

    res.send(foundUser);
  });

  app.delete('/users/:userId', (req, res) => {
    const userId = Number(req.params.userId);

    console.log(userId);

    const filteredUsers = users.filter(user => user.id !== userId);

    if (filteredUsers.length === users.length) {
      res.send(404);

      return;
    }

    users = filteredUsers;

    res.send(204);
  });

  return app;
}

module.exports = {
  createServer,
};
