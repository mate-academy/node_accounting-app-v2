'use strict';

const express = require('express');
const cors = require('cors');

function createServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  const users = [];
  const expenses = [];
  let userIdCounter = 1;
  let expenseIdCounter = 1;

  app.get('/users', (req, res) => {
    res.status(200).json(users);
  });

  app.get('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find((u) => u.id === id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  });

  app.post('/users', (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const newUser = {
      id: userIdCounter++,
      name,
    };

    users.push(newUser);
    res.status(201).json(newUser);
  });

  app.patch('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const user = users.find((u) => u.id === id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.name = name;
    res.status(200).json(user);
  });

  app.delete('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const userIndex = users.findIndex((u) => u.id === id);

    if (userIndex === -1) {
      return res.status(404).json({ error: 'User not found' });
    }

    users.splice(userIndex, 1);
    res.sendStatus(204);
  });

  app.get('/expenses', (req, res) => {
    const { userId, from, to, categories } = req.query;
    let filteredExpenses = expenses;

    if (userId) {
      const id = parseInt(userId);

      filteredExpenses = filteredExpenses.filter((e) => e.userId === id);
    }

    if (from) {
      const fromDate = new Date(from);

      filteredExpenses = filteredExpenses.filter(
        (e) => new Date(e.spentAt) >= fromDate,
      );
    }

    if (to) {
      const toDate = new Date(to);

      filteredExpenses = filteredExpenses.filter(
        (e) => new Date(e.spentAt) <= toDate,
      );
    }

    if (categories) {
      const categoryList = categories.split(',');

      filteredExpenses = filteredExpenses.filter((e) => {
        return categoryList.includes(e.category);
      });
    }

    res.status(200).json(filteredExpenses);
  });

  app.get('/expenses/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const expense = expenses.find((e) => e.id === id);

    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    res.status(200).json(expense);
  });

  // POST /expenses - Create a new expense
  app.post('/expenses', (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    // Validate required fields explicitly (not falsy check to allow 0)
    if (
      userId === undefined ||
      userId === null ||
      spentAt === undefined ||
      spentAt === null ||
      title === undefined ||
      title === null ||
      amount === undefined ||
      amount === null ||
      category === undefined ||
      category === null
    ) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Normalize userId to number for comparison
    const userIdNum = Number(userId);

    // If userId is not a valid number, return 400
    if (isNaN(userIdNum)) {
      return res.status(400).json({ error: 'Invalid userId' });
    }

    // Check if user exists - return 400 per test expectation
    const user = users.find((u) => u.id === userIdNum);

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    const newExpense = {
      id: expenseIdCounter++,
      userId: userIdNum,
      spentAt,
      title,
      amount,
      category,
      note: note || null,
    };

    expenses.push(newExpense);
    res.status(201).json(newExpense);
  });

  app.patch('/expenses/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { userId, spentAt, title, amount, category, note } = req.body;
    const expense = expenses.find((e) => e.id === id);

    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    if (userId !== undefined && userId !== null) {
      const userIdNum = Number(userId);
      const user = users.find((u) => u.id === userIdNum);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      expense.userId = userIdNum;
    }

    if (spentAt !== undefined && spentAt !== null) {
      if (spentAt === '') {
        return res.status(400).json({ error: 'spentAt cannot be empty' });
      }
      expense.spentAt = spentAt;
    }

    if (title !== undefined && title !== null) {
      if (title === '') {
        return res.status(400).json({ error: 'title cannot be empty' });
      }
      expense.title = title;
    }

    if (amount !== undefined && amount !== null) {
      expense.amount = amount;
    }

    if (category !== undefined && category !== null) {
      if (category === '') {
        return res.status(400).json({ error: 'category cannot be empty' });
      }
      expense.category = category;
    }

    if (note !== undefined) {
      expense.note = note;
    }

    res.status(200).json(expense);
  });

  app.delete('/expenses/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const expenseIndex = expenses.findIndex((e) => e.id === id);

    if (expenseIndex === -1) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    expenses.splice(expenseIndex, 1);
    res.sendStatus(204);
  });

  return app;
}

module.exports = { createServer };
