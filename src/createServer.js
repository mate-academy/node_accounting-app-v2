'use strict';

const express = require('express');

function createServer() {
  const app = express();
  let users = [];
  let expenses = [];

  app.post('/users', express.json(), (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    };

    const newUser = {
      id: Math.floor(Date.now() * Math.random()),
      name,
    };

    users.push(newUser);
    res.statusCode = 201;
    res.send(newUser);
  });

  app.get('/users', express.json(), (req, res) => {
    if (users.length === 0) {
      res.send([]);

      return;
    };

    res.send(users);
  });

  app.get('/users/:id', express.json(), (req, res) => {
    const { id } = req.params;
    const foundUser = users.find(user => user.id === +id);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }
    res.send(foundUser);
  });

  app.patch('/users/:id', express.json(), (req, res) => {
    const { id } = req.params;
    const foundUser = users.find(user => user.id === +id);
    const { name } = req.body;

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    if (typeof name !== 'string') {
      res.sendStatus(422);

      return;
    }

    Object.assign(foundUser, { name });
    res.send(foundUser);
  });

  app.delete('/users/:id', express.json(), (req, res) => {
    const { id } = req.params;
    const filteredUser = users.filter(user => user.id !== +id);

    if (filteredUser.length === users.length) {
      res.sendStatus(404);

      return;
    };

    users = filteredUser;
    res.sendStatus(204);
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

    if (!users.some(user => user.id === userId)) {
      res.sendStatus(400);

      return;
    };

    const newExpenses = {
      id: Math.floor(Date.now() * Math.random()),
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

    if (expenses.length === 0) {
      res.send([]);

      return;
    };

    const userIdExpensed = users.find(user => user.id === id);

    if (userIdExpensed) {
      let userExpenses = expenses.filter(expense => expense.userId === id);

      if (category) {
        userExpenses = userExpenses.filter(
          expense => expense.category === category
        );
      }

      res.send(userExpenses);

      return;
    }

    if (from && to) {
      const expensesBetweenDate = expenses.filter(
        (expense) => expense.spentAt >= from && expense.spentAt <= to);

      res.send(expensesBetweenDate);

      return;
    }

    res.send(expenses);
  });

  app.patch('/expenses/:id', express.json(), (req, res) => {
    const { id } = req.params;
    const expenseId = +id;

    if (typeof expenseId !== 'number') {
      res.sendStatus(400);

      return;
    };

    const foundExpense = expenses.find(expense => expense.id === expenseId);

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
