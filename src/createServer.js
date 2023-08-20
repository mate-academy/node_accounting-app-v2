'use strict';

const express = require('express');
const cors = require('cors');

function createServer() {
  const app = express();
  let users = [];
  let expenses = [];

  app.use(cors());

  app.get('/users', (req, res) => {
    res.send(users);
  });

  app.get('/users/:id', (req, res) => {
    const { id } = req.params;
    const foundUser = users.find(user => user.id === +id) || null;

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    res.send(foundUser);
  });

  app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    const filteredUsers = users.filter(user => user.id !== +id);

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

    const newId = users.length > 0
      ? Math.max(...users.map(user => user.id)) + 1
      : 1000;

    const newUser = {
      id: newId,
      name: name,
    };

    users.push(newUser);

    res.statusCode = 201;
    res.send(newUser);
  });

  app.patch('/users/:id', express.json(), (req, res) => {
    const { id } = req.params;
    const foundUser = users.find(user => user.id === +id);

    if (!foundUser) {
      res.sendStatus(400);

      return;
    }

    const { name } = req.body;

    if (typeof name !== 'string') {
      res.sendStatus(422);

      return;
    }

    Object.assign(foundUser, { name });
    res.send(foundUser);
  });

  app.get('/expenses', (req, res) => {
    const { userId, from, to, categories } = req.query;

    let filteredExpenses = expenses;

    if (userId) {
      filteredExpenses = filteredExpenses.filter(expense => (
        expense.userId === +userId
      ));
    }

    if (from && to) {
      const fromDate = new Date(from);
      const toDate = new Date(to);

      filteredExpenses = filteredExpenses.filter(expense => {
        const expenseDate = new Date(expense.spentAt);

        return expenseDate >= fromDate && expenseDate <= toDate;
      });
    }

    if (categories) {
      filteredExpenses = filteredExpenses.filter(expense => (
        expense.category === categories
      ));
    }

    res.send(filteredExpenses);
  });

  app.get('/expenses/:id', (req, res) => {
    const { id } = req.params;
    const foundExpenses = expenses.find(expense => (
      expense.id === +id
    ));

    if (!foundExpenses) {
      res.sendStatus(404);

      return;
    }

    res.send(foundExpenses);
  });

  app.delete('/expenses/:id', (req, res) => {
    const { id } = req.params;
    const filteredExpenses = expenses.filter(expense =>
      (expense.id !== +id));

    if (filteredExpenses.length === expenses.length) {
      res.sendStatus(404);

      return;
    }

    expenses = filteredExpenses;

    res.sendStatus(204);
  });

  app.post('/expenses', express.json(), (req, res) => {
    const { userId, title, amount, category, note, spentAt } = req.body;

    if (!title || !amount || !category || !note || !userId || !spentAt) {
      res.sendStatus(400);

      return;
    }

    const userExists = users.some(user => user.id === userId);

    if (!userExists) {
      res.sendStatus(400);

      return;
    }

    const newId = expenses.length > 0
      ? Math.max(...expenses.map(expense => expense.id)) + 1
      : 0;

    const newExpens = {
      id: newId,
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    };

    expenses = [...expenses, newExpens];

    res.statusCode = 201;
    res.send(newExpens);
  });

  app.patch('/expenses/:id', express.json(), (req, res) => {
    const { id } = req.params;
    const foundExpenses = expenses.find(expense => (
      expense.id === +id
    ));

    if (!foundExpenses) {
      res.sendStatus(404);

      return;
    }

    const { title, category, note } = req.body;

    if ((title && typeof title !== 'string')
        || (category && typeof category !== 'string')
        || (note && typeof note !== 'string')) {
      res.sendStatus(400);
    }

    Object.assign(foundExpenses, {
      ...req['body'],
    });

    res.send({ ...foundExpenses });
  });

  return app;
};

module.exports = {
  createServer,
};
