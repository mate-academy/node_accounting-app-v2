'use strict';

const express = require('express');

function createServer() {
  const app = express();

  app.use(express.json());

  let users = [];
  let expenses = [];
  let nextUserId = 1;
  let nextExpenseId = 1;

  app.post('/users', (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);
    } else {
      const user = {
        id: nextUserId++,
        name,
      };

      users.push(user);

      res.status(201).json(user);
    }
  });

  app.get('/users', (req, res) => {
    res.json(users);
  });

  app.get('/users/:id', (req, res) => {
    const { id } = req.params;
    const user = users.find((u) => u.id === Number(id));

    if (!user) {
      res.sendStatus(404);

      return;
    }

    res.status(200).json(user);
  });

  app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    const deleteUser = users.filter((u) => u.id !== Number(id));

    if (deleteUser.length === users.length) {
      res.status(404).send('User not found');

      return;
    }

    users = deleteUser;
    res.sendStatus(204);
  });

  app.patch('/users/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const user = users.find((u) => u.id === Number(id));

    if (!user) {
      res.sendStatus(404);

      return;
    }

    if (name) {
      user.name = name;
    }

    res.status(200).json(user);
  });

  app.post('/expenses', (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    const checkUser = users.find((u) => u.id === Number(userId));

    if (!checkUser) {
      res.sendStatus(400);

      return;
    }

    if (!userId || !spentAt || !title || !amount || !category) {
      res.sendStatus(400);
    } else {
      const expense = {
        id: nextExpenseId++,
        userId: Number(userId),
        spentAt,
        title,
        amount,
        category,
        note,
      };

      expenses.push(expense);
      res.status(201).json(expense);
    }
  });

  app.get('/expenses', (req, res) => {
    const { userId, from, to, categories } = req.query;
    let result = [...expenses];

    if (from) {
      const fromDate = new Date(from);

      result = result.filter((data) => new Date(data.spentAt) >= fromDate);
    }

    if (to) {
      const toDate = new Date(to);

      result = result.filter((data) => new Date(data.spentAt) <= toDate);
    }

    if (categories) {
      const categoryList = categories.split(',');

      result = result.filter((data) => categoryList.includes(data.category));
    }

    if (userId) {
      result = result.filter((e) => e.userId === Number(userId));
    }
    res.json(result);
  });

  app.get('/expenses/:id', (req, res) => {
    const { id } = req.params;
    const expense = expenses.find((e) => e.id === Number(id));

    if (!expense) {
      res.sendStatus(400);

      return;
    }

    res.json(expense);
  });

  app.delete('/expenses/:id', (req, res) => {
    const { id } = req.params;
    const deleteExpense = expenses.filter((e) => e.id !== Number(id));

    if (deleteExpense.length === expenses.length) {
      res.status(404).send('Expense not found');

      return;
    }

    expenses = deleteExpense;
    res.sendStatus(204);
  });

  app.patch('/expenses/:id', (req, res) => {
    const { id } = req.params;
    const { userId } = req.body;

    const expens = expenses.find((u) => u.id === Number(id));

    if (!expens) {
      res.sendStatus(404);

      return;
    }

    if (userId) {
      const checkUser = users.find((u) => u.id === Number(userId));

      if (!checkUser) {
        res.sendStatus(404);

        return;
      }
    }

    Object.assign(expens, req.body);

    res.status(200).json(expens);
  });

  return app;
}

module.exports = {
  createServer,
};
