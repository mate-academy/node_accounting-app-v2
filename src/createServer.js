'use strict';

const express = require('express');

function createServer() {
  const app = express();
  const users = [];
  const expenses = [];
  let nextUserId = 1;
  let nextExpenseId = 1;

  app.use(express.json());

  const getUserById = (id) => users.find((user) => user.id === id);
  const getExpenseById = (id) => expenses.find((expense) => expense.id === id);

  app.post('/users', (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Name is required' });
    }

    const user = {
      id: nextUserId,
      name,
    };

    nextUserId += 1;
    users.push(user);

    return res.status(201).json(user);
  });

  app.get('/users', (req, res) => {
    res.json(users);
  });

  app.get('/users/:userId', (req, res) => {
    const userId = Number(req.params.userId);
    const user = getUserById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json(user);
  });

  const updateUser = (req, res) => {
    const userId = Number(req.params.userId);
    const user = getUserById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Name is required' });
    }

    user.name = name;

    return res.json(user);
  };

  app.patch('/users/:userId', updateUser);
  app.put('/users/:userId', updateUser);

  app.delete('/users/:userId', (req, res) => {
    const userId = Number(req.params.userId);
    const userIndex = users.findIndex((user) => user.id === userId);

    if (userIndex === -1) {
      return res.status(404).json({ message: 'User not found' });
    }

    users.splice(userIndex, 1);

    return res.status(204).send();
  });

  app.post('/expenses', (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (
      userId === undefined ||
      !spentAt ||
      !title ||
      amount === undefined ||
      !category
    ) {
      return res.status(400).json({ message: 'Required fields are missing' });
    }

    const user = getUserById(Number(userId));

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const expense = {
      id: nextExpenseId,
      userId: Number(userId),
      spentAt,
      title,
      amount,
      category,
      note,
    };

    nextExpenseId += 1;
    expenses.push(expense);

    return res.status(201).json(expense);
  });

  app.get('/expenses', (req, res) => {
    const { userId, from, to, categories } = req.query;
    let filteredExpenses = [...expenses];

    if (userId !== undefined) {
      filteredExpenses = filteredExpenses.filter(
        (expense) => expense.userId === Number(userId),
      );
    }

    if (from !== undefined) {
      const fromTime = new Date(from).getTime();

      filteredExpenses = filteredExpenses.filter(
        (expense) => new Date(expense.spentAt).getTime() >= fromTime,
      );
    }

    if (to !== undefined) {
      const toTime = new Date(to).getTime();

      filteredExpenses = filteredExpenses.filter(
        (expense) => new Date(expense.spentAt).getTime() <= toTime,
      );
    }

    if (categories !== undefined) {
      const categoriesList = String(categories).split(',');

      filteredExpenses = filteredExpenses.filter((expense) => {
        return categoriesList.includes(expense.category);
      });
    }

    res.json(filteredExpenses);
  });

  app.get('/expenses/:expenseId', (req, res) => {
    const expenseId = Number(req.params.expenseId);
    const expense = getExpenseById(expenseId);

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    return res.json(expense);
  });

  app.patch('/expenses/:expenseId', (req, res) => {
    const expenseId = Number(req.params.expenseId);
    const expense = getExpenseById(expenseId);

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    if (req.body.userId !== undefined) {
      const user = getUserById(Number(req.body.userId));

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      expense.userId = Number(req.body.userId);
    }

    if (req.body.spentAt !== undefined) {
      expense.spentAt = req.body.spentAt;
    }

    if (req.body.title !== undefined) {
      expense.title = req.body.title;
    }

    if (req.body.amount !== undefined) {
      expense.amount = req.body.amount;
    }

    if (req.body.category !== undefined) {
      expense.category = req.body.category;
    }

    if (req.body.note !== undefined) {
      expense.note = req.body.note;
    }

    return res.json(expense);
  });

  app.delete('/expenses/:expenseId', (req, res) => {
    const expenseId = Number(req.params.expenseId);
    const expenseIndex = expenses.findIndex(
      (expense) => expense.id === expenseId,
    );

    if (expenseIndex === -1) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    expenses.splice(expenseIndex, 1);

    return res.status(204).send();
  });

  return app;
}

module.exports = {
  createServer,
};
