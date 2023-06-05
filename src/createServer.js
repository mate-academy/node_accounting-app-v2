'use strict';

const express = require('express');

function createServer() {
  const app = express();
  app.use(express.json());

  let users = [];
  let expenses = [];

  app.get('/users', (req, res) => {
    res.send(users);
  });

  app.get('/users/:userId', (req, res) => {
    const { userId } = req.params;

    if (!Number.isInteger(+userId)) {
      res.sendStatus(400);
      return;
    }

    const user = users.find((user) => user.id === +userId);

    if (!user) {
      res.sendStatus(404);
      return;
    }

    res.send(user);
  });

  app.post('/users', (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);
      return;
    }

    const newUser = {
      id: users.length + 1,
      name: name,
    };

    users.push(newUser);

    res.status(201).send(newUser);
  });

  app.patch('/users/:userId', (req, res) => {
    const { userId } = req.params;
    const { name } = req.body;

    if (!Number.isInteger(+userId) || !name) {
      res.sendStatus(400);
      return;
    }

    const user = users.find((user) => user.id === +userId);

    if (!user) {
      res.sendStatus(404);
      return;
    }

    user.name = name;

    res.send(user);
  });

  app.delete('/users/:userId', (req, res) => {
    const { userId } = req.params;

    if (!Number.isInteger(+userId)) {
      res.sendStatus(400);
      return;
    }

    const index = users.findIndex((user) => user.id === +userId);

    if (index === -1) {
      res.sendStatus(404);
      return;
    }

    users.splice(index, 1);

    res.sendStatus(204);
  });

  app.get('/expenses', (req, res) => {
    const { userId, category, from, to } = req.query;

    let filteredExpenses = [...expenses];

    if (userId) {
      filteredExpenses = filteredExpenses.filter((expense) => expense.userId === +userId);
    }

    if (category) {
      filteredExpenses = filteredExpenses.filter((expense) => expense.category === category);
    }

    if (from && to) {
      const fromDate = new Date(from);
      const toDate = new Date(to);

      filteredExpenses = filteredExpenses.filter((expense) => {
        const expenseDate = new Date(expense.spentAt);
        return expenseDate >= fromDate && expenseDate <= toDate;
      });
    }

    res.send(filteredExpenses);
  });

  app.get('/expenses/:expenseId', (req, res) => {
    const { expenseId } = req.params;

    if (!Number.isInteger(+expenseId)) {
      res.sendStatus(400);
      return;
    }

    const expense = expenses.find((expense) => expense.id === +expenseId);

    if (!expense) {
      res.sendStatus(404);
      return;
    }

    res.send(expense);
  });

  app.route('/expenses/:expenseId')
  .get((req, res) => {
    const { expenseId } = req.params;
    const regex = /^\d+$/;

    if (!regex.test(expenseId)) {
      res.sendStatus(400);
      return;
    }

    const expense = expenses.find((expense) => expense.id === +expenseId);

    if (!expense) {
      res.sendStatus(404);
      return;
    }

    res.send(expense);
  })
  .patch(express.json(), (req, res) => {
    const { expenseId } = req.params;
    const body = req.body;
    const regex = /^\d+$/;

    if (!regex.test(expenseId)) {
      res.sendStatus(400);
      return;
    }

    const expense = expenses.find((expense) => expense.id === +expenseId);

    if (!expense) {
      res.sendStatus(404);
      return;
    }

    Object.assign(expense, body);

    res.statusCode = 200;
    res.send(expense);
  })
  .delete((req, res) => {
    const { expenseId } = req.params;
    const regex = /^\d+$/;

    if (!regex.test(expenseId)) {
      res.sendStatus(400);
      return;
    }

    const index = expenses.findIndex((expense) => expense.id === +expenseId);

    if (index === -1) {
      res.sendStatus(404);
      return;
    }

    expenses.splice(index, 1);

    res.sendStatus(204);
  });

app.post('/expenses', express.json(), (req, res) => {
  const data = req.body;
  const userExpense = users.find((user) => user.id === +data.userId);

  if (!Object.entries(data).length || !userExpense) {
    res.sendStatus(400);
    return;
  }

  const expenseData = {
    id: expenses.length + 1,
    ...data,
  };

  expenses.push(expenseData);

  res.statusCode = 201;
  res.send(expenseData);
});

return app;
}

module.exports = {
  createServer,
};
