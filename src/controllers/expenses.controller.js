'use strict';

const { ExpenseServises } = require('../services/expenses.service');
const { UserServices } = require('../services/users.service');

const getExpenses = (req, res) => {
  const { userId, from, to } = req.query;

  const url = new URL(req.url, 'http://localhost:3000/' + req.url);
  const categories = url.searchParams.getAll('categories');

  let expenses = ExpenseServises.getExpenses();

  if (userId) {
    expenses = expenses.filter(exp => exp.userId === +userId);
  }

  if (categories.length) {
    expenses = expenses.filter(exp => categories.includes(exp.category));
  }

  if (from) {
    expenses = expenses.filter(exp => {
      return (new Date(exp.spentAt) >= new Date(from));
    });
  }

  if (to) {
    expenses = expenses.filter(exp => {
      return (new Date(exp.spentAt) <= new Date(to));
    });
  }

  res.statusCode = 200;
  res.send(expenses);
};

const getExpense = (req, res) => {
  const { id } = req.params;

  const expense = ExpenseServises.findExpense(+id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;
  res.send(expense);
};

const deleteExpense = (req, res) => {
  const { id } = req.params;

  const expense = ExpenseServises.findExpense(+id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  ExpenseServises.deleteExpense(+id);

  res.sendStatus(204);
};

const createExpense = (req, res) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  if (!title) {
    res.sendStatus(400);

    return;
  }

  if (!UserServices.findUser(+userId)) {
    res.sendStatus(400);

    return;
  }

  const expense = {
    id: +new Date(),
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  ExpenseServises.createExpense(expense);

  res.statusCode = 201;
  res.send(expense);
};

const updateExpense = (req, res) => {
  const { id } = req.params;

  const expense = ExpenseServises.findExpense(+id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  ExpenseServises.updateExpense(expense, req.body);

  res.send(expense);
};

const ExpensesController = {
  getExpenses,
  getExpense,
  deleteExpense,
  createExpense,
  updateExpense,
};

module.exports = {
  ExpensesController,
};
