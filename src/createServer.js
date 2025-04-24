'use strict';

// const { v4: uuidv4 } = require('uuid');
const express = require('express');

const cors = require('cors');
const { resetUsers } = require('../src/services/users.service');

const { usersRouter } = require('./routers/users.router');
const { expensesRouter } = require('./routers/expenses.router');
const { resetExpenses } = require('./services/expenses.services');

function createServer() {
  resetUsers();
  resetExpenses();

  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  // app.get('/expenses', (req, res) => {
  //   let { userId, categories, from, to } = req.query;

  //   if (!userId || isNaN(+userId)) {
  //     return res.status(400).json({ message: 'Invalid or missing userId' });
  //   }

  //   let filtered = data.expenses.filter((exp) => exp.userId === +userId);

  //   if (categories) {
  //     const catArray = Array.isArray(categories) ? categories : [categories];
  //     filtered = filtered.filter((exp) => catArray.includes(exp.category));
  //   }

  //   if (from) {
  //     const fromDate = new Date(from);
  //     if (isNaN(fromDate)) {
  //       return res.status(400).json({ message: 'Invalid "from" date' });
  //     }
  //     filtered = filtered.filter((exp) => new Date(exp.spentAt) >= fromDate);
  //   }

  //   if (to) {
  //     const toDate = new Date(to);
  //     if (isNaN(toDate)) {
  //       return res.status(400).json({ message: 'Invalid "to" date' });
  //     }
  //     filtered = filtered.filter((exp) => new Date(exp.spentAt) <= toDate);
  //   }

  //   res.status(200).json(filtered || []);
  // });

  // app.post('/expenses', (req, res) => {
  //   const { userId, spentAt, title, amount, category, note } = req.body;

  //   if (!userId || !spentAt || !title || !amount || !category || !note) {
  //     return res.status(400).json({ message: 'Invalid data' });
  //   }

  //   const userExists = data.users.find((user) => user.id === userId);
  //   if (!userExists) {
  //     return res.status(400).json({ message: 'User not found' });
  //   }

  //   const newExpense = {
  //     id: data.expenses.length + 1,
  //     userId,
  //     spentAt,
  //     title,
  //     amount,
  //     category,
  //     note,
  //   };
  //   data.expenses.push(newExpense);
  //   res.status(201).json(newExpense);
  // });

  // app.get('/expenses/:id', (req, res) => {
  //   const id = req.params.id;

  //   if (!id) {
  //     return res.status(400);
  //   }

  //   const expense = data.expenses.find((exp) => exp.id === +id);

  //   if (!expense) {
  //     return res.status(400).send('Bad request');
  //   }

  //   res.status(200).json(expense);
  // });

  // app.delete('/expenses/:id', (req, res) => {
  //   const id = req.params.id;

  //   const expense = data.expenses.find((exp) => exp.id === +id);

  //   if (!expense) {
  //     return res.status(404);
  //   }

  //   data.expenses = data.expenses.filter((exp) => exp.id !== +id);

  //   res.status(204);
  // });

  // app.patch('/expenses/:id', (req, res) => {
  //   const id = req.params.id;
  //   const { spentAt, title, amount, category, note } = req.body;

  //   if (!id || !spentAt || !title || !amount || !category || !note) {
  //     return res.status(400);
  //   }

  //   let foundExpense = data.expenses.find((exp) => exp.id === +id);

  //   if (!foundExpense) {
  //     return res.status(404);
  //   }

  //   foundExpense = {
  //     ...foundExpense,
  //     spentAt,
  //     title,
  //     amount,
  //     category,
  //     note,
  //   };

  //   res.status(200).json(foundExpense);
  // });

  return app;
}

module.exports = {
  createServer,
};
