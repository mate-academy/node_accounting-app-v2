'use strict';

const express = require('express');

function createServer() {
  const app = express();
  const users = [];
  const expenses = [];
  let nextUserId = 1;
  let nextExpenseId = 1;

  app.use(express.json());

  const findUserById = (userId) => users.find((user) => user.id === userId);
  const findExpenseById = (expenseId) =>
    expenses.find((expense) => expense.id === expenseId);

  app.post('/users', (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.status(400).send('Name is required');

      return;
    }

    const newUser = {
      id: nextUserId,
      name,
    };

    nextUserId += 1;
    users.push(newUser);

    res.status(201).json(newUser);
  });

  app.get('/users', (_req, res) => {
    res.json(users);
  });

  app.get('/users/:userId', (req, res) => {
    const userId = Number(req.params.userId);
    const user = findUserById(userId);

    if (!user) {
      res.status(404).send('User not found');

      return;
    }

    res.json(user);
  });

  app.patch('/users/:userId', (req, res) => {
    const userId = Number(req.params.userId);
    const user = findUserById(userId);

    if (!user) {
      res.status(404).send('User not found');

      return;
    }

    if (!req.body.name) {
      res.status(400).send('Name is required');

      return;
    }

    user.name = req.body.name;

    res.json(user);
  });

  app.delete('/users/:userId', (req, res) => {
    const userId = Number(req.params.userId);
    const userIndex = users.findIndex((user) => user.id === userId);

    if (userIndex === -1) {
      res.status(404).send('User not found');

      return;
    }

    users.splice(userIndex, 1);

    res.status(204).send();
  });

  app.post('/expenses', (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (!userId || !spentAt || !title || amount === undefined || !category) {
      res.status(400).send('Required fields are missing');

      return;
    }

    if (!findUserById(Number(userId))) {
      res.status(400).send('User not found');

      return;
    }

    const newExpense = {
      id: nextExpenseId,
      userId: Number(userId),
      spentAt,
      title,
      amount,
      category,
      note,
    };

    nextExpenseId += 1;
    expenses.push(newExpense);

    res.status(201).json(newExpense);
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
      const fromTime = new Date(from).getTime();

      filteredExpenses = filteredExpenses.filter(
        (expense) => new Date(expense.spentAt).getTime() >= fromTime,
      );
    }

    if (to) {
      const toTime = new Date(to).getTime();

      filteredExpenses = filteredExpenses.filter(
        (expense) => new Date(expense.spentAt).getTime() <= toTime,
      );
    }

    if (categories) {
      const categoryList = categories.split(',');

      filteredExpenses = filteredExpenses.filter((expense) => {
        return categoryList.includes(expense.category);
      });
    }

    res.json(filteredExpenses);
  });

  app.get('/expenses/:expenseId', (req, res) => {
    const expenseId = Number(req.params.expenseId);
    const expense = findExpenseById(expenseId);

    if (!expense) {
      res.status(404).send('Expense not found');

      return;
    }

    res.json(expense);
  });

  app.patch('/expenses/:expenseId', (req, res) => {
    const expenseId = Number(req.params.expenseId);
    const expense = findExpenseById(expenseId);

    if (!expense) {
      res.status(404).send('Expense not found');

      return;
    }

    const { userId, spentAt, title, amount, category, note } = req.body;

    if (userId !== undefined) {
      if (!findUserById(Number(userId))) {
        res.status(400).send('User not found');

        return;
      }

      expense.userId = Number(userId);
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

  app.delete('/expenses/:expenseId', (req, res) => {
    const expenseId = Number(req.params.expenseId);
    const expenseIndex = expenses.findIndex(
      (expense) => expense.id === expenseId,
    );

    if (expenseIndex === -1) {
      res.status(404).send('Expense not found');

      return;
    }

    expenses.splice(expenseIndex, 1);

    res.status(204).send();
  });

  return app;
}

module.exports = {
  createServer,
};
