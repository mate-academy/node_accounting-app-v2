'use strict';

const express = require('express');

function createServer() {
  const app = express();

  let users = [];
  let expenses = [];

  app.get('/users', (req, res) => {
    res.send(users);
  });

  app.get('/users/:userId', (req, res) => {
    const { userId } = req.params;
    const foundUser = users.find(user => user.id === +userId);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    res.send(foundUser);
  });

  app.post('/users', express.json(), (req, res) => {
    const { name } = req.body;
    const newId = users.length ? users[users.length - 1].id + 1 : 1;

    const newUser = {
      id: newId,
      name,
    };

    if (!name) {
      res.sendStatus(400);

      return;
    }

    users.push(newUser);

    res.statusCode = 201;
    res.send(newUser);
  });

  app.delete('/users/:userId', (req, res) => {
    const { userId } = req.params;

    const filteredUsers = [...users].filter(user => user.id !== +userId);

    if (filteredUsers.length === users.length) {
      res.sendStatus(404);

      return;
    }

    users = filteredUsers;

    res.sendStatus(204);
  });

  app.patch('/users/:userId', express.json(), (req, res) => {
    const { userId } = req.params;
    const { name } = req.body;
    const foundUser = users.find(user => user.id === +userId);

    if (!foundUser) {
      res.sendStatus(422);

      return;
    }

    if (typeof name !== 'string') {
      res.sendStatus(404);

      return;
    }

    Object.assign(foundUser, { name });

    res.send(foundUser);
  });

  app.get('/expenses', (req, res) => {
    const { userId, category, from, to } = req.query;
    const foundUser = users.find(user => user.id === +userId);

    if (foundUser) {
      let userExpenses = expenses.filter(expense => expense.userId === +userId);

      if (category) {
        userExpenses = userExpenses.filter(
          expense => expense.category === category
        );
      }

      res.send(userExpenses);
    }

    if (from && to) {
      const dateExpenses = expenses.filter(
        expense => (expense.spentAt >= from && expense.spentAt <= to)
      );

      res.send(dateExpenses);
    }

    res.send(expenses);
  });

  app.get('/expenses/:expenseId', (req, res) => {
    const { expenseId } = req.params;
    const foundExpense = expenses.find(expense => expense.id === +expenseId);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    res.send(foundExpense);
  });

  app.post('/expenses', express.json(), (req, res) => {
    const { userId, title, spentAt, amount, category, note } = req.body;

    if (!users.some((user) => user.id === userId)) {
      res.sendStatus(400);
    }

    const newId = expenses.length ? expenses[expenses.length - 1].id + 1 : 1;

    const newExpence = {
      id: newId,
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    };

    expenses.push(newExpence);

    res.statusCode = 201;
    res.send(newExpence);
  });

  app.delete('/expenses/:expenseId', (req, res) => {
    const { expenseId } = req.params;

    const filteredExpenses = expenses.filter(
      expense => expense.id !== +expenseId
    );

    if (filteredExpenses.length === expenses.length) {
      res.sendStatus(404);

      return;
    }

    expenses = filteredExpenses;

    res.sendStatus(204);
  });

  app.patch('/expenses/:expenseId', express.json(), (req, res) => {
    const { expenseId } = req.params;
    const { title } = req.body;

    const foundExpense = expenses.find(expense => expense.id === +expenseId);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    Object.assign(foundExpense, { title });

    res.send(foundExpense);
  });

  return app;
}

module.exports = {
  createServer,
};
