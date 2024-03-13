/* eslint-disable no-param-reassign */
'use strict';

const express = require('express');
const app = express();

let users = [];
let expenses = [];

function createServer() {
  users = [];
  expenses = [];

  app.get('/users', (req, res) => {
    if (users.length === 0) {
      res.status(200);
      res.send([]);
    } else {
      res.send(users.map(user => user));
    }
  });

  app.get('/users/:id', express.json(), (req, res) => {
    const { id } = req.params || undefined;

    const user = users.find(u => u.id === +id);

    if (user === undefined || +id > users.length) {
      res.status(404).send(`User with id:${id} does not exist`);
    } else {
      res.send(user);
    }
  });

  app.post('/users', express.json(), (req, res) => {
    const { name } = req.body || undefined;

    if (typeof name !== 'string') {
      res.status(400);
      res.send('Invalid user data');

      return;
    }

    const user = {
      id: users.length > 0
        ? +(users[users.length - 1].id) + 1 : users.length + 1,
      name,
    };

    users.push(user);
    res.status(201);
    res.send(user);
  });

  app.delete('/users/:id', express.json(), (req, res) => {
    const { id } = req.params || undefined;

    if (users.some(user => user.id === +id)) {
      users = users.filter(u => u.id !== +id);
      res.status(204).send();
    } else {
      res.status(404).send(`User with id:${id} does not exist`);
    }
  });

  app.patch('/users/:id', express.json(), (req, res) => {
    const { id } = req.params || undefined;
    const { name } = req.body || undefined;

    if (typeof name !== 'string') {
      res.status(404);
      res.send('Invalid user data');

      return;
    }

    users = users.map(user => {
      if (user.id === +id) {
        user.name = name;

        return user;
      }

      return user;
    });

    const changedUser = users.find(u => u.id === +id);

    res.send(changedUser);
  });

  app.get('/expenses', express.json(), (req, res) => {
    const { userId, from, to, categories } = req.query;

    let filteredExpenses = [...expenses];

    if (userId) {
      filteredExpenses = expenses.filter(e => e.userId === +userId);
    }

    if (from && to) {
      filteredExpenses = expenses.filter(expense => {
        const expenseDate = new Date(expense.spentAt);
        const fromDate = new Date(from);
        const toDate = new Date(to);

        return expenseDate >= fromDate && expenseDate <= toDate;
      });
    }

    if (categories) {
      filteredExpenses = expenses.filter(expense =>
        expense.category === categories);
    }

    res.send(filteredExpenses);
  });

  app.get('/expenses/:id', express.json(), (req, res) => {
    const { id } = req.params || undefined;
    const userExpens = expenses.find(e => e.id === +id);

    if (userExpens === undefined || +id > expenses.length) {
      res.status(404).send(`Expens with id:${id} not found`);
    } else {
      res.send(userExpens);
    }
  });

  app.post('/expenses', express.json(), (req, res) => {
    const { userId } = req.body;
    const { spentAt } = req.body;
    const { title } = req.body;
    const { amount } = req.body;
    const { category } = req.body;
    const { note } = req.body;

    if (typeof title !== 'string') {
      res.status(400);
      res.send('Invalid user data');

      return;
    }

    if (!(users.some(u => u.id === +userId))) {
      res.status(400);
      res.send('User not exist');

      return;
    }

    const expens = {
      id: expenses.length > 0
        ? +(expenses[expenses.length - 1].id) + 1 : expenses.length + 1,
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    };

    expenses.push(expens);
    res.status(201);
    res.send(expens);
  });

  app.delete('/expenses/:id', express.json(), (req, res) => {
    const { id } = req.params || undefined;

    if (expenses.some(expens => expens.id === +id)) {
      expenses = expenses.filter(e => e.id !== +id);
      res.status(204).send();
    } else {
      res.status(404).send(`Expense with id:${id} does not exist`);
    }
  });

  app.patch('/expenses/:id', express.json(), (req, res) => {
    const { id } = req.params || undefined;
    const updateExpense = req.body || undefined;

    if (!(expenses.some(e => e.id === +id))) {
      res.status(404);
      res.send('Expense not found');

      return;
    }

    expenses = expenses.map(expens => {
      if (expens.id === +id) {
        expens = {
          ...expens, ...updateExpense,
        };

        return expens;
      }

      return expens;
    });

    const changedExpens = expenses.find(e => e.id === +id);

    res.status(200);
    res.send(changedExpens);
  });

  return app;
}

module.exports = {
  createServer,
};
