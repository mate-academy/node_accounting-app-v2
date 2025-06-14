'use strict';

const express = require('express');

function createServer() {
  const app = express();

  // Middleware to parse JSON
  app.use(express.json());

  // In-memory storage for users and expenses
  const users = [];
  const expenses = [];

  // Define routes for users and expenses
  app.get('/users', (_, res) => {
    res.json(users);
  });

  app.post('/users', (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.status(400).send('Name is required');
    }

    const user = { id: users.length + 1, name };

    users.push(user);
    res.status(201).json(user);
  });

  app.get('/users/:id', (req, res) => {
    const { id } = req.params;

    const foundUser = users.find((user) => user.id === Number(id));

    if (!foundUser) {
      return res.status(404).send('User not found');
    }

    res.json(foundUser);
  });

  app.patch('/users/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    const foundUser = users.find((user) => user.id === Number(id));

    if (!foundUser) {
      return res.status(404).send('User not found');
    }

    if (name) {
      foundUser.name = name;
    }

    res.json(foundUser);
  });

  app.delete('/users/:id', (req, res) => {
    const { id } = req.params;

    const userIndex = users.findIndex((user) => user.id === Number(id));

    if (userIndex === -1) {
      return res.status(404).send('User not found');
    }

    users.splice(userIndex, 1);
    res.status(204).send();
  });

  app.get('/expenses', (req, res) => {
    const { userId, from, to, categories } = req.query;

    let filteredExpenses = expenses;

    // Filter by userId if provided
    if (userId) {
      filteredExpenses = filteredExpenses.filter(
        (expense) => expense.userId === Number(userId),
      );
    }

    // Filter by date range if provided
    if (from || to) {
      const fromDate = from ? new Date(from) : null;
      const toDate = to ? new Date(to) : null;

      filteredExpenses = filteredExpenses.filter((expense) => {
        const spentAt = new Date(expense.spentAt);

        // Ensure spentAt is a valid date
        if (isNaN(spentAt)) {
          return false;
        }

        const isAfterFromDate = fromDate ? spentAt >= fromDate : true;
        const isBeforeToDate = toDate ? spentAt <= toDate : true;

        return isAfterFromDate && isBeforeToDate;
      });
    }

    // Filter by categories if provided
    if (categories) {
      const categoryList = categories.toLowerCase().split(',');

      filteredExpenses = filteredExpenses.filter(
        (expense) =>
          expense.category &&
          categoryList.includes(expense.category.toLowerCase()),
      );
    }

    res.json(filteredExpenses);
  });

  app.get('/expenses/:id', (req, res) => {
    const { id } = req.params;

    const foundExpense = expenses.find((expense) => expense.id === Number(id));

    if (!foundExpense) {
      return res.status(404).send('Expense not found');
    }

    res.json(foundExpense);
  });

  app.post('/expenses', (req, res) => {
    const { userId, title, amount, category, spentAt, note } = req.body;

    if (
      userId === undefined ||
      !title ||
      amount === undefined ||
      !category ||
      !spentAt
    ) {
      return res.status(400).send('All fields are required');
    }

    const userExists = users.some((user) => user.id === userId);

    if (!userExists) {
      return res.status(400).send('User not found');
    }

    const expense = {
      id: expenses.length + 1,
      userId,
      title,
      amount,
      category,
      spentAt,
      note,
    };

    expenses.push(expense);
    res.status(201).json(expense);
  });

  app.patch('/expenses/:id', (req, res) => {
    const { id } = req.params;
    const { title, amount, category, spentAt, note } = req.body;

    const expense = expenses.find((e) => e.id === Number(id));

    if (!expense) {
      return res.status(404).send('Expense not found');
    }

    if (title) {
      expense.title = title;
    }

    if (amount) {
      expense.amount = amount;
    }

    if (category) {
      expense.category = category;
    }

    if (spentAt) {
      expense.spentAt = spentAt;
    }

    if (note) {
      expense.note = note;
    }

    res.json(expense);
  });

  app.delete('/expenses/:id', (req, res) => {
    const { id } = req.params;

    const expenseIndex = expenses.findIndex(
      (expense) => expense.id === Number(id),
    );

    if (expenseIndex === -1) {
      return res.status(404).send('Expense not found');
    }

    expenses.splice(expenseIndex, 1);
    res.status(204).send();
  });

  return app;
}

module.exports = {
  createServer,
};
