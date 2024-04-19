'use strict';

// const { v4: uuidv4 } = require('uuid');
const express = require('express');

const app = express();

let users = [];
let expenses = [];

function generateId() {
  const time = new Date().getTime();

  return time;
}

function findUser(id) {
  return users.find((user) => user.id === id);
}

function filterUsers(id) {
  return users.filter((user) => user.id !== id);
}

function findExpense(id) {
  return expenses.find((exp) => exp.id === id);
}

function filterExpenses(id) {
  return expenses.filter((exp) => exp.id !== id);
}

function createServer() {
  // -users-----------------------

  app.get('/users', (req, res) => {
    res.sendStatus(200).send(users);
  });

  app.get('/users/:id', (req, res) => {
    const { id } = req.params;
    const user = findUser(id);

    if (!user) {
      res.sendStatus(404);

      return;
    }

    res.sendStatus(200).send(user);
  });

  app.post('/users', express.json(), (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    const user = {
      name,
      id: generateId(),
    };

    users.push(user);

    res.sendStatus(201).send(user);
  });

  app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    const user = findUser(id);
    const newUsers = filterUsers(id);

    if (!user) {
      res.sendStatus(404);

      return;
    }

    users = newUsers;

    res.sendStatus(204);
  });

  app.patch('/users/:id', express.json(), (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const user = findUser(id);

    if (!user) {
      res.sendStatus(404);

      return;
    }

    Object.assign(user, { name });

    res.sendStatus(204).send(user);
  });

  // -expenses-----------------------

  app.get('/expenses', express.json(), (req, res) => {
    const { userId, categories, from, to } = req.query;

    let filteredExpenses = expenses;

    if (userId) {
      filteredExpenses = filteredExpenses.filter(
        (expense) => expense.userId === userId,
      );
    }

    if (categories) {
      filteredExpenses = filteredExpenses.filter(
        (expense) => expense.category === categories,
      );
    }

    if (from || to) {
      filteredExpenses = filteredExpenses.filter((expense) => {
        if (from && to) {
          return expense.spentAt >= from && expense.spentAt <= to;
        } else if (from) {
          return expense.spentAt >= from;
        } else {
          return expense.spentAt <= to;
        }
      });
    }

    res.sendStatus(200).send(filteredExpenses);
  });

  app.get('/expenses/:id', (req, res) => {
    const { id } = req.params;
    const expense = findExpense(id);

    if (!expense) {
      res.sendStatus(404);

      return;
    }

    res.sendStatus(200).send(expense);
  });

  app.post('/expenses', express.json(), (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    const user = findUser(userId);

    if (!user) {
      res.sendStatus(400);

      return;
    }

    const expense = {
      id: generateId(),
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    };

    expenses.push(expense);

    res.sendStatus(201).send(expense);
  });

  app.delete('/expenses/:id', (req, res) => {
    const { id } = req.params;
    const expense = findExpense(id);
    const newExpenses = filterExpenses(id);

    if (!expense) {
      res.sendStatus(404);

      return;
    }

    expenses = newExpenses;

    res.sendStatus(204);
  });

  app.patch('/expenses/:id', express.json(), (req, res) => {
    const { spentAt, title, amount, category, note } = req.body;
    const { id } = req.params;

    const expense = findExpense(id);

    if (!expense) {
      res.sendStatus(404);

      return;
    }

    Object.assign(expense, {
      spentAt,
      title,
      amount,
      category,
      note,
    });

    res.sendStatus(204).send(expense);
  });

  return app;
}

module.exports = {
  createServer,
};
