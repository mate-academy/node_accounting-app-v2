'use strict';

const express = require('express');

function createServer() {
  let users = [];
  let expenses = [];

  const findUser = (userId) => {
    return users.find(user => user.id === +userId);
  };

  const findExpense = (expenseId) => {
    return expenses.find(expense => expense.id === +expenseId);
  };

  const app = express();

  app.use(express.json());

  app.get('/users', (req, res) => {
    res.statusCode = 200;
    res.send(users);
  });

  app.post('/users', (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    const id = users.length + 1;
    const newUser = {
      id,
      name,
    };

    users.push(newUser);

    res.statusCode = 201;
    res.send(newUser);
  });

  app.get('/users/:userId', (req, res) => {
    const { userId } = req.params;
    const foundUser = findUser(userId);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    res.statusCode = 200;
    res.send(foundUser);
  });

  app.delete('/users/:userId', (req, res) => {
    const { userId } = req.params;
    const foundUser = findUser(userId);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    users = users.filter(user => user.id !== +userId);
    res.sendStatus(204);
  });

  app.patch('/users/:userId', (req, res) => {
    const { userId } = req.params;
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    const foundUser = findUser(userId);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    const updatedUser = {
      ...foundUser,
      name,
    };

    users = users.map(user => {
      if (user.id === userId) {
        return updatedUser;
      }

      return user;
    });

    res.statusCode = 200;
    res.send(updatedUser);
  });

  app.get('/expenses', (req, res) => {
    const { userId, categories, from, to } = req.query;

    let expensesToSend = expenses;

    if (userId) {
      expensesToSend = expensesToSend.filter(expense =>
        expense.userId === +userId
      );
    }

    if (categories) {
      expensesToSend = expensesToSend.filter(expense =>
        categories.includes(expense.category)
      );
    }

    if (from) {
      const dateFrom = new Date(from);

      expensesToSend = expensesToSend.filter(expense => {
        const expenseDate = new Date(expense.spentAt);

        return expenseDate >= dateFrom;
      });
    }

    if (to) {
      const dateTo = new Date(to);

      expensesToSend = expensesToSend.filter(expense => {
        const expenseDate = new Date(expense.spentAt);

        return expenseDate <= dateTo;
      });
    }

    res.status(200).json(expensesToSend);
  });

  app.post('/expenses', (req, res) => {
    let newExpense = req.body;
    const { userId } = newExpense;

    const foundUser = findUser(userId);

    if (!foundUser) {
      res.sendStatus(400);

      return;
    }

    const id = expenses.length + 1;

    newExpense = {
      ...newExpense,
      id,
    };
    expenses.push(newExpense);

    res.statusCode = 201;
    res.send(newExpense);
  });

  app.get('/expenses/:expenseId', (req, res) => {
    const { expenseId } = req.params;

    const foundExpense = findExpense(expenseId);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    res.statusCode = 200;
    res.send(foundExpense);
  });

  app.delete('/expenses/:expenseId', (req, res) => {
    const { expenseId } = req.params;

    const foundExpense = findExpense(expenseId);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    expenses = expenses.filter(expense => expense.id !== +expenseId);
    res.sendStatus(204);
  });

  app.patch('/expenses/:expenseId', (req, res) => {
    const { expenseId } = req.params;

    const foundExpense = findExpense(expenseId);

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

  return app;
}

module.exports = {
  createServer,
};
