'use strict';

const expensesService = require('../services/expenses.service');
const userService = require('../services/users.service');

const get = (req, res) => {
  const {
    userId,
    from,
    to,
    categories,
  } = req.query;

  let expenses = expensesService.getAll();

  if (userId) {
    expenses = expenses.filter(expense => expense.userId === Number(userId));
  }

  if (categories) {
    expenses = expenses
      .filter(expense => categories.includes(expense.category));
  }

  if (from) {
    expenses = expenses
      .filter(expense => (
        new Date(expense.spentAt).valueOf() > new Date(from).valueOf())
      );
  }

  if (to) {
    expenses = expenses
      .filter(expense => (
        new Date(expense.spentAt).valueOf() < new Date(to).valueOf())
      );
  }

  res.send(expenses);
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

  if (!userService.getById(userId)) {
    res.sendStatus(400);

    return;
  }

  const newExpense = {
    id: +new Date(),
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expensesService.add(newExpense);

  res.statusCode = 201;
  res.send(newExpense);
};

const getExpense = (req, res) => {
  const { id } = req.params;
  const searchedExpense = expensesService.getById(id);

  if (!searchedExpense) {
    res.sendStatus(404);

    return;
  }

  if (!id) {
    res.sendStatus(400);

    return;
  }

  res.send(searchedExpense);
};

const removeExpense = (req, res) => {
  const { id } = req.params;
  const hasExpense = expensesService.getById(id);

  if (!hasExpense) {
    res.sendStatus(404);

    return;
  }

  expensesService.remove(id);
  res.sendStatus(204);
};

const updateExpense = (req, res) => {
  const { id } = req.params;

  if (!expensesService.getById(id)) {
    res.sendStatus(404);

    return;
  }

  res.send(expensesService.update(id, req.body));
};

module.exports = {
  get,
  post,
  getExpense,
  removeExpense,
  updateExpense,
};
