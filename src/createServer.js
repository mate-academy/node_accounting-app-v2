'use strict';

const express = require('express');

function createServer() {
  const app = express();

  app.use(express.json());

  const users = [];
  const expenses = [];

  // USERS

  app.get('/users', (req, res) => {
    res.send(users);
  });

  app.post('/users', (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.status(400).send('Name is required');

      return;
    }

    const newUser = {
      id: Date.now(),
      name,
    };

    users.push(newUser);

    res.status(201).send(newUser);
  });

  app.get('/users/:id', (req, res) => {
    const { id } = req.params;

    const user = users.find((item) => item.id === Number(id));

    if (!user) {
      res.status(404).send('User not found');

      return;
    }

    res.send(user);
  });

  app.patch('/users/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    const user = users.find((item) => item.id === Number(id));

    if (!user) {
      res.status(404).send('User not found');

      return;
    }

    if (!name) {
      res.status(400).send('Name is required');

      return;
    }

    user.name = name;

    res.send(user);
  });

  app.delete('/users/:id', (req, res) => {
    const { id } = req.params;

    const userIndex = users.findIndex((item) => item.id === Number(id));

    if (userIndex === -1) {
      res.status(404).send('User not found');

      return;
    }

    users.splice(userIndex, 1);

    res.sendStatus(204);
  });

  // EXPENSES

  app.post('/expenses', (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (!userId || !spentAt || !title || !amount || !category) {
      res.status(400).send('Required fields are missing');

      return;
    }

    const user = users.find((item) => item.id === Number(userId));

    if (!user) {
      res.status(400).send('User not found');

      return;
    }

    const newExpense = {
      id: Date.now(),
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    };

    expenses.push(newExpense);

    res.status(201).send(newExpense);
  });

  app.get('/expenses', (req, res) => {
    const { userId, from, to, categories } = req.query;

    let filteredExpenses = [...expenses];

    if (userId) {
      filteredExpenses = filteredExpenses.filter(
        (expense) => expense.userId === Number(userId),
      );
    }

    if (from) {
      const fromDate = new Date(from);

      filteredExpenses = filteredExpenses.filter(
        (expense) => new Date(expense.spentAt) >= fromDate,
      );
    }

    if (to) {
      const toDate = new Date(to);

      filteredExpenses = filteredExpenses.filter(
        (expense) => new Date(expense.spentAt) <= toDate,
      );
    }

    if (categories) {
      const categoriesList = categories.split(',');

      filteredExpenses = filteredExpenses.filter((expense) =>
        // eslint-disable-next-line prettier/prettier
        categoriesList.includes(expense.category));
    }

    res.send(filteredExpenses);
  });

  app.get('/expenses/:id', (req, res) => {
    const { id } = req.params;

    const expense = expenses.find((item) => item.id === Number(id));

    if (!expense) {
      res.status(404).send('Expense not found');

      return;
    }

    res.send(expense);
  });

  app.patch('/expenses/:id', (req, res) => {
    const { id } = req.params;

    const expense = expenses.find((item) => item.id === Number(id));

    if (!expense) {
      res.status(404).send('Expense not found');

      return;
    }

    const { userId, spentAt, title, amount, category, note } = req.body;

    if (userId !== undefined) {
      const user = users.find((item) => item.id === Number(userId));

      if (!user) {
        res.status(400).send('User not found');

        return;
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

    res.send(expense);
  });

  app.delete('/expenses/:id', (req, res) => {
    const { id } = req.params;

    const expenseIndex = expenses.findIndex((item) => item.id === Number(id));

    if (expenseIndex === -1) {
      res.status(404).send('Expense not found');

      return;
    }

    expenses.splice(expenseIndex, 1);

    res.sendStatus(204);
  });

  return app;
}

module.exports = {
  createServer,
};
