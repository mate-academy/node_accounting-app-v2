'use strict';

const express = require('express');

function createServer() {
  let expenses = [];
  let users = [];

  const app = express();
  const router = express.Router();

  app.use(router);

  router.get('/users', (req, res) => {
    res.statusCode = 200;
    res.send(users);
  });

  router.post('/users', express.json(), (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    const newUser = {
      id: generateId(users),
      name,
    };

    users.push(newUser);

    res.statusCode = 201;
    res.send(newUser);
  });

  router.get('/users/:userId', (req, res) => {
    const { userId } = req.params;
    const foundUser = users.find(user => user.id === +userId);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    res.statusCode = 200;
    res.send(foundUser);
  });

  router.patch('/users/:userId', express.json(), (req, res) => {
    const { name } = req.body;
    const { userId } = req.params;

    if (!name) {
      res.statusCode = 400;

      return;
    }

    const foundUser = users.find(user => user.id === +userId);

    if (!foundUser) {
      res.statusCode = 404;

      return;
    }

    const updatedUser = {
      ...foundUser,
      name,
    };

    users = users.map(user => {
      if (user.id === +userId) {
        return updatedUser;
      }

      return user;
    });

    res.statusCode = 200;
    res.send(updatedUser);
  });

  router.delete('/users/:userId', (req, res) => {
    const { userId } = req.params;
    const filteredUsers = users.filter(user => user.id !== +userId);

    if (users.length === filteredUsers.length) {
      res.sendStatus(404);

      return;
    }

    users = filteredUsers;
    res.sendStatus(204);
  });

  router.get('/expenses', (req, res) => {
    const { from, to, categories, userId } = req.query;

    let newExpenses = expenses;

    if (userId) {
      newExpenses = newExpenses.filter(
        expense => expense.userId === +userId
      );
    }

    if (from) {
      const dateFrom = new Date(from);

      newExpenses = newExpenses.filter(expense => {
        const expenseDate = new Date(expense.spentAt);

        return expenseDate >= dateFrom;
      });
    }

    if (to) {
      const dateTo = new Date(to);

      newExpenses = newExpenses.filter(expense => {
        const expenseDate = new Date(expense.spentAt);

        return expenseDate <= dateTo;
      });
    }

    if (categories) {
      newExpenses = newExpenses.filter(
        expense => expense.category === categories
      );
    }

    res.statusCode = 200;
    res.send(newExpenses);
  });

  router.post('/expenses', express.json(), (req, res) => {
    const { userId, title } = req.body;
    const foundUser = users.find(user => user.id === +userId);

    if (!title || !foundUser) {
      res.sendStatus(400);

      return;
    }

    const newExpense = {
      id: generateId(expenses),
      ...req.body,
    };

    expenses.push(newExpense);

    res.statusCode = 201;
    res.send(newExpense);
  });

  router.get('/expenses/:expenseId', (req, res) => {
    const { expenseId } = req.params;
    const foundExpense = expenses.find(expense => expense.id === +expenseId);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    res.statusCode = 200;
    res.send(foundExpense);
  });

  router.patch('/expenses/:expenseId', express.json(), (req, res) => {
    const { expenseId } = req.params;
    const foundExpense = expenses.find(expense => expense.id === +expenseId);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    for (const key in req.body) {
      if (key === 'id') {
        res.sendStatus(400);

        return;
      }

      foundExpense[key] = req.body[key];
    }

    res.send(foundExpense);
  });

  router.delete('/expenses/:expenseId', (req, res) => {
    const { expenseId } = req.params;
    const filteredExpenses = expenses
      .filter(expense => expense.id !== +expenseId);

    if (expenses.length === filteredExpenses.length) {
      res.sendStatus(404);

      return;
    }

    expenses = filteredExpenses;
    res.sendStatus(204);
  });

  return app;
}

function generateId(arr) {
  if (!arr.length) {
    return 1;
  }

  const ids = arr.map(a => a.id);

  return Math.max(...ids) + 1;
}

module.exports = {
  createServer,
};
