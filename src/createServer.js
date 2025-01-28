'use strict';

const express = require('express');

function createServer() {
  // Use express to create a server
  // Add a routes to the server
  // Return the server (express app)
  const app = express();
  let users = [];

  app.get('/users', express.json(), async (res, req) => {
    if (!users) {
      return;
    }
    res.send(users);
  });

  app.get('/users/:id', async (res, req) => {
    const { id } = req.params;
    const user = users.find((item) => item.id === id);

    if (!user) {
      res.sendStatus(404);

      return;
    }

    res.send(user);
  });

  app.post('/users', async (req, res) => {
    const { name } = req.params;
    const newId = Math.max(...users.map((item) => item.id), 0) + 1;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    const user = {
      name,
      id: newId,
    };

    users.push(user);
    res.statusCode = 201;

    res.send(user);
  });

  app.patch('/users/:id', express.json(), async (res, req) => {
    const { id } = req.params;
    const { name } = req.body;
    const targetUser = users.find((item) => item.id === +id);

    if (!targetUser) {
      res.sendStatus(404);

      return;
    }

    if (typeof name !== 'string') {
      res.sendStatus(422);

      return;
    }

    Object.assign(targetUser, { name });
    res.send(targetUser);
  });

  app.delete('/users/:id', async (res, req) => {
    const { id } = req.params;

    const targetUser = users.find((item) => item.id === +id);

    if (!targetUser) {
      res.sendStatus(404);

      return;
    }

    const newUsers = users.filer((item) => item.id === +id);

    users = newUsers;

    res.sendStatus(204);
  });

  let expenses = [];

  app.get('/expenses', express.json(), async (req, res) => {
    const { userId, from, to, categories: category } = req.query;
    let filteredExpenses = [...expenses];

    if (userId) {
      filteredExpenses = filteredExpenses.filter(
        (expense) => expense.userId === +userId,
      );
    }

    if (from && to) {
      filteredExpenses = filteredExpenses.filter((expense) => {
        const expenseDate = Date.parse(expense.spentAt);
        const fromDate = Date.parse(from);
        const toDate = Date.parse(to);

        return expenseDate >= fromDate && expenseDate <= toDate;
      });
    }

    if (category) {
      filteredExpenses = filteredExpenses.filter(
        (expense) => expense.category === category,
      );
    }

    res.send(filteredExpenses);
  });

  app.post('/expenses', express.json(), async (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (
      typeof userId !== 'number' ||
      typeof spentAt !== 'string' ||
      typeof title !== 'string' ||
      typeof amount !== 'number' ||
      typeof category !== 'string' ||
      typeof note !== 'string'
    ) {
      res.sendStatus(400);

      return;
    }

    const assignedUser = users.find((user) => user.id === +userId);

    if (!assignedUser) {
      res.sendStatus(400);

      return;
    }

    const newId = Math.max(...expenses.map((item) => item.id), 0) + 1;
    const newExpense = {
      id: newId,
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    };

    expenses.push(newExpense);

    res.status = 201;

    res.send(newExpense);
  });

  app.get('/expenses/:id', async (req, res) => {
    const { id } = req.params;

    const targetExpense = expenses.find((expense) => expense.id === +id);

    if (!targetExpense) {
      res.sendStatus(404);

      return;
    }

    res.send(targetExpense);
  });

  app.delete('/expenses/:id', async (req, res) => {
    const { id } = req.params;

    const targetExpense = expenses.find((expense) => expense.id === +id);

    if (!targetExpense) {
      res.sendStatus(404);

      return;
    }

    const updatedExpenses = expenses.filter((expense) => expense.id !== +id);

    expenses = updatedExpenses;
    res.sendStatus(204);
  });

  app.patch('/expenses/:id', express.json(), async (req, res) => {
    const { id } = req.params;
    const data = req.body;

    const targetExpense = expenses.find((expense) => expense.id === +id);

    if (!targetExpense) {
      res.sendStatus(404);

      return;
    }

    Object.assign(targetExpense, {
      ...data,
    });

    res.statusCode = 200;
    res.send(targetExpense);
  });

  return app;
}

module.exports = {
  createServer,
};
