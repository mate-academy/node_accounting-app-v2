'use strict';

const expensesService = require('../services/expenses.service');
const userService = require('../services/users.service');
const statusCodes = require('../vars/statusCodes');

const getAll = (req, res) => {
  const {
    userId,
    from,
    to,
    category,
    categories,
  } = req.query;

  let expenses = expensesService.getAll();

  if (userId) {
    expenses = expenses.filter(expense => expense.userId === Number(userId));
  }

  if (category && !categories) {
    expenses = expenses
      .filter(expense => expense.category === category);
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
  if (!userService.getById(req.body.userId)) {
    res.sendStatus(statusCodes.BAD_REQUEST);

    return;
  }

  const newExpense = {
    id: +new Date(),
    ...req.body,
  };

  expensesService.add(newExpense);

  res.statusCode = statusCodes.CREATED;
  res.send(newExpense);
};

const getById = (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(statusCodes.BAD_REQUEST);

    return;
  }

  const searchedExpense = expensesService.getById(id);

  if (!searchedExpense) {
    res.sendStatus(statusCodes.NOT_FOUND);

    return;
  }

  res.send(searchedExpense);
};

const remove = (req, res) => {
  const { id } = req.params;
  const searchedExpense = expensesService.getById(id);

  if (!searchedExpense) {
    res.sendStatus(404);

    return;
  }

  expensesService.remove(id);
  res.sendStatus(statusCodes.DELETED);
};

const updateExpense = (req, res) => {
  const { id } = req.params;

  if (!expensesService.getById(id)) {
    res.sendStatus(statusCodes.NOT_FOUND);

    return;
  }

  res.send(expensesService.update(id, req.body));
};

module.exports = {
  getAll,
  post,
  getById,
  remove,
  updateExpense,
};
