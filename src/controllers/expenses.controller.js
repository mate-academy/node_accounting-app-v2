'use strict';

const expensesService = require('../services/expenses.service');
const usersSevice = require('../services/users.service');

const get = (req, res) => {
  const {
    userId,
    categories,
    from,
    to,
  } = req.query;

  let expenses = expensesService.getAllExpenses();

  if (userId) {
    expenses = expenses.filter(expense => expense.userId === +(userId));
  }

  if (categories) {
    expenses = expenses
      .filter(expense => categories.includes(expense.category));
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

const getOne = (req, res) => {
  const { id } = req.params;

  const expense = expensesService.getExpenseById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.send(expense);
};

const post = (req, res) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  if (!usersSevice.getUserById(userId)) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expensesService.addExpense(
    userId,
    spentAt,
    title,
    amount,
    category,
    note
  );

  res.status(201);
  res.send(newExpense);
};

const patch = (req, res) => {
  const { id } = req.params;
  const expenseToUpdate = req.body;

  if (!id || !expenseToUpdate) {
    res.sendStatus(400);

    return;
  }

  const expense = expensesService.updateExpense(id, expenseToUpdate);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.send(expense);
};

const remove = (req, res) => {
  const { id } = req.params;

  if (!expensesService.getExpenseById(id)) {
    res.sendStatus(404);

    return;
  }

  expensesService.deleteExpense(id);
  res.sendStatus(204);
};

module.exports = {
  get,
  getOne,
  post,
  patch,
  remove,
};
