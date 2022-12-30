'use strict';

const express = require('express');

function createServer() {
  const app = express();

  let users = [];
  let expenses = [];

  app.get('/users', express.json(), (req, res) => {
    res.send(users);
  });

  app.post('/users', express.json(), (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    };

    const newUser = {
      id: Math.floor(Math.random()),
      name,
    };

    users.push(newUser);

    res.statusCode = 201;
    res.send(newUser);
  });

  app.get('/users/:userId', express.json(), (req, res) => {
    const { userId } = req.params;

    const foundUser = users.find(user => user.id === +userId);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    res.statusCode = 200;
    res.send(foundUser);
  });

  app.delete('/users/:userId', express.json(), (req, res) => {
    const { userId } = req.params;

    const foundUser = users.find(user => user.id === +userId);
    const filteredUsers = users.filter(user => user.id !== +userId);

    if (!foundUser) {
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
      res.sendStatus(404);

      return;
    }

    const updatedUser = {
      ...foundUser,
      name,
    };

    res.send(updatedUser);
  });

  // problem is here
  app.get('/expenses', express.json(), (req, res) => {
    const {
      userId,
      category,
      from,
      to,
    } = req.query;

    // here
    if (userId) {
      expenses = [expenses.find(expense => expense.userId === +userId)];
    }

    if (from && to) {
      expenses = expenses.filter(
        expense => expense.spentAt >= from && expense.spentAt <= to,
      );
    }

    if (category) {
      expenses = expenses.filter(expense => expense.category === category);
    }

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

    const foundUser = users.find(user => user.id === +userId);

    if (!foundUser) {
      res.sendStatus(400);

      return;
    }

    const newExpense = {
      id: Math.floor(Math.random()),
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

  app.get('/expenses/:expenseId', express.json(), (req, res) => {
    const { expenseId } = req.params;

    const foundExpense = expenses.find(expense => expense.id === +expenseId);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    res.send(foundExpense);
  });

  app.delete('/expenses/:expenseId', express.json(), (req, res) => {
    const { expenseId } = req.params;

    const foundExpense = expenses.find(expense => expense.id === +expenseId);
    const filteredExpenses = expenses.filter(
      expense => expense.id !== +expenseId
    );

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    expenses = filteredExpenses;

    res.sendStatus(204);
  });

  app.patch('/expenses/:expenseId', express.json(), (req, res) => {
    const { expenseId } = req.params;
    const { title } = req.body;

    let foundExpense = expenses.find(expense => expense.id === +expenseId);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    foundExpense = {
      ...foundExpense,
      title,
    };

    res.send(foundExpense);
  });

  return app;
}

module.exports = {
  createServer,
};
