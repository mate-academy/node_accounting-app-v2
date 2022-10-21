
'use strict';

const express = require('express');

function createServer() {
  const app = express();

  let expenses = [];
  let users = [];

  app.use(express.json());

  app.post('/users', (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);
    }

    const newUser = {
      id: Math.floor(Math.random() * 1000),
      name,
    };

    users.push(newUser);
    res.statusCode = 201;
    res.send(newUser);
  });

  app.get('/users', (req, res) => {
    if (!users.length) {
      res.statusCode = 200;
      res.send([]);
    }
    res.send(users);
  });

  const findById = (items, value) => {
    return items.find((item) => item.id === Number(value));
  };

  app.get('/users/:userId', (req, res) => {
    const foundUser = findById(users, req.params.userId);

    if (!foundUser) {
      res.sendStatus(404);
    }
    res.sendStatus = 200;
    res.send(foundUser);
  });

  app.patch('/users/:userId', (req, res) => {
    const foundUser = findById(users, req.params.userId);

    if (!foundUser) {
      res.sendStatus(404);
    }

    const { name } = req.body;

    Object.assign(foundUser, { name });
    res.send(foundUser);
  });

  const filterById = (items, id) => {
    return items.filter((item) => item.id !== Number(id));
  };

  app.delete('/users/:userId', (req, res) => {
    const filteredUsers = filterById(users, req.params.userId);

    if (users.length === filteredUsers.length) {
      res.sendStatus(404);
    }
    users = filteredUsers;
    res.sendStatus(204);
  });

  app.post('/expenses', (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (!users.some((user) => user.id === userId)) {
      res.sendStatus(400);
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

  app.get('/expenses', (req, res) => {
    const { userId, category, from, to } = req.query;

    if (findById(users, userId)) {
      let userExpenses = expenses.filter(
        (expense) => expense.userId === Number(userId)
      );

      if (category) {
        userExpenses = userExpenses.filter(
          (expense) => expense.category === category
        );
      }
      res.send(userExpenses);
    }

    if (from && to) {
      const expensesBetweenDate = expenses.filter(
        (expense) => expense.spentAt >= from && expense.spentAt <= to
      );

      res.send(expensesBetweenDate);
    }
    res.send(expenses);
  });

  app.get('/expenses/:expenseId', (req, res) => {
    const foundExpense = findById(expenses, req.params.expenseId);

    if (!foundExpense) {
      res.sendStatus(404);
    }
    res.send(foundExpense);
  });

  app.patch('/expenses/:expenseId', (req, res) => {
    const findExpense = findById(expenses, req.params.expenseId);

    if (!findExpense) {
      res.sendStatus(404);
    }

    const { title } = req.body;

    Object.assign(findExpense, { title });
    res.send(findExpense);
  });

  app.delete('/expenses/:expenseId', (req, res) => {
    const { expenseId } = req.params;
    const filteredExpenses = filterById(expenses, expenseId);

    if (users.length === filteredExpenses.length) {
      res.sendStatus(404);
    }
    expenses = filteredExpenses;
    res.sendStatus(204);
  });

  return app;
}

module.exports = {
  createServer,
};
