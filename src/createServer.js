'use strict';

const express = require('express');

function createServer() {
  const app = express();

  let users = [];
  let expenses = [];

  let nextUserId = 1;
  let nextExpenseId = 1;

  const findElement = (arr, value) => arr.find(item => item.id === +value);

  app.get('/users', express.json(), (req, res) => {
    res.statusCode = 200;
    res.send(Object.values(users));
  });

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

    res.statusCode = 201;
    res.send(newUser);
  });

  app.get('/expenses', express.json(), (req, res) => {
    const {
      userId,
      category,
      from,
      to,
    } = req.query;

    const foundUser = findElement(users, userId);

    if (foundUser) {
      let expensesOfUser = expenses
        .filter(expense => expense.userId === +userId);

      if (category) {
        expensesOfUser = expensesOfUser
          .filter(expense => expense.category === category);
      }

      res.send(expensesOfUser);

      return;
    };

    if (from && to) {
      const expensesByDate = expenses.filter(expense =>
        expense.spentAt >= from && expense.spentAt <= to);

      res.send(expensesByDate);

      return;
    }

    res.statusCode = 200;
    res.send(expenses);
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

    if (!users.some(user => user.id === userId)) {
      res.sendStatus(400);

      return;
    };

    const newExpense = {
      id: nextExpenseId++,
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

  app.get('/users/:id', express.json(), (req, res) => {
    const { id } = req.params;

    const foundUser = findElement(users, id);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    };

    res.statusCode = 200;
    res.send(foundUser);
  });

  app.delete('/users/:id', express.json(), (req, res) => {
    const { id } = req.params;

    const filteredUsers = users.filter(user => user.id !== +id);

    if (filteredUsers.length === users.length) {
      res.sendStatus(404);

      return;
    };

    res.sendStatus(204);
    users = filteredUsers;
  });

  app.patch('/users/:id', express.json(), (req, res) => {
    const { id } = req.params;

    const foundUser = findElement(users, id);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    const { name } = req.body;

    Object.assign(foundUser, { name });

    res.send(foundUser);
  });

  app.get('/expenses/:expenseId', express.json(), (req, res) => {
    const { expenseId } = req.params;

    const foundExpense = findElement(expenses, expenseId);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    };

    res.send(foundExpense);
  });

  app.delete('/expenses/:expenseId', express.json(), (req, res) => {
    const { expenseId } = req.params;

    const filteredExpenses = expenses
      .filter(expense => expense.id !== +expenseId);

    if (filteredExpenses.length === expenses.length) {
      res.sendStatus(404);

      return;
    };

    expenses = filteredExpenses;
    res.sendStatus(204);
  });

  app.patch('/expenses/:expenseId', express.json(), (req, res) => {
    const { expenseId } = req.params;

    const foundExpense = findElement(expenses, expenseId);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    const { title } = req.body;

    Object.assign(foundExpense, { title });

    res.send(foundExpense);
  });

  return app;
}

module.exports = {
  createServer,
};
