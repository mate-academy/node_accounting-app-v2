'use strict';

const express = require('express');

function createServer() {
  const app = express();

  const getId = (arr, value) => {
    return arr
      .find(item => item.id === Number(value));
  };

  const filteredById = (arr, id) => (
    arr.filter(item => item.id !== Number(id))
  );

  let expenses = [];
  let users = [];

  app.post('/users', express.json(), (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    };

    const newUser = {
      id: Math.floor(Math.random() * 1000),
      name,
    };

    users.push(newUser);

    res.statusCode = 201;
    res.send(newUser);
  });

  app.get('/users', express.json(), (req, res) => {
    if (!users.length) {
      res.send([]);

      return;
    }

    res.send(users);
  });

  app.get('/users/:userId', express.json(), (req, res) => {
    const { userId } = req.params;
    const foundUser = getId(users, userId);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    res.sendStatus = 200;
    res.send(foundUser);
  });

  app.patch('/users/:userId', express.json(), (req, res) => {
    const { userId } = req.params;
    const foundUser = getId(users, userId);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    const { name } = req.body;

    Object.assign(foundUser, { name });

    res.send(foundUser);
  });

  app.delete('/users/:userId', express.json(), (req, res) => {
    const { userId } = req.params;
    const filteredUsers = filteredById(users, userId);

    if (users.length === filteredUsers.length) {
      res.sendStatus(404);

      return;
    }

    users = filteredUsers;
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

    if (!users.some(user => user.id === userId)) {
      res.sendStatus(400);

      return;
    }

    const newExpense = {
      id: Math.floor(Math.random() * 1000),
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

    if (getId(users, userId)) {
      let userExpenses = expenses.filter(
        expense => expense.userId === Number(userId)
      );

      if (category) {
        userExpenses = userExpenses.filter(
          expense => expense.category === category
        );
      }

      res.send(userExpenses);

      return;
    }

    if (from && to) {
      const expensesBetweenDate = expenses.filter(
        (expense) => expense.spentAt >= from && expense.spentAt <= to);

      res.send(expensesBetweenDate);

      return;
    }

    res.send(expenses);
  });

  app.get('/expenses/:expenseId', express.json(), (req, res) => {
    const { expenseId } = req.params;
    const foundExpense = getId(expenses, expenseId);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    res.send(foundExpense);
  });

  app.patch('/expenses/:expenseId', express.json(), (req, res) => {
    const { expenseId } = req.params;
    const foundExpense = getId(expenses, expenseId);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    const { title } = req.body;

    Object.assign(foundExpense, { title });

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

  return app;
}

module.exports = {
  createServer,
};
