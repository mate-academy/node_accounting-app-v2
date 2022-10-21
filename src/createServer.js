'use strict';

const express = require('express');
const cors = require('cors');

function createServer() {
  let users = [];
  let expenses = [];

  const app = express();

  app.use(cors());

  app.get('/users', express.json(), (req, res) => {
    res.send(users);

    res.statusCode = 200;
  });

  app.get('/users/:id', express.json(), (req, res) => {
    const { id } = req.params;

    const foundUser = users.find((user) => user.id === +id);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    res.send(foundUser);
    res.sendStatus(200);
  });

  app.delete('/users/:id', express.json(), (req, res) => {
    const { id } = req.params;

    const filteredUsers = users.filter((user) => user.id !== +id);

    if (filteredUsers.length === users.length) {
      res.sendStatus(404);

      return;
    }

    users = filteredUsers;
    res.sendStatus(204);
  });

  app.post('/users', express.json(), (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    const newUser = {
      id: Math.random(),
      name,
    };

    users.push(newUser);

    res.statusCode = 201;
    res.send(newUser);
  });

  app.patch('/users/:id', express.json(), (req, res) => {
    const { id } = req.params;

    const foundUser = users.find((user) => user.id === +id);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    const { name } = req.body;

    Object.assign(foundUser, { name });

    res.send(foundUser);
    res.sendStatus(200);
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

    const foundUser = users.find((user) => user.id === +userId);

    if (!foundUser) {
      res.sendStatus(400);

      return;
    };

    const newExpenses = {
      id: Math.random(),
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    };

    expenses.push(newExpenses);
    res.statusCode = 201;
    res.send(newExpenses);
  });

  app.get('/expenses', express.json(), (req, res) => {
    const {
      userId,
      category,
      from,
      to,
    } = req.query;

    const id = +userId;

    if (typeof id !== 'number') {
      res.sendStatus(400);

      return;
    }

    const foundUser = users.find(user => user.id === id);

    if (foundUser) {
      const expensesFilteredByUser = expenses
        .filter(expense => expense.userId === id);

      if (category) {
        const expensesFilteredByCat = expensesFilteredByUser
          .filter(expense => expense.category === category);

        res.send(expensesFilteredByCat);

        return;
      }

      res.send(expensesFilteredByUser);

      return;
    }

    if (from && to) {
      const expensesFilteredByDate = expenses.filter(
        (expense) => expense.spentAt >= from && expense.spentAt <= to);

      res.send(expensesFilteredByDate);

      return;
    }

    res.send(expenses);
  });

  app.patch('/expenses/:id', express.json(), (req, res) => {
    const { id } = req.params;

    if (typeof +id !== 'number') {
      res.sendStatus(400);

      return;
    };

    const foundExpense = expenses.find(expense => expense.id === +id);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    };

    Object.assign(foundExpense, req.body);
    res.send(foundExpense);
  });

  app.get('/expenses/:id', express.json(), (req, res) => {
    const { id } = req.params;
    const foundExpense = expenses.find(expense => expense.id === +id);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    res.statusCode = 200;
    res.send(foundExpense);
  });

  app.delete('/expenses/:id', express.json(), (req, res) => {
    const { id } = req.params;
    const filteredExpenses = expenses.filter(expens => expens.id !== +id);

    if (filteredExpenses.length === expenses.length) {
      res.sendStatus(404);

      return;
    }

    expenses = filteredExpenses;
    res.sendStatus(204);
  });

  return app;
}

module.exports = {
  createServer,
};
