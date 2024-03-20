'use strict';

const express = require('express');
const {
  addExpense,
  deleteExpense,
  updateById, getExpenseById,
} = require('./servises/expresesServise');

let users = [];
let expenses = [];

function createServer() {
  users = [];
  expenses = [];

  const app = express();

  app.get('/users', (req, res) => {
    res.json(users);
  });

  app.post('/users', express.json(), (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.status(400).end();

      return;
    }

    const user = {
      id: +(new Date()),
      name,
    };

    users.push(user);
    res.statusCode = 201;
    res.send(user);
  });

  app.get('/users/:id', (req, res) => {
    const { id } = req.params;

    if (Number.isNaN(+id)) {
      res.status(400).end();

      return;
    }

    const getById = () => {
      return users.find(oneUser => oneUser.id === +id);
    };

    const user = getById();

    if (!user) {
      res.status(404).end();

      return;
    }

    res.json(user);
  });

  app.delete('/users/:id', (req, res) => {
    const { id } = req.params;

    const filteredUsers = users.filter(user => +user.id !== +id);

    if (users.length === filteredUsers.length) {
      res.status(404).end();

      return;
    }

    users.length = 0;
    users.push(...filteredUsers);

    res.status(204).end();
  });

  app.patch('/users/:id', express.json(), (req, res) => {
    const { name } = req.body;
    const { id } = req.params;

    const user = users.find(oneUser => oneUser.id === +id);

    if (!user) {
      res.status(404).end();

      return;
    }

    if (!name) {
      res.status(400).end();

      return;
    }

    Object.assign(user, { name });

    res.statusCode = 200;
    res.send(user);
  });

  app.get('/expenses', (req, res) => {
    const { userId, from, to, categories } = req.query;
    let filteredExpenses = expenses;

    if (userId) {
      filteredExpenses = filteredExpenses
        .filter(expense => expense.userId === Number(userId));
    }

    if (categories) {
      const categoryList = categories.split(',');

      filteredExpenses = filteredExpenses
        .filter(expense => categoryList.includes(expense.category));
    }

    if (from && to) {
      filteredExpenses = filteredExpenses.filter(expense => {
        const spentAt = new Date(expense.spentAt);

        return spentAt >= new Date(from) && spentAt <= new Date(to);
      });
    }

    res.send(filteredExpenses);
  });

  app.get('/expenses/:id', (req, res) => {
    const { id } = req.params;

    if (Number.isNaN(+id)) {
      res.status(400).end();

      return;
    }

    const expense = getExpenseById(+id);

    if (!expense) {
      res.status(404).end();

      return;
    }

    res.status(200).json(expense);
  });

  app.post('/expenses', express.json(), (req, res) => {
    const { userId, title, amount, category, note, spentAt } = req.body;

    const userExists = users.find(user => user.id === +userId);

    if (
      typeof userId !== 'number'
      || typeof spentAt !== 'string'
      || typeof title !== 'string'
      || typeof amount !== 'number'
      || typeof category !== 'string'
      || typeof note !== 'string'
      || !userExists
    ) {
      res.status(400).end();
    } else {
      res.status(201).json(addExpense(req.body));
    }
  });

  app.delete('/expenses/:id', (req, res) => {
    const { id } = req.params;

    const filteredExpenses = deleteExpense(id);

    if (!filteredExpenses) {
      res.status(404).end();

      return;
    }

    expenses.length = 0;
    expenses.push(...filteredExpenses);

    res.status(204).end();
  });

  app.patch('/expenses/:id', express.json(), (req, res) => {
    const { id } = req.params;

    if (Number.isNaN(+id)) {
      res.status(400).end();

      return;
    }

    const expense = updateById({
      ...req.body,
      id: +id,
    });

    if (!expense) {
      res.status(404).end();
    } else {
      res.status(200).json(expense);
    }
  });

  return app;
}

module.exports = {
  createServer,
};
