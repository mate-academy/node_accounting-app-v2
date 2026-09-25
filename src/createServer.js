'use strict';

const express = require('express');

function createServer() {
  const app = express();

  app.use(express.json());

  const users = [];
  const expenses = [];

  app.get('/users', (req, res) => {
    res.json(users);
  });

  app.get('/users/:id', (req, res) => {
    const id = req.params.id;
    const user = users.find((userId) => userId.id === Number(id));

    if (!user) {
      res.status(404);
      res.end();
    } else {
      res.status(200);
      res.json(user);
    }
  });

  app.post('/users', (req, res) => {
    const newUser = req.body;

    if (!req.body.name) {
      res.status(400);
      res.end();
    } else {
      const id = users.length + 1;
      const user = {
        id,
        ...newUser,
      };

      users.push(user);
      res.status(201);
      res.json(user);
    }
  });

  app.patch('/users/:id', (req, res) => {
    const id = req.params.id;
    const user = users.find((userId) => userId.id === Number(id));

    if (!user) {
      res.status(404);
      res.end();
    } else {
      const newName = {
        ...user,
        ...req.body,
      };
      const position = users.findIndex(
        (positionId) => positionId === Number(req.params.id),
      );

      users[position] = newName;
      res.status(200);
      res.json(newName);
    }
  });

  app.delete('/users/:id', (req, res) => {
    const id = req.params.id;
    const user = users.find((userId) => userId.id === Number(id));

    if (!user) {
      res.status(404);
      res.end();
    } else {
      const position = users.findIndex(
        (positionId) => positionId === Number(req.params.id),
      );

      users.splice(position, 1);
      res.status(204).end();
    }
  });

  app.post('/expenses', (req, res) => {
    const expense = req.body;

    const usersId = users.find((user) => user.id === Number(expense.userId));

    if (!usersId) {
      res.status(400);
      res.end();
    } else if (!expense.title) {
      res.status(400);
      res.end();
    } else {
      const id = expenses.length + 1;
      const expensesId = {
        id,
        ...expense,
      };

      expenses.push(expensesId);
      res.status(201);
      res.json(expensesId);
    }
  });

  app.get('/expenses', (req, res) => {
    if (req.query.userId) {
      const expensesId = expenses.filter(
        (expenseId) => expenseId.userId === Number(req.query.userId),
      );

      if (req.query.categories) {
        const expansesCategory = expensesId.filter(
          (expenseId) => expenseId.category === req.query.categories,
        );

        res.json(expansesCategory);
      } else {
        res.json(expensesId);
      }
    } else if (req.query.from && req.query.to) {
      const spentAtFrom = req.query.from;
      const spentAtTo = req.query.to;
      const expensesFromAndTo = expenses.filter((expenseFromTo) => {
        const spentAt = new Date(expenseFromTo.spentAt);

        return (
          spentAt >= new Date(spentAtFrom) && spentAt <= new Date(spentAtTo)
        );
      });

      res.json(expensesFromAndTo);
    } else {
      res.json(expenses);
    }
  });

  app.get('/expenses/:id', (req, res) => {
    const id = req.params.id;
    const expense = expenses.find((expenseId) => expenseId.id === Number(id));

    if (!expense) {
      res.status(404);
      res.end();
    } else {
      res.status(200);
      res.json(expense);
    }
  });

  app.patch('/expenses/:id', (req, res) => {
    const id = req.params.id;
    const expense = expenses.find((expenseId) => expenseId.id === Number(id));

    if (!expense) {
      res.status(404);
      res.end();
    } else {
      const newExpense = {
        ...expense,
        ...req.body,
      };
      const position = expenses.findIndex(
        (positionId) => positionId.id === Number(req.params.id),
      );

      expenses[position] = newExpense;
      res.status(200);
      res.json(newExpense);
    }
  });

  app.delete('/expenses/:id', (req, res) => {
    const id = req.params.id;
    const expense = expenses.find((expenseId) => expenseId.id === Number(id));

    if (!expense) {
      res.status(404);
      res.end();
    } else {
      const position = expenses.findIndex(
        (positionId) => positionId.id === Number(req.params.id),
      );

      expenses.splice(position, 1);
      res.status(204).end();
    }
  });

  return app;
}

module.exports = {
  createServer,
};
