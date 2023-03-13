'use strict';

const express = require('express');
const cors = require('cors');

const userService = require('./services/users');
const userRouter = require('./routes/users');

const expenseService = require('./services/expenses');
const expenseRouter = require('./routes/expenses');

function createServer() {
  const app = express();

  app.use(cors());

  userService.getInitiallUsers();
  expenseService.getInitiallExpenses();

  app.use('/users', express.json(), userRouter);
  app.use('/expenses', express.json(), expenseRouter);

  // ----------------EXPENSE-------------

  // let expenses = [];

  // app.get('/expenses', express.json(), (req, res) => {
  // const { userId, categories, from, to } = req.query;

  // if (userId) {
  //   expenses = expenses.filter(expense => expense.userId === +userId);
  // }

  // if (categories) {
  //   expenses = expenses.filter(expense => expense.category === categories);
  // }

  // if (from) {
  //   expenses = expenses.filter(expense => expense.spentAt > from);
  // }

  // if (to) {
  //   expenses = expenses.filter(expense => expense.spentAt < to);
  // }

  // res.send(expenses);
  // });

  // app.get('/expenses/:expenseId', express.json(), (req, res) => {
  // const { expenseId } = req.params;

  // if (!expenseId) {
  //   res.sendStatus(400);

  //   return;
  // }

  // const foundedExpense = expenses
  //   .find(expense => expense.id === +expenseId) || null;

  // if (!foundedExpense) {
  //   res.sendStatus(404);

  //   return;
  // }

  // res.send(foundedExpense);
  // });

  // app.post('/expenses', express.json(), (req, res) => {
  // const {
  //   userId,
  //   spentAt,
  //   title,
  //   amount,
  //   category,
  //   note,
  // } = req.body;

  // const foundedUser = users.find(user => user.id === +userId) || null;

  // const isRequiredParams = (
  //   foundedUser
  //   && userId
  //   && spentAt
  //   && title
  //   && amount
  //   && category
  //   && note
  // );

  // if (!isRequiredParams) {
  //   res.sendStatus(400);

  //   return;
  // }

  // const newExpense = {
  //   id: generateUnicId(),
  //   userId,
  //   spentAt,
  //   title,
  //   amount,
  //   category,
  //   note,
  // };

  // expenses.push(newExpense);

  // res.statusCode = 201;
  // res.send(newExpense);
  // });

  // app.delete('/expenses/:expenseId', express.json(), (req, res) => {
  // const { expenseId } = req.params;

  // if (!expenseId) {
  //   res.sendStatus(400);

  //   return;
  // }

  // const foundedExpense = expenses
  //   .find(expense => expense.id === +expenseId) || null;

  // if (!foundedExpense) {
  //   res.sendStatus(404);

  //   return;
  // }

  // expenses = expenses.filter(expense => expense.id !== +expenseId);

  // res.sendStatus(204);
  // });

  // app.patch('/expenses/:expenseId', express.json(), (req, res) => {
  // const { expenseId } = req.params;
  // const requiredParams = req.body;

  // if (!expenseId) {
  //   res.sendStatus(400);

  //   return;
  // }

  // const foundedExpense = expenses
  //   .find(expense => expense.id === +expenseId) || null;

  // if (!foundedExpense) {
  //   res.sendStatus(404);

  //   return;
  // }

  // Object.assign(foundedExpense, requiredParams);

  // res.send(foundedExpense);
  // });

  return app;
}

module.exports = {
  createServer,
};
