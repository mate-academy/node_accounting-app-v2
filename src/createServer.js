'use strict';

const express = require('express');

function createServer() {
  const app = express();

  app.use(express.json());

  // Data is isolated inside each server instance
  const users = [];
  const expenses = [];

  let nextUserId = 1;
  let nextExpenseId = 1;

  // ==========================================
  // USERS
  // ==========================================

  // Create user
  app.post('/users', (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res
        .status(400)
        .json({ error: 'Missing required parameter: name' });
    }

    const newUser = {
      id: nextUserId++,
      name,
    };

    users.push(newUser);

    res.status(201).json(newUser);
  });

  // Get all users
  app.get('/users', (req, res) => {
    res.json(users);
  });

  // Get one user
  app.get('/users/:id', (req, res) => {
    const user = users.find(
      (item) => item.id.toString() === req.params.id.toString(),
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  });

  // Update user
  app.patch('/users/:id', (req, res) => {
    const { name } = req.body;

    const userIndex = users.findIndex(
      (item) => item.id.toString() === req.params.id.toString(),
    );

    if (userIndex === -1) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (name !== undefined) {
      users[userIndex].name = name;
    }

    res.json(users[userIndex]);
  });

  // Delete user
  app.delete('/users/:id', (req, res) => {
    const userIndex = users.findIndex(
      (item) => item.id.toString() === req.params.id.toString(),
    );

    if (userIndex === -1) {
      return res.status(404).json({ error: 'User not found' });
    }

    users.splice(userIndex, 1);

    res.status(204).send();
  });

  // ==========================================
  // EXPENSES
  // ==========================================

  // Create expense
  app.post('/expenses', (req, res) => {
    const { title, amount, category, note, spentAt, userId } = req.body;

    if (!title || amount === undefined || !category || !spentAt) {
      return res.status(400).json({
        error: 'Missing required parameters',
      });
    }

    // Check user if userId was provided
    if (userId !== undefined && userId !== null) {
      const userExists = users.some(
        (user) => user.id.toString() === userId.toString(),
      );

      if (!userExists) {
        return res.status(400).json({
          error: 'User not found',
        });
      }
    }

    const newExpense = {
      id: nextExpenseId++,
      title,
      amount: Number(amount),
      category,
      note: note || '',
      spentAt,
      userId:
        userId !== undefined && userId !== null ? Number(userId) : undefined,
    };

    expenses.push(newExpense);

    res.status(201).json(newExpense);
  });

  // Get expenses with filters
  app.get('/expenses', (req, res) => {
    const { userId, categories, from, to } = req.query;

    let filteredExpenses = [...expenses];

    // Filter by user
    if (userId) {
      filteredExpenses = filteredExpenses.filter(
        (expense) =>
          expense.userId && expense.userId.toString() === userId.toString(),
      );
    }

    // Filter by category
    if (categories) {
      filteredExpenses = filteredExpenses.filter(
        (expense) => expense.category.toString() === categories.toString(),
      );
    }

    // Filter from date
    if (from) {
      filteredExpenses = filteredExpenses.filter(
        (expense) => new Date(expense.spentAt) >= new Date(from),
      );
    }

    // Filter to date
    if (to) {
      filteredExpenses = filteredExpenses.filter(
        (expense) => new Date(expense.spentAt) <= new Date(to),
      );
    }

    res.json(filteredExpenses);
  });

  // Get one expense
  app.get('/expenses/:id', (req, res) => {
    const expense = expenses.find(
      (item) => item.id.toString() === req.params.id.toString(),
    );

    if (!expense) {
      return res.status(404).json({
        error: 'Expense not found',
      });
    }

    res.json(expense);
  });

  // Update expense
  app.patch('/expenses/:id', (req, res) => {
    const { title, amount, category, note, spentAt, userId } = req.body;

    const expenseIndex = expenses.findIndex(
      (item) => item.id.toString() === req.params.id.toString(),
    );

    if (expenseIndex === -1) {
      return res.status(404).json({
        error: 'Expense not found',
      });
    }

    // Check user if userId was provided
    if (userId !== undefined && userId !== null) {
      const userExists = users.some(
        (user) => user.id.toString() === userId.toString(),
      );

      if (!userExists) {
        return res.status(400).json({
          error: 'User not found',
        });
      }
    }

    if (title !== undefined) {
      expenses[expenseIndex].title = title;
    }

    if (amount !== undefined) {
      expenses[expenseIndex].amount = Number(amount);
    }

    if (category !== undefined) {
      expenses[expenseIndex].category = category;
    }

    if (note !== undefined) {
      expenses[expenseIndex].note = note;
    }

    if (spentAt !== undefined) {
      expenses[expenseIndex].spentAt = spentAt;
    }

    if (userId !== undefined) {
      expenses[expenseIndex].userId =
        userId !== null ? Number(userId) : undefined;
    }

    res.json(expenses[expenseIndex]);
  });

  // Delete expense
  app.delete('/expenses/:id', (req, res) => {
    const expenseIndex = expenses.findIndex(
      (item) => item.id.toString() === req.params.id.toString(),
    );

    if (expenseIndex === -1) {
      return res.status(404).json({
        error: 'Expense not found',
      });
    }

    expenses.splice(expenseIndex, 1);

    res.status(204).send();
  });

  return app;
}

module.exports = {
  createServer,
};
