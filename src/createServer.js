'use strict';

const express = require('express');

function createServer() {
  const app = express();

  app.use(express.json());

  // In-memory data stores
  const expenses = [];
  const users = [];

  let expenseIdCounter = 0;
  let userIdCounter = 0;

  // Middleware
  const checkRequiredFields = (requiredFields) => (req, res, next) => {
    const missingFields = requiredFields.filter((field) => !req.body[field]);
    if (missingFields.length > 0) {
      return res.status(400).json({
        error: `Missing required fields: ${missingFields.join(', ')}`,
      });
    }
    next();
  };

  const validateAmount = (req, res, next) => {
    if (req.body.amount && isNaN(parseFloat(req.body.amount))) {
      return res.status(400).json({ error: 'Amount must be a number' });
    }
    next();
  };

  const validateDate = (req, res, next) => {
    if (req.body.spentAt && isNaN(new Date(req.body.spentAt).getTime())) {
      return res.status(400).json({ error: 'Invalid date format' });
    }
    next();
  };

  const checkUserExists = (req, res, next) => {
    if (req.body.userId) {
      const user = users.find((u) => u.id === Number(req.body.userId));
      if (!user) {
        return res.status(400).json({ error: 'User not found' });
      }
    }
    next();
  };

  // Expense Routes
  app.get('/expenses', (req, res) => {
    let filteredExpenses = [...expenses];

    if (req.query.userId) {
      filteredExpenses = filteredExpenses.filter(
        (e) => e.userId === Number(req.query.userId),
      );
    }

    if (req.query.from && req.query.to) {
      try {
        const fromDate = new Date(req.query.from);
        const toDate = new Date(req.query.to);
        
        filteredExpenses = filteredExpenses.filter((e) => {
          const expenseDate = new Date(e.spentAt);
          return expenseDate >= fromDate && expenseDate <= toDate;
        });
      } catch (e) {
        return res.status(400).json({ error: 'Invalid date format' });
      }
    }

    if (req.query.categories) {
      filteredExpenses = filteredExpenses.filter(
        (e) => e.category === req.query.categories,
      );
    }

    res.json(filteredExpenses);
  });

  app.get('/expenses/:id', (req, res) => {
    const expense = expenses.find((e) => e.id === Number(req.params.id));
    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }
    res.json(expense);
  });

  app.post(
    '/expenses',
    checkRequiredFields(['title', 'amount', 'spentAt']),
    validateAmount,
    validateDate,
    checkUserExists,
    (req, res) => {
      const { title, amount, spentAt, category, note, userId } = req.body;
      const newExpense = {
        id: ++expenseIdCounter,
        title,
        amount: parseFloat(amount),
        spentAt: new Date(spentAt).toISOString(),
        category,
        note,
        userId: userId ? Number(userId) : undefined,
      };

      expenses.push(newExpense);
      res.status(201).json(newExpense);
    },
  );

  app.patch(
    '/expenses/:id',
    validateAmount,
    validateDate,
    checkUserExists,
    (req, res) => {
      const expenseIndex = expenses.findIndex(
        (e) => e.id === Number(req.params.id),
      );

      if (expenseIndex === -1) {
        return res.status(404).json({ error: 'Expense not found' });
      }

      const updatedExpense = {
        ...expenses[expenseIndex],
        ...(req.body.title && { title: req.body.title }),
        ...(req.body.amount && { amount: parseFloat(req.body.amount) }),
        ...(req.body.spentAt && { spentAt: new Date(req.body.spentAt).toISOString() }),
        ...(req.body.category && { category: req.body.category }),
        ...(req.body.note && { note: req.body.note }),
        ...(req.body.userId && { userId: Number(req.body.userId) }),
      };

      expenses[expenseIndex] = updatedExpense;
      res.json(updatedExpense);
    },
  );

  app.delete('/expenses/:id', (req, res) => {
    const expenseIndex = expenses.findIndex(
      (e) => e.id === Number(req.params.id),
    );
    if (expenseIndex === -1) {
      return res.status(404).json({ error: 'Expense not found' });
    }
    expenses.splice(expenseIndex, 1);
    res.status(204).send();
  });

  // User Routes
  app.get('/users', (req, res) => {
    res.json(users);
  });

  app.get('/users/:id', (req, res) => {
    const user = users.find((u) => u.id === Number(req.params.id));
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  });

  app.post('/users', checkRequiredFields(['name']), (req, res) => {
    const newUser = {
      id: ++userIdCounter,
      name: req.body.name,
    };
    users.push(newUser);
    res.status(201).json(newUser);
  });

  app.patch('/users/:id', (req, res) => {
    const userIndex = users.findIndex((u) => u.id === Number(req.params.id));
    if (userIndex === -1) {
      return res.status(404).json({ error: 'User not found' });
    }
    if (!req.body.name) {
      return res.status(400).json({ error: 'Name is required' });
    }
    users[userIndex].name = req.body.name;
    res.json(users[userIndex]);
  });

  app.delete('/users/:id', (req, res) => {
    const userIndex = users.findIndex((u) => u.id === Number(req.params.id));
    if (userIndex === -1) {
      return res.status(404).json({ error: 'User not found' });
    }
    users.splice(userIndex, 1);
    res.status(204).send();
  });

  return app;
}

module.exports = {
  createServer,
};
