'use strict';

const express = require('express');

function getById(arr, targetId) {
  return arr.find((el) => el.id === targetId);
}

function getIndexById(arr, targetId) {
  return arr.findIndex((el) => el.id === targetId);
}

function createServer() {
  const users = [];
  const expenses = [];

  const server = express();

  server.get('/users', (_, res) => {
    res.send(users);
  });

  server.get('/users/:userId', (req, res) => {
    const { userId } = req.params;

    const targetUser = getById(users, +userId);

    if (!targetUser) {
      res.sendStatus(404);

      return;
    }

    res.statusCode = 200;
    res.send(targetUser);
  });

  server.post('/users', express.json(), (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    const newUser = {
      name,
      id: Math.max(0, ...users.map((user) => user.id)) + 1,
    };

    users.push(newUser);

    res.statusCode = 201;
    res.send(newUser);
  });

  server.delete('/users/:userId', (req, res) => {
    const { userId } = req.params;

    const targetUserIndex = getIndexById(users, +userId);

    if (targetUserIndex === -1) {
      res.sendStatus(404);

      return;
    }

    users.splice(targetUserIndex, 1);

    res.sendStatus(204);
  });

  server.patch('/users/:userId', express.json(), (req, res) => {
    const { userId } = req.params;

    const targetUserIndex = getIndexById(users, +userId);

    if (targetUserIndex === -1) {
      res.sendStatus(404);

      return;
    }

    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    users.splice(targetUserIndex, 1, { ...users[targetUserIndex], name });

    res.send(users[targetUserIndex]);
  });

  server.post('/expenses', express.json(), (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (
      !userId ||
      !spentAt ||
      !title ||
      !amount ||
      !category ||
      !note ||
      !getById(users, +userId)
    ) {
      res.sendStatus(400);

      return;
    }

    const newExpense = {
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
      id: Math.max(0, ...expenses.map((expense) => expense.id)) + 1,
    };

    expenses.push(newExpense);

    res.statusCode = 201;
    res.send(newExpense);
  });

  server.get('/expenses', (req, res) => {
    const { userId, categories, to, from } = req.query;

    const filteredExpenses = expenses.filter((expense) => {
      const userIdTest = !userId ? true : expense.userId === +userId;
      const categoriesTest = !categories
        ? true
        : expense.category.toLowerCase() === categories.toLowerCase();

      const dateToTest = !to
        ? true
        : new Date(expense.spentAt).getTime() <= new Date(to).getTime();
      const dateFromTest = !from
        ? true
        : new Date(expense.spentAt).getTime() >= new Date(from).getTime();

      return userIdTest && categoriesTest && dateToTest && dateFromTest;
    });

    res.send(filteredExpenses);
  });

  server.get('/expenses/:expenseId', (req, res) => {
    const { expenseId } = req.params;

    const targetExpense = getById(expenses, +expenseId);

    if (!targetExpense) {
      res.sendStatus(404);

      return;
    }

    res.statusCode = 200;
    res.send(targetExpense);
  });

  server.delete('/expenses/:expenseId', (req, res) => {
    const { expenseId } = req.params;

    const targetExpenseIndex = getIndexById(expenses, +expenseId);

    if (targetExpenseIndex === -1) {
      res.sendStatus(404);

      return;
    }

    expenses.splice(targetExpenseIndex, 1);

    res.sendStatus(204);
  });

  server.patch('/expenses/:expenseId', express.json(), (req, res) => {
    const { expenseId } = req.params;

    const targetExpenseIndex = getIndexById(expenses, +expenseId);

    if (targetExpenseIndex === -1) {
      res.sendStatus(404);

      return;
    }

    const newExpense = { ...expenses[targetExpenseIndex] };

    for (const key in req.body) {
      if (['spentAt', 'title', 'amount', 'category', 'note'].includes(key)) {
        newExpense[key] = req.body[key];
      } else if (key === 'userId' && !!getById(users, req.body[key])) {
        newExpense[key] = req.body[key];
      } else if (key === 'id' && !!getById(expenses, req.body[key])) {
        newExpense[key] = req.body[key];
      }
    }

    expenses.splice(targetExpenseIndex, 1, newExpense);

    res.send(expenses[targetExpenseIndex]);
  });

  return server;
}

module.exports = {
  createServer,
};
