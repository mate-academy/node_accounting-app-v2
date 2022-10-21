'use strict';

const express = require('express');

function createServer() {
  const app = express();
  let users = [];
  let expenses = [];
  let nextUserId = 1;
  let nextExpenceId = 1;

  app.post('/users', express.json(), (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    const newUser = {
      id: nextUserId++,
      name,
    };

    users.push(newUser);

    res.status(201);
    res.send(newUser);
  });

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

  app.patch('/users/:userId', express.json(), (req, res) => {
    const { userId } = req.params;
    const { name } = req.body;
    const foundUser = users.find(user => user.id === +userId);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    Object.assign(foundUser, { name });
    res.status(200);
    res.send(foundUser);
  });

  app.delete('/users/:userId', (req, res) => {
    const { userId } = req.params;
    const filtredUsers = users.filter(user => user.id !== +userId);

    if (filtredUsers.length === users.length) {
      res.sendStatus(404);

      return;
    }

    users = filtredUsers;

    res.sendStatus(204);
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

    const foundUser = users.find(user => user.id === +userId);

    if (!userId || !spentAt || !title || !amount || !category || !foundUser) {
      res.sendStatus(400);

      return;
    }

    const newExpense = {
      id: nextExpenceId++,
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    };

    expenses.push(newExpense);
    res.status(201);
    res.send(newExpense);
  });

  app.get('/expenses', (req, res) => {
    let filtredExpenses = expenses;

    if (req.query.userId) {
      const { userId } = req.query;
      const foundUser = users.find(user => user.id === +userId);

      if (!foundUser) {
        res.sendStatus(404);

        return;
      }

      filtredExpenses = filtredExpenses.filter(
        expence => expence.userId === +userId
      );
    }

    if (req.query.from) {
      const { from, to } = req.query;

      filtredExpenses = filtredExpenses.filter(({ spentAt }) => (
        spentAt > from && spentAt < to
      ));
    }

    if (req.query.category) {
      const { category } = req.query;

      filtredExpenses = filtredExpenses.filter(
        expence => expence.category === category
      );
    }

    res.send(filtredExpenses);
  });

  app.get('/expenses/:expenseId', (req, res) => {
    const { expenseId } = req.params;
    const foundExpence = expenses.find(expense => expense.id === +expenseId);

    if (!foundExpence) {
      res.sendStatus(404);

      return;
    }

    res.send(foundExpence);
  });

  app.patch('/expenses/:expenseId', express.json(), (req, res) => {
    const { expenseId } = req.params;
    const newExpenseData = req.body;
    const foundExpence = expenses.find(expense => expense.id === +expenseId);

    if (!foundExpence) {
      res.sendStatus(404);

      return;
    }

    Object.assign(foundExpence, newExpenseData);
    res.status(200);
    res.send(foundExpence);
  });

  app.delete('/expenses/:expenseId', (req, res) => {
    const { expenseId } = req.params;
    const filtredExpenses = expenses.filter(
      expense => expense.id !== +expenseId
    );

    if (filtredExpenses.length === expenses.length) {
      res.sendStatus(404);

      return;
    }

    expenses = filtredExpenses;
    res.sendStatus(204);
  });

  return app;
}

module.exports = {
  createServer,
};
