'use strict';

const express = require('express');
const bodyParser = require('body-parser');

function createServer() {
  const app = express();

  app.use(bodyParser.json());

  let users = [];
  let expenses = [];
  let nextUserId = 1;
  let nextExpenseId = 1;

  const findUserById = (id) => {
    return users.find((user) => user.id === parseInt(id));
  };

  const findExpenseById = (id) => {
    return expenses.find((expense) => expense.id === parseInt(id));
  };

  app.get('/users', (req, res) => {
    res.status(200).json(users);
  });

  app.post('/users', (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const newUser = {
      id: nextUserId++,
      name,
    };

    users.push(newUser);
    res.status(201).json(newUser);
  });

  app.get('/users/:id', (req, res) => {
    const { id } = req.params;
    const user = findUserById(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  });

  app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    const user = findUserById(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    users = users.filter((u) => u.id !== parseInt(id));
    res.status(204).send();
  });

  app.patch('/users/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const user = findUserById(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    user.name = name;
    res.status(200).json(user);
  });

  app.get('/expenses', (req, res) => {
    let filteredExpenses = [...expenses];

    if (req.query.userId) {
      const userId = parseInt(req.query.userId);

      filteredExpenses = filteredExpenses.filter(
        (expense) => expense.userId === userId,
      );
    }

    if (req.query.categories) {
      const categories = Array.isArray(req.query.categories)
        ? req.query.categories
        : [req.query.categories];

      filteredExpenses = filteredExpenses.filter((expense) => {
        return categories.includes(expense.category);
      });
    }

    if (req.query.from) {
      const fromDate = new Date(req.query.from);

      filteredExpenses = filteredExpenses.filter(
        (expense) => new Date(expense.spentAt) >= fromDate,
      );
    }

    if (req.query.to) {
      const toDate = new Date(req.query.to);

      filteredExpenses = filteredExpenses.filter(
        (expense) => new Date(expense.spentAt) <= toDate,
      );
    }
    res.status(200).json(filteredExpenses);
  });

  app.post('/expenses', (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (!userId || !spentAt || !title || !amount || !category) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const user = findUserById(userId);

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    const newExpense = {
      id: nextExpenseId++,
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    };

    expenses.push(newExpense);
    res.status(201).json(newExpense);
  });

  app.get('/expenses/:id', (req, res) => {
    const { id } = req.params;
    const expense = findExpenseById(id);

    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }
    res.status(200).json(expense);
  });

  app.delete('/expenses/:id', (req, res) => {
    const { id } = req.params;
    const expense = findExpenseById(id);

    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }
    expenses = expenses.filter((e) => e.id !== parseInt(id));
    res.status(204).send();
  });

  app.patch('/expenses/:id', (req, res) => {
    const { id } = req.params;
    const { spentAt, title, amount, category, note } = req.body;

    const expense = findExpenseById(id);

    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    if (req.body.userId) {
      const user = findUserById(req.body.userId);

      if (!user) {
        return res.status(400).json({ error: 'User not found' });
      }
    }

    if (spentAt) {
      expense.spentAt = spentAt;
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

    if (note) {
      expense.note = note;
    }

    if (req.body.userId) {
      expense.userId = req.body.userId;
    }
    res.status(200).json(expense);
  });

  return app;
}

module.exports = {
  createServer,
};
