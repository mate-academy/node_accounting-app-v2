'use strict';

const express = require('express');

function createServer() {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  const inMemoryData = {
    nextUserIndex: 0,
    users: [],
    nextExpenseIndex: 0,
    expenses: [],
  };

  app.get('/users', (req, res) => {
    res.status(200);
    res.json(inMemoryData.users);
  });

  app.post('/users', (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.status(400);
      res.json({ error: 'One or more fields are missing' });

      return;
    }

    inMemoryData.users.push({
      id: inMemoryData.nextUserIndex,
      name: name,
    });
    inMemoryData.nextUserIndex++;
    res.status(201);
    res.json(inMemoryData.users.at(-1));
  });

  app.get('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);

    if (Number.isNaN(id)) {
      res.status(400);
      res.json({ error: 'Invalid ID' });

      return;
    }

    const user = inMemoryData.users.find((u) => u.id === id);

    if (!user) {
      res.status(404);
      res.json({ error: 'User not found' });

      return;
    }
    res.status(200);
    res.json(user);
  });

  app.delete('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const userIndex = inMemoryData.users.findIndex((u) => u.id === id);

    if (userIndex === -1) {
      res.status(404);
      res.json({ error: 'User not found' });

      return;
    }
    inMemoryData.users.splice(userIndex, 1);
    res.status(204);
  });

  app.patch('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { name } = req.body;
    const userIndex = inMemoryData.users.findIndex((u) => u.id === id);

    if (userIndex === -1) {
      res.status(404);
      res.json({ error: 'User not found' });

      return;
    }

    if (!name) {
      res.status(400);
      res.json({ error: 'One or more fields are missing' });

      return;
    }

    inMemoryData.users[userIndex].name = name;
    res.status(200);
    res.json(inMemoryData.users[userIndex]);
  });

  app.get('/expenses', (req, res) => {
    const { userId, categories, fromDate, toDate } = req.query;
    let filteredExpenses = inMemoryData.expenses;

    if (userId) {
      filteredExpenses = filteredExpenses.filter(
        (e) => e.userId === parseInt(userId),
      );
    }

    if (categories) {
      if (Array.isArray(categories)) {
        filteredExpenses = filteredExpenses.filter(
          (e) => categories.includes(e.category),
          // eslint-disable-next-line function-paren-newline
        );
      } else {
        filteredExpenses = filteredExpenses.filter(
          (e) => e.category === categories,
        );
      }
    }

    if (fromDate || toDate) {
      filteredExpenses = filteredExpenses.filter((expense) => {
        const isAfterFromDate = fromDate
          ? new Date(expense.spentAt) >= new Date(fromDate)
          : true;
        const isBeforeToDate = toDate
          ? new Date(expense.spentAt) <= new Date(toDate)
          : true;

        return isAfterFromDate && isBeforeToDate;
      });
    }
    res.status(200);
    res.json(filteredExpenses);
  });

  app.post('/expenses', (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (!userId || !spentAt || !title || !amount || !category) {
      res.status(400);
      res.json({ error: 'One or more required fields are missing' });

      return;
    }

    inMemoryData.expenses.push({
      id: inMemoryData.nextExpenseIndex,
      userId: userId,
      spentAt: spentAt,
      title: title,
      amount: amount,
      category: category,
      note: note,
    });
    inMemoryData.nextExpenseIndex++;
    res.status(201);
    res.json(inMemoryData.expenses.at(-1));
  });

  app.get('/expenses/:id', (req, res) => {
    const id = parseInt(req.params.id);

    if (Number.isNaN(id)) {
      res.status(400);
      res.json({ error: 'Invalid ID' });

      return;
    }

    const expense = inMemoryData.expenses.find((e) => e.id === id);

    if (!expense) {
      res.status(404);
      res.json({ error: 'User not found' });

      return;
    }
    res.status(200);
    res.json(expense);
  });

  app.delete('/expenses/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const expenseIndex = inMemoryData.expenses.findIndex((e) => e.id === id);

    if (expenseIndex === -1) {
      res.status(404);
      res.json({ error: 'Expense not found' });

      return;
    }
    inMemoryData.expenses.splice(expenseIndex, 1);
    res.status(204);
  });

  app.patch('/expenses/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { spentAt, title, amount, category, note } = req.body;
    const expenseIndex = inMemoryData.expenses.findIndex((e) => e.id === id);

    if (expenseIndex === -1) {
      res.status(404);
      res.json({ error: 'Expense not found' });

      return;
    }

    let changed = false;

    if (spentAt) {
      inMemoryData.expenses[expenseIndex].spentAt = spentAt;
      changed = true;
    }

    if (title) {
      inMemoryData.expenses[expenseIndex].title = title;
      changed = true;
    }

    if (amount) {
      inMemoryData.expenses[expenseIndex].amount = amount;
      changed = true;
    }

    if (category) {
      inMemoryData.expenses[expenseIndex].category = category;
      changed = true;
    }

    if (note) {
      inMemoryData.expenses[expenseIndex].note = note;
      changed = true;
    }

    if (!changed) {
      res.status(400);
      res.json({ error: 'At least one field is required' });

      return;
    }

    res.status(200);
    res.json(inMemoryData.expenses[expenseIndex]);
  });

  return app;
}

module.exports = {
  createServer,
};
