'use strict';

const express = require('express');

function createServer() {
  const app = express();

  let users = [];

  app.get('/users', (req, res) => {
    res.statusCode = 200;
    res.send(users);
  });

  app.post('/users', express.json(), (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    const userIds = users.map(us => us.id);
    const maxId = Math.max(userIds);

    const user = {
      name,
      id: maxId + 1,
    };

    users.push(user);

    res.statusCode = 201;
    res.send(user);
  });

  app.get('/users/:id', (req, res) => {
    const { id } = req.params;

    const searchedUser = users.find(user => user.id === +id);

    if (!searchedUser) {
      res.sendStatus(404);

      return;
    }

    res.statusCode = 200;
    res.send(searchedUser);
  });

  app.delete('/users/:id', (req, res) => {
    const { id } = req.params;

    const newUsers = users.filter(user => user.id !== +id);

    if (newUsers.length === users.length) {
      res.sendStatus(404);

      return;
    }

    users = newUsers;

    res.sendStatus(204);
  });

  app.patch('/users/:id', express.json(), (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    const user = users.find(us => us.id === +id);

    if (!user) {
      res.sendStatus(404);

      return;
    }

    Object.assign(user, { name });

    res.statusCode = 200;
    res.send(user);
  });

  let expenses = [];

  app.get('/expenses', (req, res) => {
    const { userId, categories, from, to } = req.query;
    let filteredExpenses = expenses;

    if (userId) {
      filteredExpenses = expenses.filter((exp) => exp.userId === +userId);
    }

    if (categories) {
      filteredExpenses = expenses.filter((exp) =>
        categories.includes(exp.category)
      );
    }

    if (from) {
      const fromDate = new Date(from);

      filteredExpenses = expenses.filter((exp) => {
        const expenseDate = new Date(exp.spentAt);

        return fromDate <= expenseDate;
      });
    }

    if (to) {
      const toDate = new Date(to);

      filteredExpenses = expenses.filter((exp) => {
        const expenseDate = new Date(exp.spentAt);

        return expenseDate <= toDate;
      });
    }

    res.statusCode = 200;
    res.send(filteredExpenses);
  });

  app.post('/expenses', express.json(), (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (!users.find(us => us.id === +userId)) {
      res.sendStatus(400);

      return;
    }

    const expenseIds = expenses.map(exp => exp.id);
    const maxExpenseId = Math.max(expenseIds);

    const expense = {
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
      id: maxExpenseId + 1,
    };

    expenses.push(expense);

    res.statusCode = 201;
    res.send(expense);
  });

  app.get('/expenses/:id', (req, res) => {
    const { id } = req.params;

    const searchedExpense = expenses.find(exp => exp.id === +id);

    if (!searchedExpense) {
      res.sendStatus(404);

      return;
    }

    res.statusCode = 200;
    res.send(searchedExpense);
  });

  app.delete('/expenses/:id', (req, res) => {
    const { id } = req.params;

    const newExpenses = expenses.filter(exp => exp.id !== +id);

    if (newExpenses.length === expenses.length) {
      res.sendStatus(404);

      return;
    }

    expenses = newExpenses;

    res.sendStatus(204);
  });

  app.patch('/expenses/:id', express.json(), (req, res) => {
    const { id } = req.params;
    const { userId, spentAt, title, amount, category, note } = req.body;

    const expense = expenses.find(exp => exp.id === +id);

    if (!expense) {
      res.sendStatus(404);

      return;
    }

    Object.assign(expense, {
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    });

    res.statusCode = 200;
    res.send(expense);
  });

  return app;
  // Use express to create a server
  // Add a routes to the server
  // Return the server (express app)
}

module.exports = {
  createServer,
};
