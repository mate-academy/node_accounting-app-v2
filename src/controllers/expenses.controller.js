'use strict';

const { ExpenseServises } = require('../services/expenses.service');
const { UserServices } = require('../services/users.service');
const { STATUS_CODE } = require('../utils/constants');

const getExpenses = (req, res) => {
  const { userId, from, to, categories } = req.query;

  let expenses = ExpenseServises.getExpenses();

  if (userId) {
    expenses = expenses.filter(expense => expense.userId === Number(userId));
  }

  if (categories) {
    expenses = expenses.filter(expense =>
      categories.includes(expense.category));
  }

  if (from) {
    expenses = expenses.filter(expense => {
      return (new Date(expense.spentAt) >= new Date(from));
    });
  }

  if (to) {
    expenses = expenses.filter(expense => {
      return (new Date(expense.spentAt) <= new Date(to));
    });
  }

  res.statusCode = STATUS_CODE.OK;
  res.send(expenses);
};

const getExpense = (req, res) => {
  const { id } = req.params;

  const expense = ExpenseServises.findExpense(Number(id));

  if (!expense) {
    res.sendStatus(STATUS_CODE.NOT_FOUND);

    return;
  }

  res.statusCode = STATUS_CODE.OK;
  res.send(expense);
};

const deleteExpense = (req, res) => {
  const { id } = req.params;

  const expense = ExpenseServises.findExpense(Number(id));

  if (!expense) {
    res.sendStatus(STATUS_CODE.NOT_FOUND);

    return;
  }

  ExpenseServises.deleteExpense(Number(id));

  res.sendStatus(STATUS_CODE.NO_CONTENT);
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
    res.sendStatus(STATUS_CODE.BAD_REQUEST);

    return;
  }

  if (!UserServices.findUser(Number(userId))) {
    res.sendStatus(STATUS_CODE.BAD_REQUEST);

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

  res.statusCode = STATUS_CODE.CREATED_SUCCESS;
  res.send(expense);
};

const updateExpense = (req, res) => {
  const { id } = req.params;

  const expense = ExpenseServises.findExpense(Number(id));

  if (!expense) {
    res.sendStatus(STATUS_CODE.NOT_FOUND);

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
