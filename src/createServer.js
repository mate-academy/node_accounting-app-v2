'use strict';

const express = require('express');
const { createUsersStore } = require('./usersData');
const { createExpensesStore } = require('./expensesData');

function createServer() {
  const app = express();

  app.use(express.json());

  const users = createUsersStore();
  const expenses = createExpensesStore();

  app.get('/users', (req, res) => {
    res.send(users);
  });

  app.post('/users', (req, res) => {
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
    res.status(201).send(newUser);
  });

  app.get('/users/:id', (req, res) => {
    const { id } = req.params;

    if (!Number.isInteger(Number(id))) {
      res.sendStatus(400);

      return;
    }

    const user = users.find((u) => u.id === Number(id));

    if (!user) {
      res.sendStatus(404);

      return;
    }
    res.send(user);
  });

  app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    const userIndex = users.findIndex((u) => u.id === Number(id));

    if (userIndex === -1) {
      res.sendStatus(404);

      return;
    }
    users.splice(userIndex, 1);
    res.sendStatus(204);
  });

  app.patch('/users/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    const user = users.find((u) => u.id === Number(id));

    if (!user) {
      res.sendStatus(404);

      return;
    }
    user.name = name;
    res.send(user);
  });

  app.get('/expenses', (req, res) => {
    const { userId, categories, from, to } = req.query;
    let result = expenses;

    if (userId) {
      result = result.filter((expense) => expense.userId === Number(userId));
    }

    if (categories) {
      const categoryList = Array.isArray(categories)
        ? categories
        : [categories];

      result = result.filter((expense) => {
        return categoryList.includes(expense.category);
      });
    }

    if (from) {
      const fromDate = new Date(from);

      result = result.filter(
        (expense) => new Date(expense.spentAt) >= fromDate,
      );
    }

    if (to) {
      const toDate = new Date(to);

      result = result.filter((expense) => new Date(expense.spentAt) <= toDate);
    }
    res.send(result);
  });

  app.post('/expenses', (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (!userId || !spentAt || !title || !amount || !category) {
      res.sendStatus(400);

      return;
    }

    const user = users.find((u) => u.id === Number(userId));

    if (!user) {
      res.sendStatus(404);

      return;
    }

    const newExpense = {
      id: expenses.length + 1,
      userId: Number(userId),
      spentAt,
      title,
      amount,
      category,
      note,
    };

    expenses.push(newExpense);
    res.status(201).send(newExpense);
  });

  app.get('/expenses/:id', (req, res) => {
    const { id } = req.params;

    if (!Number.isInteger(Number(id))) {
      res.sendStatus(400);

      return;
    }

    const expense = expenses.find((e) => e.id === Number(id));

    if (!expense) {
      res.sendStatus(404);

      return;
    }
    res.send(expense);
  });

  app.delete('/expenses/:id', (req, res) => {
    const { id } = req.params;
    const expenseIndex = expenses.findIndex((e) => e.id === Number(id));

    if (expenseIndex === -1) {
      res.sendStatus(404);

      return;
    }
    expenses.splice(expenseIndex, 1);
    res.sendStatus(204);
  });

  app.patch('/expenses/:id', (req, res) => {
    const { id } = req.params;
    const expense = expenses.find((e) => e.id === Number(id));

    if (!expense) {
      res.sendStatus(404);

      return;
    }
    Object.assign(expense, req.body);
    res.send(expense);
  });

  return app;
}

module.exports = {
  createServer,
};
