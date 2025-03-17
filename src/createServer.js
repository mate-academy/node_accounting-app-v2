'use strict';

const express = require('express');

function createServer() {
  // Use express to create a server
  // Add a routes to the server
  // Return the server (express app)
  const app = express();

  app.use(express.json());

  const users = [];

  app.get('/users', async (req, res) => {
    res.send(users);
  });

  app.get('/users/:id', async (req, res) => {
    const { id } = req.params;
    const user = users.find((targetUser) => targetUser.id === +id);

    if (!user) {
      res.sendStatus(404);

      return;
    }

    res.send(user);
  });

  app.post('/users', async (req, res) => {
    const { name } = req.body;
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

  app.delete('/users/:id', async (req, res) => {
    const { id } = req.params;

    const index = users.findIndex((user) => user.id === +id);

    if (index === -1) {
      res.sendStatus(404);

      return;
    }

    users.splice(index, 1);

    res.sendStatus(204);
  });

  app.patch('/users/:id', async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    const targetUser = users.find((user) => user.id === +id);

    if (!targetUser) {
      res.sendStatus(404);

      return;
    }

    if (typeof name !== 'string') {
      res.sendStatus(400);

      return;
    }

    targetUser.name = name;

    res.send(targetUser);
  });

  const expenses = [];

  app.get('/expenses', async (req, res) => {
    const {
      userId,
      from: fromDate,
      to: toDate,
      categories: category,
    } = req.query;
    let filteredExpenses = [...expenses];

    if (userId) {
      filteredExpenses = filteredExpenses.filter(
        (expense) => expense.userId === +userId,
      );
    }

    if (fromDate && toDate) {
      filteredExpenses = filteredExpenses.filter((expense) => {
        const expenseDate = Date.parse(expense.spentAt);
        const parsedFromDate = Date.parse(fromDate);
        const parsedToDate = Date.parse(toDate);

        return expenseDate >= parsedFromDate && expenseDate <= parsedToDate;
      });
    }

    if (category) {
      filteredExpenses = filteredExpenses.filter(
        (expense) => expense.category === category,
      );
    }

    res.send(filteredExpenses);
  });

  app.post('/expenses', async (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (
      typeof userId !== 'number' ||
      isNaN(userId) ||
      typeof spentAt !== 'string' ||
      !spentAt.trim() ||
      typeof title !== 'string' ||
      !title.trim() ||
      typeof amount !== 'number' ||
      isNaN(amount) ||
      typeof category !== 'string' ||
      !category.trim() ||
      typeof note !== 'string' ||
      !note.trim()
    ) {
      return res.sendStatus(400);
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

    res.statusCode = 201;
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

    const index = expenses.findIndex((expense) => expense.id === +id);

    if (index === -1) {
      res.sendStatus(404);

      return;
    }

    expenses.splice(index, 1);

    res.sendStatus(204);
  });

  app.patch('/expenses/:id', async (req, res) => {
    const { id } = req.params;
    const data = req.body;

    if (
      (data.userId && typeof data.userId !== 'number') ||
      (data.spentAt && typeof data.spentAt !== 'string') ||
      (data.title && typeof data.title !== 'string') ||
      (data.amount && typeof data.amount !== 'number') ||
      (data.category && typeof data.category !== 'string') ||
      (data.note && typeof data.note !== 'string')
    ) {
      return res.status(400);
    }

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
