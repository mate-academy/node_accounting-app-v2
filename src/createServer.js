'use strict';

const express = require('express');

function createServer() {
  const app = express();

  app.use(express.json());

  let users = [];
  let expenses = [];

  app.get('/users', (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    res.statusCode = 200;
    res.send(users);
  });

  app.get('/users/:id', (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const { id } = req.params;

    const user = users.find((u) => u.id === Number(id));

    if (user) {
      res.statusCode = 200;
      res.send(user);
    } else {
      res.statusCode = 404;
      res.send({ error: 'User not found!' });
    }
  });

  app.post('/users', (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const { name } = req.body;

    if (!name) {
      res.statusCode = 400;
      res.send({ error: 'Bad request!' });

      return;
    }

    const user = {
      id: users.length + 1,
      name,
    };

    users.push(user);

    res.statusCode = 201;
    res.send(user);
  });

  app.delete('/users/:id', (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const { id } = req.params;

    const user = users.find((u) => u.id === Number(id));

    if (!user) {
      res.statusCode = 404;
      res.send({ error: 'User not found!' });

      return;
    }

    users = users.filter((u) => u.id !== Number(id));

    res.statusCode = 204;
    res.end();
  });

  app.patch('/users/:id', (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const { id } = req.params;
    const { name } = req.body;

    const user = users.find((u) => u.id === Number(id));

    if (!user) {
      res.statusCode = 404;
      res.send({ error: 'User not found!' });

      return;
    }

    if (name) {
      user.name = name;
    }

    res.statusCode = 200;
    res.send(user);
  });

  app.get('/expenses', (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const { userId, from, to, categories } = req.query;

    let filteredExpenses = [...expenses];

    if (userId) {
      filteredExpenses = filteredExpenses.filter(
        (e) => e.userId === Number(userId),
      );
    }

    if (from) {
      filteredExpenses = filteredExpenses.filter(
        (e) => new Date(e.spentAt) >= new Date(from),
      );
    }

    if (to) {
      filteredExpenses = filteredExpenses.filter(
        (e) => new Date(e.spentAt) <= new Date(to),
      );
    }

    if (categories) {
      const categoryList = categories.split(',');

      filteredExpenses = filteredExpenses.filter((e) => {
        return categoryList.includes(e.category);
      });
    }

    res.statusCode = 200;
    res.send(filteredExpenses);
  });

  app.get('/expenses/:id', (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const { id } = req.params;

    const expense = expenses.find((e) => e.id === Number(id));

    if (!expense) {
      res.statusCode = 404;
      res.send({ error: 'Expense not found!' });

      return;
    }

    res.statusCode = 200;
    res.send(expense);
  });

  app.post('/expenses', (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const { userId, title, amount, category, note, spentAt } = req.body;

    if (!userId || !title || !amount || !category || !note) {
      res.statusCode = 400;
      res.send({ error: 'Bad request!' });

      return;
    }

    const user = users.find((u) => u.id === Number(userId));

    if (!user) {
      res.statusCode = 400;
      res.send({ error: 'User not found!' });

      return;
    }

    const expense = {
      id: expenses.length + 1,
      userId,
      spentAt: spentAt || new Date().toISOString(),
      title,
      amount,
      category,
      note,
    };

    expenses.push(expense);

    res.statusCode = 201;
    res.send(expense);
  });

  app.delete('/expenses/:id', (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const { id } = req.params;

    const expense = expenses.find((e) => e.id === Number(id));

    if (!expense) {
      res.statusCode = 404;
      res.send({ error: 'Expense not found!' });

      return;
    }

    expenses = expenses.filter((e) => e.id !== Number(id));

    res.statusCode = 204;
    res.end();
  });

  app.patch('/expenses/:id', (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const { id } = req.params;
    const { title, amount, category, note, spentAt } = req.body;

    const expense = expenses.find((e) => e.id === Number(id));

    if (!expense) {
      res.statusCode = 404;
      res.send({ error: 'Expense not found!' });

      return;
    }

    if (title !== undefined) {
      expense.title = title;
    }

    if (amount !== undefined) {
      expense.amount = amount;
    }

    if (category !== undefined) {
      expense.category = category;
    }

    if (note !== undefined) {
      expense.note = note;
    }

    if (spentAt !== undefined) {
      expense.spentAt = spentAt;
    }

    res.statusCode = 200;
    res.send(expense);
  });

  return app;
}

module.exports = {
  createServer,
};
