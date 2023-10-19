'use strict';

const expensesService = require('../services/expenses.service');
const usersSevice = require('../services/users.service');
const statusCodes = require('../constants/statusCodes');

const getAll = (req, res) => {
  const {
    userId,
    categories,
    from,
    to,
  } = req.query;

  let expenses = expensesService.getAllExpenses();

  if (userId) {
    expenses = expenses.filter(expense => expense.userId === Number(userId));
  }

  if (categories) {
    const checkedCategories = Array.isArray(categories)
      ? categories
      : [categories];

    expenses = expenses
      .filter(expense => checkedCategories.includes(expense.category));
  }

  if (from) {
    const date = new Date(from);

    expenses = expenses
      .filter(expense => new Date(expense.spentAt) > date);
  }

  if (to) {
    const date = new Date(to);

    expenses = expenses
      .filter(expense => new Date(expense.spentAt) < date);
  }

  res.send(expenses);
};

const getById = (req, res) => {
  const { id } = req.params;

  const expense = expensesService.getExpenseById(id);

  if (!expense) {
    res.sendStatus(statusCodes.NOT_FOUND);

    return;
  }

  res.send(expense);
};

const post = (req, res) => {
  const { userId } = req.body;

  if (!usersSevice.getUserById(userId)) {
    res.sendStatus(statusCodes.BAD_REQUEST);

    return;
  }

  const newExpense = expensesService.addExpense(req.body);

  res.status(statusCodes.CREATED);
  res.send(newExpense);
};

const patch = (req, res) => {
  const { id } = req.params;
  const expenseToUpdate = req.body;

  if (!id || !expenseToUpdate) {
    res.sendStatus(statusCodes.BAD_REQUEST);

    return;
  }

  const expense = expensesService.updateExpense(id, expenseToUpdate);

  if (!expense) {
    res.sendStatus(statusCodes.NOT_FOUND);

    return;
  }

  res.send(expense);
};

const remove = (req, res) => {
  const { id } = req.params;

  if (!expensesService.getExpenseById(id)) {
    res.sendStatus(statusCodes.NOT_FOUND);

    return;
  }

  expensesService.deleteExpense(id);
  res.sendStatus(statusCodes.NO_CONTENT);
};

module.exports = {
  getAll,
  getById,
  post,
  patch,
  remove,
};
