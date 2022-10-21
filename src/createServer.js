'use strict';

const express = require('express');
// const cors = require('cors');

function createServer() {
  const app = express();

  let nextUserId = 1;
  let nextExpenseId = 1;

  let users = [
    // {
    //   id: 1,
    //   name: 'string',
    // },
  ];

  let expenses = [];

  app.get('/users', (req, res) => {
    res.send(users);
  });

  app.get('/users/:userId', (req, res) => {
    const { userId } = req.params;

    if (isNaN(+userId)) {
      res.sendStatus(400);

      return;
    }

    const foundUser = users.find(({ id }) => +userId === id);

    foundUser ? res.send(foundUser) : res.sendStatus(404);
  });

  app.post('/users', express.json(), (req, res) => {
    const { name } = req.body;

    if (!name || typeof name !== 'string') {
      res.sendStatus(400);

      return;
    }

    // const newId = Math.max(0, ...users.map(({ id }) => id)) + 1;
    const newUser = {
      id: nextUserId++,
      name,
    };

    users.push(newUser);

    res.statusCode = 201;
    res.send(newUser);
  });

  app.delete('/users/:userId', (req, res) => {
    const { userId } = req.params;
    const filteredUsers = users.filter(({ id }) => +userId !== id);
    const isUserFound = users.length !== filteredUsers.length;

    users = filteredUsers;

    res.sendStatus(isUserFound ? 204 : 404);
  });

  app.patch('/users/:userId', express.json(), (req, res) => {
    const { userId } = req.params;
    const { name } = req.body;

    if (isNaN(+userId) || !name || typeof name !== 'string') {
      res.sendStatus(400);

      return;
    }

    const foundUser = users.find(({ id }) => +userId === id);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    Object.assign(foundUser, { name });

    res.send(foundUser);
  });

  app.post('/expenses', express.json(), (req, res) => {
    const {
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    } = req.body;

    if (
      isNaN(+userId)
      || !users.some(user => user.id === userId)
      || isNaN(+userId)
      || isNaN(Date.parse(spentAt))
      || typeof title !== 'string'
      || isNaN(+amount)
      || typeof category !== 'string'
      || typeof note !== 'string'
    ) {
      res.sendStatus(400);

      return;
    };

    // const newId = Math.max(0, ...expenses.map(({ id }) => id)) + 1;
    const newExpenses = {
      id: nextExpenseId++,
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    };

    expenses.push(newExpenses);
    res.statusCode = 201;
    res.send(newExpenses);
  });

  app.get('/expenses', express.json(), (req, res) => {
    const {
      userId,
      category,
      from,
      to,
    } = req.query;

    if (
      (userId && isNaN(+userId))
      || (from && isNaN(Date.parse(from)))
      || (to && isNaN(Date.parse(to)))
      || (category && typeof category !== 'string')
    ) {
      res.sendStatus(400);

      return;
    }

    const filteredExpenses = expenses
      .filter(expense => (
        userId ? expense.userId === +userId : expense
      ))
      .filter(expense => (
        category ? expense.category === category : expense
      ))
      .filter(expense => (
        from ? new Date(expense.spentAt) > new Date(from) : expense
      ))
      .filter(expense => (
        to ? new Date(expense.spentAt) < new Date(to) : expense
      ));

    res.send(filteredExpenses);
  });

  app.get('/expenses/:expenseId', (req, res) => {
    const { expenseId } = req.params;

    if (isNaN(+expenseId)) {
      res.sendStatus(400);

      return;
    }

    const foundExpense = expenses.find(({ id }) => +expenseId === id);

    foundExpense ? res.send(foundExpense) : res.sendStatus(404);
  });

  app.delete('/expenses/:expenseId', (req, res) => {
    const { expenseId } = req.params;
    const filteredExpenses = expenses.filter(({ id }) => +expenseId !== id);
    const isExpenseFound = expenses.length !== filteredExpenses.length;

    expenses = filteredExpenses;

    res.sendStatus(isExpenseFound ? 204 : 404);
  });

  app.patch('/expenses/:expenseId', express.json(), (req, res) => {
    const { expenseId } = req.params;
    const {
      spentAt,
      title,
      amount,
      category,
      note,
    } = req.body;

    if (
      isNaN(+expenseId)
      || (spentAt && isNaN(Date.parse(spentAt)))
      || (title && typeof title !== 'string')
      || (amount && isNaN(+amount))
      || (category && typeof category !== 'string')
      || (note && typeof note !== 'string')
    ) {
      res.sendStatus(400);

      return;
    }

    const foundExpense = expenses.find(({ id }) => +expenseId === id);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    Object.assign(foundExpense, req.body);

    res.send(foundExpense);
  });

  return app;
}

module.exports = {
  createServer,
};
