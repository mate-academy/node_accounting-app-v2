'use strict';

const express = require('express');

let store = {
  users: [],
  expenses: [],
  nextUserId: 1,
  nextExpenseId: 1,
};

function createServer() {
  const app = express();

  app.use(express.json());

  store = {
    users: [],
    expenses: [],
    nextUserId: 1,
    nextExpenseId: 1,
  };

  app.post('/users', (req, res) => {
    const { name } = req.body;

    if (!name || typeof name !== 'string') {
      return res.status(400).send('User name is required.');
    }

    const newUser = { id: store.nextUserId++, name };

    store.users.push(newUser);
    res.status(201).send(newUser);
  });

  app.get('/users', (req, res) => {
    res.status(200).send(store.users);
  });

  app.get('/users/:id', (req, res) => {
    const id = Number(req.params.id);

    if (isNaN(id) || !Number.isInteger(id) || id <= 0) {
      return res.status(400).send('Invalid User ID format.');
    }

    const user = store.users.find((u) => u.id === id);

    if (!user) {
      return res.status(404).send('User not found.');
    }

    res.status(200).send(user);
  });

  app.patch('/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const { name } = req.body;

    if (isNaN(id) || !Number.isInteger(id) || id <= 0) {
      return res.status(400).send('Invalid User ID format.');
    }

    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return res.status(400).send('User name is required for update.');
    }

    const index = store.users.findIndex((u) => u.id === id);

    if (index === -1) {
      return res.status(404).send('User not found.');
    }

    const updatedUser = { ...store.users[index], name };

    store.users[index] = updatedUser;
    res.status(200).send(updatedUser);
  });

  app.delete('/users/:id', (req, res) => {
    const id = Number(req.params.id);

    if (isNaN(id) || !Number.isInteger(id) || id <= 0) {
      return res.status(400).send('Invalid User ID format.');
    }

    const initialLength = store.users.length;

    store.users = store.users.filter((u) => u.id !== id);

    if (store.users.length === initialLength) {
      return res.status(404).send('User not found.');
    }
    res.status(204).send();
  });

  app.post('/expenses', (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;
    const numUserId = Number(userId);
    const numAmount = Number(amount);

    if (
      isNaN(numUserId) ||
      numUserId <= 0 ||
      isNaN(new Date(spentAt).getTime()) ||
      !title ||
      typeof title !== 'string' ||
      title.trim().length === 0 ||
      isNaN(numAmount) ||
      numAmount <= 0 ||
      !category ||
      typeof category !== 'string' ||
      category.trim().length === 0
    ) {
      return res.status(400).send('Bad request.');
    }

    if (!store.users.find((u) => u.id === numUserId)) {
      return res.status(400).send('User not found.');
    }

    const newExpense = {
      id: store.nextExpenseId++,
      userId: numUserId,
      spentAt,
      title,
      amount: numAmount,
      category,
      note: note,
    };

    store.expenses.push(newExpense);
    res.status(201).send(newExpense);
  });

  app.get('/expenses', (req, res) => {
    let filtered = [...store.expenses];
    const { userId, categories, from, to } = req.query;

    if (userId !== undefined) {
      const numId = Number(userId);

      if (isNaN(numId) || !Number.isInteger(numId) || numId <= 0) {
        return res.status(400).send('Invalid userId query parameter.');
      }
      filtered = filtered.filter((e) => e.userId === numId);
    }

    if (categories) {
      const categoriesArray = categories.split(',').map((c) => c.trim());

      filtered = filtered.filter((e) => categoriesArray.includes(e.category));
    }

    if (from) {
      const dateFrom = new Date(from);

      if (isNaN(dateFrom.getTime())) {
        return res.status(400).send('Invalid "from" date format.');
      }
      filtered = filtered.filter((e) => new Date(e.spentAt) >= dateFrom);
    }

    if (to) {
      const dateTo = new Date(to);

      if (isNaN(dateTo.getTime())) {
        return res.status(400).send('Invalid "to" date format.');
      }
      filtered = filtered.filter((e) => new Date(e.spentAt) <= dateTo);
    }

    res.status(200).send(filtered);
  });

  app.get('/expenses/:id', (req, res) => {
    const id = Number(req.params.id);

    if (isNaN(id) || !Number.isInteger(id) || id <= 0) {
      return res.status(400).send('Invalid Expense ID format.');
    }

    const expense = store.expenses.find((e) => e.id === id);

    if (!expense) {
      return res.status(404).send('Expense not found.');
    }

    res.status(200).send(expense);
  });

  app.patch('/expenses/:id', (req, res) => {
    const id = Number(req.params.id);
    const updates = req.body;

    if (isNaN(id) || !Number.isInteger(id) || id <= 0) {
      return res.status(400).send('Invalid Expense ID format.');
    }

    const index = store.expenses.findIndex((e) => e.id === id);

    if (index === -1) {
      return res.status(404).send('Expense not found.');
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).send('No update fields provided.');
    }

    if (updates.spentAt !== undefined) {
      if (isNaN(new Date(updates.spentAt).getTime())) {
        return res.status(400).send('Invalid "spentAt" date format.');
      }
    }

    if (updates.amount !== undefined) {
      const numAmount = Number(updates.amount);

      if (isNaN(numAmount) || numAmount <= 0) {
        return res.status(400).send('Invalid amount');
      }
      updates.amount = numAmount;
    }

    const updatedExpense = { ...store.expenses[index], ...updates };

    store.expenses[index] = updatedExpense;
    res.status(200).send(updatedExpense);
  });

  app.delete('/expenses/:id', (req, res) => {
    const id = Number(req.params.id);

    if (isNaN(id) || !Number.isInteger(id) || id <= 0) {
      return res.status(400).send('Invalid Expense ID format.');
    }

    const index = store.expenses.findIndex((e) => e.id === id);

    if (index === -1) {
      return res.status(404).send('Expense not found.');
    }
    store.expenses.splice(index, 1);
    res.status(204).send();
  });

  return app;
}

module.exports = {
  createServer,
};
