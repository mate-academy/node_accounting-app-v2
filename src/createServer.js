'use strict';

const express = require('express');

function createServer() {
  const app = express();

  let users = [];
  let expenses = [];

  const getUserNewId = () => users.length + 1;
  const getExpenseNewId = () => expenses.length + 1;

  app.get('/users', (req, res) => res.send(users));

  app.get('/users/:id', (req, res) => {
    const { id } = req.params;
    const currentUser = users.find((user) => user.id === parseInt(id));

    if (!currentUser) {
      return res.sendStatus(404);
    }
    res.send(currentUser);
  });

  app.post('/users', express.json(), (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.sendStatus(400);
    }

    const user = { id: getUserNewId(), name };

    users.push(user);
    res.status(201).send(user);
  });

  app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    const newUsers = users.filter((user) => user.id !== parseInt(id));

    if (users.length === newUsers.length) {
      return res.sendStatus(404);
    }
    users = newUsers;
    res.sendStatus(204);
  });

  app.patch('/users/:id', express.json(), (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const chosenUser = users.find((user) => user.id === parseInt(id));

    if (!chosenUser || typeof name !== 'string') {
      return res.sendStatus(400);
    }
    chosenUser.name = name;
    res.send(chosenUser);
  });

  app.get('/expenses', (req, res) => {
    const { userId, from, to, categories } = req.query;

    if (!userId && !categories && (!from || !to)) {
      return res.send(expenses);
    }

    const normalizedCategories =
      typeof categories === 'string'
        ? categories.trim()
          ? [categories]
          : []
        : Array.isArray(categories)
          ? categories
          : [];

    const filteredExpenses = expenses.filter((expense) => {
      const matchesUserId = userId ? expense.userId === parseInt(userId) : true;
      const matchesCategory =
        normalizedCategories.length > 0
          ? normalizedCategories.includes(expense.category)
          : true;
      const matchesDateRange =
        from && to
          ? new Date(expense.spentAt) >= new Date(from) &&
            new Date(expense.spentAt) <= new Date(to)
          : true;

      return matchesUserId && matchesCategory && matchesDateRange;
    });

    res.send(filteredExpenses);
  });

  app.get('/expenses/:id', (req, res) => {
    const { id } = req.params;
    const chosenExpense = expenses.find(
      (expense) => expense.id === parseInt(id),
    );

    if (!chosenExpense) {
      return res.sendStatus(404);
    }
    res.send(chosenExpense);
  });

  app.post('/expenses', express.json(), (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (!userId || !spentAt || !title || !amount || !category || !note) {
      return res.sendStatus(400);
    }

    if (!users.some((user) => user.id === parseInt(userId))) {
      return res.sendStatus(400);
    }

    const newExpense = {
      id: getExpenseNewId(),
      userId: parseInt(userId),
      spentAt,
      title,
      amount,
      category,
      note,
    };

    expenses.push(newExpense);
    res.status(201).send(newExpense);
  });

  app.delete('/expenses/:id', (req, res) => {
    const { id } = req.params;
    const newExpenses = expenses.filter(
      (expense) => expense.id !== parseInt(id),
    );

    if (expenses.length === newExpenses.length) {
      return res.sendStatus(404);
    }
    expenses = newExpenses;
    res.sendStatus(204);
  });

  app.patch('/expenses/:id', express.json(), (req, res) => {
    const { id } = req.params;
    const chosenExpense = expenses.find(
      (expense) => expense.id === parseInt(id),
    );

    if (!chosenExpense) {
      return res.sendStatus(404);
    }
    Object.assign(chosenExpense, req.body);
    res.status(200).send(chosenExpense);
  });

  return app;
}

module.exports = { createServer };
