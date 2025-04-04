'use strict';

const express = require('express');

function createServer() {
  const app = express();

  app.use(express.json());

  let users = [];
  let expenses = [];

  // USERS
  app.get('/users', async (req, res) => {
    res.send(users);
  });

  app.get('/users/:id', async (req, res) => {
    const { id } = req.params;
    const user = users.find((u) => u.id === +id);

    if (!user) {
      return res.sendStatus(404);
    }

    res.send(user);
  });

  app.post('/users', async (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.sendStatus(400);
    }

    const id = Math.max(...users.map((u) => u.id), 0) + 1;
    const user = { id, name };

    users.push(user);

    res.status(201).send(user);
  });

  app.delete('/users/:id', async (req, res) => {
    const { id } = req.params;
    const targetUser = users.find((u) => u.id === +id);

    if (!targetUser) {
      return res.sendStatus(404);
    }

    users = users.filter((u) => u.id !== +id);
    res.sendStatus(204);
  });

  app.patch('/users/:id', async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    const targetUser = users.find((u) => u.id === +id);

    if (!targetUser) {
      return res.sendStatus(404);
    }

    if (typeof name !== 'string') {
      return res.sendStatus(422);
    }

    targetUser.name = name;
    res.send(targetUser);
  });

  // EXPENSES
  app.get('/expenses', async (req, res) => {
    const { userId, from, to, categories: category } = req.query;

    let filteredExpenses = [...expenses];

    if (userId) {
      filteredExpenses = filteredExpenses.filter(
        (expense) => expense.userId === +userId,
      );
    }

    if (from && to) {
      const fromDate = Date.parse(from);
      const toDate = Date.parse(to);

      filteredExpenses = filteredExpenses.filter((expense) => {
        const expenseDate = Date.parse(expense.spentAt);

        return expenseDate >= fromDate && expenseDate <= toDate;
      });
    }

    if (category) {
      filteredExpenses = filteredExpenses.filter(
        (expense) => expense.category === category,
      );
    }

    res.send(filteredExpenses);
  });

  app.post('/expenses', async (req, res) => {
    let { userId, amount } = req.body;
    const { spentAt, title, category, note } = req.body;

    userId = Number(userId);
    amount = Number(amount);

    if (
      !Number.isInteger(userId) ||
      typeof spentAt !== 'string' ||
      typeof title !== 'string' ||
      typeof amount !== 'number' ||
      isNaN(amount) ||
      typeof category !== 'string'
    ) {
      return res.sendStatus(400);
    }

    const userExists = users.some((u) => u.id === userId);

    if (!userExists) {
      return res.sendStatus(400);
    }

    const id = Math.max(...expenses.map((e) => e.id), 0) + 1;
    const newExpense = {
      id,
      userId,
      spentAt,
      title,
      amount,
      category,
    };

    if (typeof note === 'string') {
      newExpense.note = note;
    }

    expenses.push(newExpense);
    res.status(201).send(newExpense);
  });

  app.get('/expenses/:id', async (req, res) => {
    const { id } = req.params;
    const expense = expenses.find((e) => e.id === +id);

    if (!expense) {
      return res.sendStatus(404);
    }

    res.send(expense);
  });

  app.delete('/expenses/:id', async (req, res) => {
    const { id } = req.params;
    const exists = expenses.some((e) => e.id === +id);

    if (!exists) {
      return res.sendStatus(404);
    }

    expenses = expenses.filter((e) => e.id !== +id);
    res.sendStatus(204);
  });

  app.patch('/expenses/:id', async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    const expense = expenses.find((e) => e.id === +id);

    if (!expense) {
      return res.sendStatus(404);
    }

    Object.assign(expense, updates);
    res.status(200).send(expense);
  });

  return app;
}

module.exports = {
  createServer,
};
