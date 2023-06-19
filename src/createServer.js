'use strict';

const express = require('express');

function createServer() {
  const app = express();

  // In-memory data structures
  const users = [];
  let expenses = [];

  // Middleware for parsing JSON request bodies
  app.use(express.json());

  // Users endpoints
  app.get('/users', (req, res) => {
    res.send(users);
  });

  app.post('/users', (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
      // res.sendStatus(400);
      // return;
    }

    const user = {
      id: users.length + 1,
      name,
    };

    users.push(user);

    res.status(201).send(user);
  });

  app.get('/users/:userId', (req, res) => {
    const { userId } = req.params;

    const requestedUser = users.find((user) => user.id === Number(userId));

    if (!requestedUser) {
      res.sendStatus(404);

      return;
    }

    res.send(requestedUser);
  });

  app.patch('/users/:userId', (req, res) => {
    const { userId } = req.params;

    const requestedUser = users.find((user) => user.id === Number(userId));

    if (!requestedUser) {
      res.sendStatus(404);

      return;
    }

    const { name } = req.body;

    if (!name || typeof name !== 'string') {
      res.sendStatus(400);

      return;
    }

    requestedUser.name = name;

    res.send(requestedUser);
  });

  app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    const index = users.findIndex((user) => user.id === Number(id));

    if (index === -1) {
      res.sendStatus(404);

      return;
    }

    users.splice(index, 1);

    res.sendStatus(204);
  });

  // Expenses endpoints
  app.get('/expenses', (req, res) => {
    const { userId, categories, from, to } = req.query;

    let filteredExpenses = expenses;

    if (userId) {
      filteredExpenses = filteredExpenses.filter(
        (expense) => expense.userId === Number(userId)
      );
    }

    if (categories) {
      const categoryArray = Array.isArray(categories)
        ? categories.forEach((category) => category.toLowerCase())
        : [categories.toLowerCase()];

      filteredExpenses = filteredExpenses.filter((expense) =>
        categoryArray.includes(expense.category.toLowerCase())
      );
    }

    if (from) {
      filteredExpenses = filteredExpenses.filter(
        (expense) => expense.spentAt >= from
      );
    }

    if (to) {
      filteredExpenses = filteredExpenses.filter(
        (expense) => expense.spentAt <= to
      );
    }

    res.json(filteredExpenses);
  });

  app.post('/expenses', (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (!userId || !spentAt || !title || !amount || !category) {
      return res.status(400).send({ error: 'Missing required parameters' });
    }

    const requestedUser = users.find((user) => user.id === Number(userId));

    if (!requestedUser) {
      return res.status(400).send({ error: 'User not found' });
    }

    const expense = {
      id: expenses.length + 1,
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    };

    expenses.push(expense);

    res.status(201).json(expense);
  });

  app.get('/expenses/:expenseId', (req, res) => {
    const { expenseId } = req.params;

    const requestedExpense = expenses.find(
      (expense) => expense.id === Number(expenseId)
    );

    if (!requestedExpense) {
      res.sendStatus(404);

      return;
    }

    res.send(requestedExpense);
  });

  app.delete('/expenses/:expenseId', (req, res) => {
    const { expenseId } = req.params;

    const requestedExpense = expenses.find(
      (expense) => expense.id === Number(expenseId)
    );

    if (!requestedExpense) {
      res.sendStatus(404);

      return;
    }

    expenses = expenses.filter((expense) => expense.id !== Number(expenseId));
    res.sendStatus(204);
  });

  app.patch('/expenses/:expenseId', (req, res) => {
    const { expenseId } = req.params;
    const { spentAt, title, amount, category, note } = req.body;

    const requestedExpense = expenses.find(
      (expense) => expense.id === Number(expenseId)
    );

    if (!requestedExpense) {
      res.sendStatus(404);

      return;
    }

    if (spentAt) {
      requestedExpense.spentAt = spentAt;
    }

    if (title) {
      requestedExpense.title = title;
    }

    if (amount) {
      requestedExpense.amount = amount;
    }

    if (category) {
      requestedExpense.category = category;
    }

    if (note) {
      requestedExpense.note = note;
    }

    res.send(requestedExpense);
  });

  return app;
}

module.exports = {
  createServer,
};
