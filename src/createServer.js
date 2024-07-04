/* eslint-disable function-paren-newline */
'use strict';

const express = require('express');
const router = express.Router();
const cors = require('cors');

function createServer() {
  const app = express();
  const mockUsers = [];
  const mockExpenses = [];

  app.use(cors());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use('/', router);

  app.get('/users', (req, res) => {
    if (mockUsers.length === 0) {
      return res.send([]);
    }
    res.status(200).send(mockUsers);
  });

  app.post('/users', (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.status(400).send('Name is required!');

      return;
    }

    const maxId = mockUsers.reduce(
      (max, user) => (user.id > max ? user.id : max),
      0,
    );
    const newId = maxId + 1;

    const newUser = {
      id: newId,
      name,
    };

    mockUsers.push(newUser);

    res.status(201).send(newUser);
  });

  app.get('/users/:id', (req, res) => {
    const { id } = req.params;

    const newUser = mockUsers.find((user) => user.id === Number(id));

    if (!newUser) {
      res.sendStatus(404);

      return;
    }
    res.status(200).send(newUser);
  });

  app.delete('/users/:id', (req, res) => {
    const { id } = req.params;

    if (!id || isNaN(Number(id))) {
      res.sendStatus(400);

      return;
    }

    const userIndex = mockUsers.findIndex((user) => user.id === Number(id));

    if (userIndex === -1) {
      res.sendStatus(404);

      return;
    }

    mockUsers.splice(userIndex, 1);
    res.sendStatus(204);
  });

  app.patch('/users/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    const newUser = mockUsers.find((user) => user.id === Number(id));

    if (!newUser) {
      res.sendStatus(404);

      return;
    }

    if (typeof name !== 'string') {
      res.sendStatus(404);

      return;
    }

    Object.assign(newUser, { name });

    res.status(200).send(newUser);
  });

  app.get('/expenses', (req, res) => {
    const { userId, from, to, categories } = req.query;

    let filteredExpenses = mockExpenses;

    if (userId) {
      filteredExpenses = filteredExpenses.filter(
        (expense) => expense.userId === Number(userId),
      );
    }

    if (categories) {
      const categoryList = categories
        .split(',')
        .map((category) => category.trim());

      if (categoryList.length > 0) {
        filteredExpenses = filteredExpenses.filter((expense) =>
          categoryList.includes(expense.category),
        );
      }
    }

    if (from && to) {
      filteredExpenses = filteredExpenses.filter((expense) => {
        const expenseDate = new Date(expense.spentAt);
        const startDateDate = new Date(from);
        const toDate = new Date(to);

        return expenseDate >= startDateDate && expenseDate <= toDate;
      });
    }

    if (filteredExpenses.length === 0) {
      return res.send([]);
    }

    res.status(200).send(filteredExpenses);
  });

  app.post('/expenses', (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (!userId || isNaN(Number(userId))) {
      return res.status(400).send('Valid UserId is required!');
    }

    const user = mockUsers.find((item) => item.id === Number(userId));

    if (!user) {
      return res.status(400).send('User not found!');
    }

    const maxId = mockExpenses.reduce(
      (max, expense) => (expense.id > max ? expense.id : max),
      0,
    );
    const newId = maxId + 1;

    const newExpense = {
      id: newId,
      userId: Number(userId),
      spentAt,
      title,
      amount,
      category,
      note,
    };

    mockExpenses.push(newExpense);

    res.status(201).send(newExpense);
  });

  app.get('/expenses/:id', (req, res) => {
    const { id } = req.params;

    const expense = mockExpenses.find((item) => item.id === Number(id));

    if (!expense) {
      return res.sendStatus(404);
    }

    res.status(200).send(expense);
  });

  app.delete('/expenses/:id', (req, res) => {
    const { id } = req.params;

    if (!id || isNaN(Number(id))) {
      return res.sendStatus(400);
    }

    const expenseIndex = mockExpenses.findIndex(
      (expense) => expense.id === Number(id),
    );

    if (expenseIndex === -1) {
      return res.sendStatus(404);
    }

    mockExpenses.splice(expenseIndex, 1);
    res.sendStatus(204);
  });

  app.patch('/expenses/:id', (req, res) => {
    const { id } = req.params;
    const { title, amount, category, note } = req.body;

    const expense = mockExpenses.find((item) => item.id === Number(id));

    if (!expense) {
      return res.sendStatus(404);
    }

    expense.title = title !== undefined ? title : expense.title;
    expense.amount = amount !== undefined ? amount : expense.amount;
    expense.category = category !== undefined ? category : expense.category;
    expense.note = note !== undefined ? note : expense.note;

    res.status(200).send(expense);
  });

  return app;
}

module.exports = {
  createServer,
};
