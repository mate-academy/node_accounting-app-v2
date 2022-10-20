'use strict';

const express = require('express');

function createServer() {
  const app = express();

  let expenses = [];
  let users = [];

  app.post('/expenses', express.json(), (req, res) => {
    const {
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    } = req.body;

    if (!title || !users.some(user => user.id === userId)) {
      res.sendStatus(400);

      return;
    }

    const newExpense = {
      userId,
      spentAt,
      title,
      amount,
      category,
      id: Math.floor(Math.random() * 10),
      note,
    };

    expenses.push(newExpense);

    res.statusCode = 201;

    res.send(newExpense);
  });

  app.get('/expenses', express.json(), (req, res) => {
    const {
      userId,
      category,
      from,
      to,
    } = req.query;

    const id = Number(userId);

    if (typeof id !== 'number') {
      res.sendStatus(400);

      return;
    }

    res.statusCode = 200;

    if (!expenses.length) {
      res.send([]);

      return;
    }

    if (from && to) {
      const userExpenses = expenses.filter(
        expense => expense.spentAt > from && expense.spentAt < to
      );

      res.send(userExpenses);

      return;
    }

    if (users.find(user => user.id === id)) {
      let userExpenses = expenses.filter(expense => expense.userId === id);

      if (category) {
        userExpenses = userExpenses.filter(
          expense => expense.category === category
        );
      }

      res.send(userExpenses);

      return;
    }

    res.send(expenses);
  });

  app.get('/expenses/:id', express.json(), (req, res) => {
    const { id } = req.params;

    const expenseId = Number(id);

    if (typeof expenseId !== 'number') {
      res.sendStatus(400);

      return;
    }

    const foundExpense = expenses.find(expense => expense.id === expenseId);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    res.statusCode = 200;

    res.send(foundExpense);
  });

  app.patch('/expenses/:id', express.json(), (req, res) => {
    const { id } = req.params;

    const expenseId = Number(id);

    if (typeof expenseId !== 'number') {
      res.sendStatus(400);

      return;
    }

    const foundExpense = expenses.find(expense => expense.id === expenseId);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    Object.assign(foundExpense, req.body);

    res.statusCode = 200;

    res.send(foundExpense);
  });

  app.delete('/expenses/:id', express.json(), (req, res) => {
    const { id } = req.params;

    const expenseId = Number(id);

    const foundExpense = expenses.find(expense => expense.id === expenseId);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    expenses = expenses.filter(expense => expense.id !== expenseId);
    res.sendStatus(204);
  });

  app.post('/users', express.json(), (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    const newUser = {
      id: Math.floor(Math.random() * 10),
      name,
    };

    users.push(newUser);

    res.statusCode = 201;
    res.send(newUser);
  });

  app.get('/users', express.json(), (req, res) => {
    if (!users) {
      res.statusCode = 200;

      res.send([]);

      return;
    }

    res.statusCode = 200;

    res.send(users);
  });

  app.get('/users/:id', express.json(), (req, res) => {
    const { id } = req.params;

    const userId = Number(id);

    if (typeof userId !== 'number') {
      res.sendStatus(400);

      return;
    }

    const foundUser = users.find(user => user.id === userId);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    res.statusCode = 200;

    res.send(foundUser);
  });

  app.patch('/users/:id', express.json(), (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    const userId = Number(id);

    if (typeof userId !== 'number') {
      res.sendStatus(400);

      return;
    }

    const foundUser = users.find(user => user.id === userId);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    Object.assign(foundUser, { name });

    res.statusCode = 200;

    res.send(foundUser);
  });

  app.delete('/users/:id', express.json(), (req, res) => {
    const { id } = req.params;

    const userId = Number(id);

    const foundUser = users.find(user => user.id === userId);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    users = users.filter(user => user.id !== userId);
    res.sendStatus(204);
  });

  return app;
}

module.exports = {
  createServer,
};
