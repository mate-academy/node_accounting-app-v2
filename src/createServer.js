'use strict';

const express = require('express');

function createServer() {
  let users = [];
  let expenses = [];

  let nextUserId = 1;
  let nextExpenceId = 1;

  const findItem = (arr, value) => arr.find(item => item.id === +value);
  const filteredById = (arr, value) => arr.filter(item => item.id !== +value);

  const app = express();

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

  app.get('/users', express.json(), (req, res) => {
    res.statusCode = 200;
    res.send(Object.values(users));
  });

  app.get('/users/:id', express.json(), (req, res) => {
    const { id } = req.params;

    const foundUser = findItem(users, id);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    res.statusCode = 200;
    res.send(foundUser);
  });

  app.delete('/users/:id', express.json(), (req, res) => {
    const { id } = req.params;

    const filteredUsers = users.filter(user => user.id !== +id);

    if (filteredUsers.length === users.length) {
      res.sendStatus(404);

      return;
    }

    users = filteredUsers;
    res.sendStatus(204);
  });

  app.patch('/users/:id', express.json(), (req, res) => {
    const { id } = req.params;

    const foundUser = users.find(user => user.id === +id);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    const { name } = req.body;

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

    if (!users.some(user => user.id === userId)) {
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

    res.statusCode = 201;
    res.send(newExpense);
  });

  app.get('/expenses', express.json(), (req, res) => {
    const {
      userId,
      category,
      from,
      to,
    } = req.query;

    const foundUser = findItem(users, userId);

    if (foundUser) {
      let userExpenses = expenses.filter(expense =>
        expense.userId === +userId
      );

      if (category) {
        userExpenses = userExpenses.filter(expense =>
          expense.category === category
        );
      }

      res.send(userExpenses);

      return;
    }

    if (from && to) {
      const expensesByDate = expenses.filter(expense =>
        expense.spentAt >= from && expense.spentAt <= to);

      res.send(expensesByDate);

      return;
    }

    res.statusCode = 200;
    res.send(expenses);
  });

  app.get('/expenses/:expenseId', express.json(), (req, res) => {
    const { expenseId } = req.params;
    const foundExpense = findItem(expenses, expenseId);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    res.send(foundExpense);
  });

  app.delete('/expenses/:expenseId', express.json(), (req, res) => {
    const { expenseId } = req.params;
    const filteredExpenses = filteredById(expenses, expenseId);

    if (users.length === filteredExpenses.length) {
      res.sendStatus(404);

      return;
    }

    expenses = filteredExpenses;
    res.sendStatus(204);
  });

  app.patch('/expenses/:expenseId', express.json(), (req, res) => {
    const { expenseId } = req.params;
    const findExpense = findItem(expenses, expenseId);

    if (!findExpense) {
      res.sendStatus(404);

      return;
    }

    const { title } = req.body;

    Object.assign(findExpense, { title });

    res.send(findExpense);
  });

  return app;
}

module.exports = {
  createServer,
};
