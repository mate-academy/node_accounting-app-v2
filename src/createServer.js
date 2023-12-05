'use strict';

const express = require('express');

function createServer() {
  let users = [];
  let expenses = [];

  const app = express();

  app.use(express.json());

  app.get('/users', (_, res) => {
    res.send(users);
  });

  app.post('/users', (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    const newUser = {
      id: getNewId(users),
      name,
    };

    users.push(newUser);

    res.status(201);
    res.send(newUser);
  });

  app.get('/users/:id', (req, res) => {
    const { id } = req.params;
    const foundUser = users.find(user => user.id === +id);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    res.send(foundUser);
  });

  app.delete('/users/:id', (req, res) => {
    const { id } = req.params;

    const newUsers = users.filter(user => user.id !== +id);

    if (users.length === newUsers.length) {
      res.sendStatus(404);

      return;
    }

    users = newUsers;

    res.status(204);
    res.send(users);
  });

  app.patch('/users/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    const foundUser = users.find(user => user.id === +id);

    if (!foundUser) {
      res.sendStatus(400);

      return;
    }

    const updatedUser = {
      id: +id,
      name,
    };

    users = users.map(user => {
      return user.id === +id
        ? updatedUser
        : user;
    });

    res.send(updatedUser);
  });

  app.get('/expenses', (req, res) => {
    const { userId, from, to, categories } = req.query;
    let visibleExpenses = [...expenses];

    if (userId) {
      visibleExpenses = visibleExpenses
        .filter(expense => expense.userId === +userId);
    }

    if (categories) {
      visibleExpenses = visibleExpenses.filter(expense =>
        expense.category === categories);
    }

    if (from && to) {
      const fromDate = new Date(from);
      const toDate = new Date(to);

      visibleExpenses = visibleExpenses.filter(expense => {
        const spentAtDate = new Date(expense.spentAt);

        return spentAtDate >= fromDate && spentAtDate <= toDate;
      });
    }

    res.send(visibleExpenses);
  });

  app.post('/expenses', (req, res) => {
    const {
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    } = req.body;

    const foundUser = users.find(user => user.id === userId);

    if (!foundUser || !title) {
      res.sendStatus(400);

      return;
    }

    const newExpense = {
      id: getNewId(expenses),
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

  app.get('/expenses/:id', (req, res) => {
    const { id } = req.params;
    const foundExpense = expenses.find(expense => expense.id === +id);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    res.send(foundExpense);
  });

  app.delete('/expenses/:id', (req, res) => {
    const { id } = req.params;

    const newExpenses = expenses.filter(expense => expense.id !== +id);

    if (expenses.length === newExpenses.length) {
      res.sendStatus(404);

      return;
    }

    expenses = newExpenses;

    res.status(204);
    res.send(expenses);
  });

  app.patch('/expenses/:id', (req, res) => {
    const { id } = req.params;
    const {
      spentAt,
      title,
      amount,
      category,
      note,
    } = req.body;

    const foundExpense = expenses.find(expense => expense.id === +id);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    const updatedExpense = {
      ...foundExpense,
      spentAt: spentAt || foundExpense.spentAt,
      title: title || foundExpense.title,
      amount: amount || foundExpense.amount,
      category: category || foundExpense.category,
      note: note || foundExpense.note,
    };

    expenses = expenses.map(expense => {
      return expense.id === +id
        ? updatedExpense
        : expense;
    });

    res.send(updatedExpense);
  });

  return app;
}

function getNewId(data) {
  return (data.sort((a, b) => b.id - a.id)[0] + 1) || 1;
}

module.exports = {
  createServer,
};
