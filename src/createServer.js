'use strict';

const express = require('express');

function createServer() {
  const app = express();

  app.use(express.json());

  const db = {
    users: [],
    expenses: [],
  };

  app.get('/users', (req, res) => {
    res.json(db.users);
  });

  app.post('/users', (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.status(400).send('Name is required');
    }

    const newUser = {
      id: db.users.length + 1,
      name: name,
    };

    db.users.push(newUser);
    res.status(201).json(newUser);
  });

  app.delete('/users/:id', (req, res) => {
    const userId = +req.params.id;
    const userIndex = db.users.findIndex((u) => u.id === userId);

    if (userIndex === -1) {
      return res.status(404).send('User not found');
    }

    db.users.splice(userIndex, 1);

    return res.sendStatus(204);
  });

  app.patch('/users/:id', (req, res) => {
    const userId = +req.params.id;
    const userIndex = db.users.findIndex((u) => u.id === userId);

    if (userIndex === -1) {
      return res.status(404).send('User not found');
    }

    if (!req.body.name) {
      return res.status(400).send('Name is required');
    }

    db.users[userIndex].name = req.body.name;

    return res.status(200).json(db.users[userIndex]);
  });

  app.get('/users/:id', (req, res) => {
    const userId = +req.params.id;
    const user = db.users.find((u) => u.id === userId);

    if (!user) {
      return res.status(404).send('User not found');
    }

    return res.status(200).json(user);
  });

  app.get('/expenses', (req, res) => {
    const { userId, category, from, to } = req.query;
    let filteredExpenses = [...db.expenses];

    if (userId) {
      filteredExpenses = filteredExpenses.filter((e) => e.userId === +userId);
    }

    if (category) {
      filteredExpenses = filteredExpenses.filter(
        (c) => c.category === category,
      );
    }

    if (from) {
      filteredExpenses = filteredExpenses.filter((e) => {
        const expenseDate = new Date(e.spentAt);
        const filterFrom = new Date(from);

        return expenseDate >= filterFrom;
      });
    }

    if (to) {
      filteredExpenses = filteredExpenses.filter((e) => {
        const expenseDate = new Date(e.spentAt);
        const filterTo = new Date(to);

        return expenseDate <= filterTo;
      });
    }

    return res.status(200).json(filteredExpenses);
  });

  app.post('/expenses', (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (!userId) {
      return res.status(400).send('UserId is required');
    }

    if (!spentAt) {
      return res.status(400).send('SpentAt is required');
    }

    if (!title) {
      return res.status(400).send('Title is required');
    }

    if (!amount) {
      return res.status(400).send('Amount is required');
    }

    if (!category) {
      return res.status(400).send('Category is required');
    }

    const userExists = db.users.find((u) => u.id === userId);

    if (!userExists) {
      return res.status(400).send('User not found');
    }

    const newExpenses = {
      id: db.expenses.length + 1,
      spentAt: spentAt,
      title: title,
      amount: amount,
      category: category,
      userId: userId,
      note: note,
    };

    db.expenses.push(newExpenses);
    res.status(201).json(newExpenses);
  });

  app.delete('/expenses/:id', (req, res) => {
    const expensesId = +req.params.id;
    const expensesIndex = db.expenses.findIndex((e) => e.id === expensesId);

    if (expensesIndex === -1) {
      return res.status(404).send('Expenses not found');
    }

    db.expenses.splice(expensesIndex, 1);

    return res.sendStatus(204);
  });

  app.patch('/expenses/:id', (req, res) => {
    const expensesId = +req.params.id;
    const expensesIndex = db.expenses.findIndex((e) => e.id === expensesId);

    if (expensesIndex === -1) {
      return res.status(404).send('Expenses not found');
    }

    if (!req.body.title) {
      return res.status(400).send('Title is required');
    }

    db.expenses[expensesIndex].title = req.body.title;

    return res.status(200).json(db.expenses[expensesIndex]);
  });

  app.get('/expenses/:id', (req, res) => {
    const expensesId = +req.params.id;
    const expense = db.expenses.find((e) => e.id === expensesId);

    if (!expense) {
      return res.status(404).send('Expense not found');
    }

    return res.status(200).json(expense);
  });

  return app;
}

module.exports = {
  createServer,
};
