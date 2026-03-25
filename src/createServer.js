'use strict';

const express = require('express');

function createServer() {
  const app = express();

  app.use(express.json());

  const users = [];
  let nextUserId = 1;

  const expenses = [];
  let nextExpenseId = 1;

  app.post('/users', (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.status(400).send('Name is required');
    }

    const newUser = {
      id: nextUserId++,
      name,
    };

    users.push(newUser);
    res.status(201).json(newUser);
  });

  app.get('/users', (req, res) => {
    res.json(users);
  });

  app.get('/users/:id', (req, res) => {
    const userId = Number(req.params.id);
    const user = users.find((u) => u.id === userId);

    if (!user) {
      return res.status(404).send('User not found');
    }

    res.json(user);
  });

  app.delete('/users/:id', (req, res) => {
    const userId = Number(req.params.id);
    const index = users.findIndex((u) => u.id === userId);

    if (index === -1) {
      return res.status(404).send('User not found');
    }

    users.splice(index, 1);

    res.sendStatus(204);
  });

  app.patch('/users/:id', (req, res) => {
    const userId = Number(req.params.id);
    const { name } = req.body;
    const user = users.find((u) => u.id === userId);

    if (!user) {
      return res.status(404).send('User not found');
    }

    if (!name) {
      return res.status(400).send('Name is required');
    }

    user.name = name;
    res.json(user);
  });

  app.post('/expenses', (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (!userId || !spentAt || !title || !amount || !category) {
      return res.status(400).send('Missing required expense fields');
    }

    const userExists = users.some((u) => u.id === userId);

    if (!userExists) {
      return res.status(400).send('User with the given userId does not exist');
    }

    const newExpenses = {
      id: nextExpenseId++,
      userId,
      spentAt,
      title,
      amount,
      category,
      note: note || '',
    };

    expenses.push(newExpenses);
    res.status(201).json(newExpenses);
  });

  app.get('/expenses', (req, res) => {
    let result = [...expenses];

    if (req.query.userId) {
      const uId = Number(req.query.userId);

      result = result.filter((e) => e.userId === uId);
    }

    if (req.query.categories) {
      const cats = req.query.categories.split(',');

      result = result.filter((e) => cats.includes(e.category));
    }

    if (req.query.from) {
      result = result.filter((e) => e.spentAt >= req.query.from);
    }

    if (req.query.to) {
      result = result.filter((e) => e.spentAt <= req.query.to);
    }

    res.json(result);
  });

  app.get('/expenses/:id', (req, res) => {
    const expenseId = Number(req.params.id);

    const expense = expenses.find((e) => e.id === expenseId);

    if (!expense) {
      return res.status(404).send('Expense not found');
    }

    res.json(expense);
  });

  app.delete('/expenses/:id', (req, res) => {
    const expenseId = Number(req.params.id);
    const index = expenses.findIndex((e) => e.id === expenseId);

    if (index === -1) {
      return res.status(404).send('Expense not found');
    }

    expenses.splice(index, 1);

    res.sendStatus(204);
  });

  app.patch('/expenses/:id', (req, res) => {
    const expenseId = Number(req.params.id);
    const expense = expenses.find((e) => e.id === expenseId);

    if (!expense) {
      return res.status(404).send('Expense not found');
    }

    const { userId, spentAt, title, amount, category, note } = req.body;

    if (userId !== undefined) {
      const userExists = users.some((u) => u.id === userId);

      if (!userExists) {
        return res.status(400).send('User not found');
      }
      expense.userId = userId;
    }

    if (spentAt !== undefined) {
      expense.spentAt = spentAt;
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

    res.json(expense);
  });

  return app;
}

module.exports = {
  createServer,
};
