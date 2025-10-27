'use strict';

const express = require('express');

function createServer() {
  const app = express();
  app.use(express.json());

  let expenses = [];
  const users = [];

  // Generate numeric IDs
  const generateId = (list) =>
    list.length ? Math.max(...list.map((i) => Number(i.id))) + 1 : 1; // Return next number

  // Endpoint to get all expenses
  // app.get('/expenses', (req, res) => {
  //   res.json(expenses);
  // });

  app.get('/expenses', (req, res) => {
    const { categories, userId, from, to } = req.query;

    let filteredExpenses = expenses;

    // Filter by category if provided
    if (categories) {
      filteredExpenses = filteredExpenses.filter(
        (e) => categories.includes(e.category),
      );
    }

    // Filter by userId if provided
    if (userId) {
      filteredExpenses = filteredExpenses.filter((e) => e.userId === +userId);
    }

    // Filter by date range if provided (startDate and endDate should be in ISO format)
    if (from && to) {
      const start = new Date(from);
      const end = new Date(to);

      filteredExpenses = filteredExpenses.filter((e) => {
        const expenseDate = new Date(e.spentAt); // Ensure spentAt is in Date format
        return expenseDate >= start && expenseDate <= end;
      });
    }

    res.json(filteredExpenses);
  });


  // Endpoint to get a specific expense by id
  app.get('/expenses/:id', (req, res) => {
    const expense = expenses.find((e) => e.id === Number(req.params.id)); // Compare as numbers
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    res.json(expense);
  });

  // Endpoint to create a new expense
  app.post('/expenses', (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    // Validation for required fields
    if (
      !userId ||
      !spentAt ||
      !title ||
      typeof amount !== 'number' ||
      isNaN(amount) ||
      !category
    ) {
      return res.status(400).json({
        message:
          'Missing or invalid fields: userId, spentAt, title, amount, category',
      });
    }

    const user = users.find((u) => u.id === userId);

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const parsedSpentAt = new Date(spentAt);

    if (isNaN(parsedSpentAt)) {
      return res
        .status(400)
        .json({ message: 'Invalid date format for spentAt' });
    }

    const newExpense = {
      id: generateId(expenses), // Generate a numeric ID
      userId,
      spentAt: parsedSpentAt.toISOString(),
      title,
      amount,
      category,
      note: note || '', // Default empty string if no note is provided
    };

    expenses.push(newExpense);
    res.status(201).json(newExpense);
  });

  // Endpoint to update an existing expense
  app.patch('/expenses/:id', (req, res) => {
    const expense = expenses.find((e) => e.id === Number(req.params.id));

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

const updatedExpense = Object.assign(expense, req.body);
    res.json(updatedExpense);
  });

  // Endpoint to delete an expense
  app.delete('/expenses/:id', (req, res) => {
    const index = expenses.findIndex((e) => e.id === Number(req.params.id));

    if (index === -1) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    expenses.splice(index, 1);
    res.status(204).send(); // No content to return
  });

  // Endpoint to get all users
  app.get('/users', (req, res) => {
    res.json(users);
  });

  // Endpoint to get a specific user by id
  app.get('/users/:id', (req, res) => {
    const user = users.find((u) => u.id === Number(req.params.id)); // Compare as numbers

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  });

  // Endpoint to create a new user
  app.post('/users', (req, res) => {
    const { name } = req.body;

    // Validation for required fields
    if (!name) {
      return res.status(400).json({ message: 'Missing required field: name' });
    }

    const newUser = {
      id: generateId(users), // Generate a numeric ID
      name,
    };

    users.push(newUser);
    res.status(201).json(newUser);
  });

  // Endpoint to update an existing user
  app.patch('/users/:id', (req, res) => {
    const user = users.find((u) => u.id === Number(req.params.id));

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Missing required field: name' });
    }

    user.name = name;
    res.json(user);
  });

  // Endpoint to delete a user
  app.delete('/users/:id', (req, res) => {
    const index = users.findIndex((u) => u.id === Number(req.params.id));

    if (index === -1) {
      return res.status(404).json({ message: 'User not found' });
    }

    const deletedUser = users.splice(index, 1)[0];

    // Delete any expenses associated with this user
    expenses = expenses.filter((e) => e.userId !== deletedUser.id);

    res.status(204).send(); // No content to return
  });

  // Catch-all route for undefined routes
  app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
  });

  return app;
}

module.exports = {
  createServer,
};
