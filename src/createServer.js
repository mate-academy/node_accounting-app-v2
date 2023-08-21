/* eslint-disable max-len */
'use strict';

const express = require('express');

function createServer() {
  const app = express();
  let users = [];
  let expenses = [];

  app.use(express.json());

  app.get('/users', (req, res) => {
    res.send(users);
  });

  app.get('/users/:id', (req, res) => {
    const { id } = req.params;
    const foundUser = users.find(user => user.id === parseInt(id));

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    res.send(foundUser);
  });

  app.post('/users', express.json(), (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    const newUser = {
      id: users.length + 1,
      name,
    };

    users.push(newUser);

    res.statusCode = 201;
    res.send(newUser);
  });

  app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    const filteredUsers = users.filter(user => user.id !== parseInt(id));

    if (filteredUsers.length === users.length) {
      res.sendStatus(404);
    }

    users = filteredUsers;

    res.sendStatus(204);
  });

  app.patch('/users/:id', express.json(), (req, res) => {
    const { id } = req.params;
    const foundUser = users.find(user => user.id === parseInt(id));

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    const { name } = req.body;

    if (typeof name !== 'string') {
      res.sendStatus(400);

      return;
    }

    Object.assign(foundUser, { name });

    res.send(foundUser);
  });

  app.get('/expenses', (req, res) => {
    const { userId } = req.query;
    const { from, to } = req.query;
    const { categories } = req.query;
    let filteredExpenses = [...expenses];

    if (userId) {
      filteredExpenses = filteredExpenses.filter(expense => expense.userId === parseInt(userId));
    }

    if (from && to) {
      const fromDate = new Date(from);
      const toDate = new Date(to);

      if (isNaN(fromDate) || isNaN(toDate)) {
        res.sendStatus(400);

        return;
      }

      filteredExpenses = filteredExpenses.filter(expense => {
        const expenseDate = new Date(expense.spentAt);

        return expenseDate >= fromDate && expenseDate <= toDate;
      });
    }

    if (categories) {
      filteredExpenses = filteredExpenses.filter(expense => expense.category === categories);
    }

    res.send(filteredExpenses);
  });

  app.get('/expenses/:id', (req, res) => {
    const { id } = req.params;
    const foundExpense = expenses.find(expense => expense.id === parseInt(id));

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    res.send(foundExpense);
  });

  app.post('/expenses', express.json(), (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (!userId || !spentAt || !title || !amount || !category || !note) {
      res.sendStatus(400);

      return;
    }

    const userExists = users.some(user => user.id === userId);

    if (!userExists) {
      res.sendStatus(400);

      return;
    }

    const newExpense = {
      id: expenses.length + 1,
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

  app.delete('/expenses/:id', (req, res) => {
    const { id } = req.params;
    const filteredExpenses = expenses.filter(expense => expense.id !== parseInt(id));

    if (filteredExpenses.length === expenses.length) {
      res.sendStatus(404);

      return;
    }

    expenses = filteredExpenses;

    res.sendStatus(204);
  });

  app.patch('/expenses/:id', express.json(), (req, res) => {
    const { id } = req.params;
    const foundExpense = expenses.find(expense => expense.id === parseInt(id));

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    const { body } = req;

    Object.assign(foundExpense, body);

    res.send(foundExpense);
  });

  return app;
}

module.exports = {
  createServer,
};
