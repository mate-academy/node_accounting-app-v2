'use strict';

const express = require('express');

function createServer() {
  // Use express to create a server
  // Add a routes to the server
  // Return the server (express app)
  const router = express.Router();
  const app = express();

  let users = [];
  let expenses = [];

  app.get('/users', (req, res) => res.send(users));

  app.get('/users/:userId', (req, res) => {
    const { userId } = req.params;

    if (isNaN(+userId)) {
      res.sendStatus(400);

      return;
    }

    const foundUser = users.find(user => user.id === +userId);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    res.send(foundUser);
  });

  app.post('/users', express.json(), (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const { name } = req.body;

    if (!name || !name.trim().length || typeof name !== 'string') {
      res.sendStatus(400);

      return;
    }

    const newUser = {
      id: users.length,
      name: name.trim(),
    };

    users.push(newUser);

    res.statusCode = 201;
    res.send(newUser);
  });

  app.delete('/users/:userId', express.json(), (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const { userId } = req.params;

    if (isNaN(+userId)) {
      res.sendStatus(400);

      return;
    }

    const foundUser = users.find(user => user.id === +userId);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    users = users.filter(user => user.id !== foundUser.id);
    res.sendStatus(204);
  });

  app.patch('/users/:userId', express.json(), (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const { userId } = req.params;

    if (isNaN(+userId)) {
      res.sendStatus(400);

      return;
    }

    const foundUser = users.find(user => user.id === +userId);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    const { name } = req.body;

    if (!name || !name.trim().length || typeof name !== 'string') {
      res.sendStatus(400);

      return;
    }

    users = users.map(user => user.id === foundUser.id
      ? {
        ...user,
        name,
      } : user
    );

    res.statusCode = 200;
    res.send(users.find(user => user.id === +userId));
  });

  app.get('/expenses', (req, res) => {
    const {
      userId,
      category,
      from,
      to,
    } = req.query;

    if (!userId && !category && !from && !to) {
      res.send(expenses);

      return;
    }

    if (userId.length > 0) {
      const foundedUser = users.find(user => user.id === +userId);
      const foundedExpenses = expenses.find(expense => (
        expense.userId === foundedUser.id
      ));

      res.statusCode = 200;
      res.send([foundedExpenses]);

      return;
    }

    if (category.length > 0) {
      res.sendStatus(200);
    }

    if (from.length > 0 && to.length > 0) {
      res.sendStatus(200);
    }

    res.sendStatus(400);
  });

  app.get('/expenses/:expenseId', (req, res) => {
    const { expenseId } = req.params;

    if (isNaN(+expenseId)) {
      res.sendStatus(400);

      return;
    }

    const foundexpense = expenses.find(expense => expense.id === +expenseId);

    if (!foundexpense) {
      res.sendStatus(404);

      return;
    }

    res.send(foundexpense);
  });

  app.post('/expenses', express.json(), (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    if (!req.body) {
      res.sendStatus(400);

      return;
    }

    const {
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    } = req.body;

    const foundUser = users.find(user => user.id === +userId);

    if (!foundUser) {
      res.sendStatus(400);

      return;
    }

    const newExpense = {
      id: expenses.length,
      userId: +userId,
      spentAt,
      title,
      amount: +amount,
      category,
      note,
    };

    expenses.push(newExpense);

    res.statusCode = 201;
    res.send(newExpense);
  });

  app.patch('/expenses/:expenseId', express.json(), (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const { expenseId } = req.params;

    if (isNaN(+expenseId)) {
      res.sendStatus(400);

      return;
    }

    const foundExpense = expenses.find(expense => expense.id === +expenseId);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    if (!req.body) {
      res.sendStatus(400);

      return;
    }

    const { title } = req.body;

    const newExpense = {
      ...foundExpense,
      title,
    };

    expenses = expenses.map(expense => expense.id === foundExpense.id
      ? newExpense
      : expense);

    res.statusCode = 200;
    res.send(newExpense);
  });

  app.delete('/expenses/:expenseId', express.json(), (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const { expenseId } = req.params;

    if (isNaN(+expenseId)) {
      res.sendStatus(400);

      return;
    }

    const foundExpense = expenses.find(expense => expense.id === +expenseId);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    expenses = expenses.filter(expense => expense.id !== foundExpense.id);
    res.sendStatus(204);
  });

  return app;
}

module.exports = {
  createServer,
};
