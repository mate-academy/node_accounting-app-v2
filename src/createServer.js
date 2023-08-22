'use strict';

const express = require('express');

function createServer() {
  const app = express();
  const users = [];
  const expenses = [];

  app.use(express.json());

  const findUser = (userId) => {
    return users.find(user => user.id === +userId);
  };

  const findExpense = (expenseId) => {
    return expenses.find(expense => expense.id === +expenseId);
  };

  app.get('/users', (req, res) => {
    res.json(users);
  });

  app.post('/users', (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.status(400).send('Name is required');
    }

    const id = users.length + 1;
    const newUser = {
      id, name,
    };

    users.push(newUser);

    res.status(201).json(newUser);
  });

  app.get('/users/:userId', (req, res) => {
    const { userId } = req.params;
    const user = findUser(userId);

    if (!user) {
      return res.sendStatus(404);
    }

    res.json(user);
  });

  app.delete('/users/:userId', (req, res) => {
    const { userId } = req.params;
    const userIndex = users.findIndex(user => user.id === +userId);

    if (userIndex === -1) {
      return res.sendStatus(404);
    }

    users.splice(userIndex, 1);
    res.sendStatus(204);
  });

  app.patch('/users/:userId', (req, res) => {
    const { userId } = req.params;
    const { name } = req.body;
    const user = findUser(userId);

    if (!name || !user) {
      return res.sendStatus(404);
    }

    user.name = name;
    res.json(user);
  });

  app.get('/expenses', (req, res) => {
    const { userId, categories, from, to } = req.query;

    let filteredExpenses = expenses;

    if (userId) {
      filteredExpenses = filteredExpenses.filter(expense =>
        expense.userId === +userId
      );
    }

    if (categories) {
      filteredExpenses = filteredExpenses.filter(expense =>
        categories.includes(expense.category)
      );
    }

    if (from) {
      const dateFrom = new Date(from);

      filteredExpenses = filteredExpenses.filter(expense => {
        const expenseDate = new Date(expense.spentAt);

        return expenseDate >= dateFrom;
      });
    }

    if (to) {
      const dateTo = new Date(to);

      filteredExpenses = filteredExpenses.filter(expense => {
        const expenseDate = new Date(expense.spentAt);

        return expenseDate <= dateTo;
      });
    }

    res.json(filteredExpenses);
  });

  app.post('/expenses', (req, res) => {
    const newExpense = req.body;
    const user = findUser(newExpense.userId);

    if (!user) {
      return res.status(400).send('User not found');
    }

    const id = expenses.length + 1;
    const expense = {
      ...newExpense, id,
    };

    expenses.push(expense);

    res.status(201).json(expense);
  });

  app.get('/expenses/:expenseId', (req, res) => {
    const { expenseId } = req.params;
    const expense = findExpense(expenseId);

    if (!expense) {
      return res.sendStatus(404);
    }

    res.json(expense);
  });

  app.delete('/expenses/:expenseId', (req, res) => {
    const { expenseId } = req.params;
    const expenseIndex = expenses
      .findIndex(expense => expense.id === +expenseId);

    if (expenseIndex === -1) {
      return res.sendStatus(404);
    }

    expenses.splice(expenseIndex, 1);
    res.sendStatus(204);
  });

  app.patch('/expenses/:expenseId', (req, res) => {
    const { expenseId } = req.params;
    const expense = findExpense(expenseId);

    if (!expense) {
      return res.sendStatus(404);
    }

    for (const key in req.body) {
      if (key !== 'id') {
        expense[key] = req.body[key];
      }
    }

    res.json(expense);
  });

  return app;
}

module.exports = {
  createServer,
};
