'use strict';

const expensesService = require('../services/expenses.service');
const userService = require('../services/user.service');
const { STATUS_CODE } = require('../utils/constants');

const getAll = (req, res) => {
  const {
    userId,
    from,
    to,
    categories,
  } = req.query;

  let category;

  if (categories) {
    category = Array.isArray(categories)
      ? [...categories]
      : [categories];
  }

  let expenses = expensesService.getAll();

  if (userId) {
    expenses = expenses.filter(expense => expense.userId === Number(userId));
  }

  if (category && category.length) {
    expenses = expenses
      .filter(expense => category.includes(expense.category));
  }

  if (from) {
    expenses = expenses
      .filter(expense =>
        Number(new Date(expense.spentAt)) >= Number(new Date(from)));
  }

  if (to) {
    expenses = expenses
      .filter(expense =>
        Number(new Date(expense.spentAt)) <= Number(new Date(to)));
  }

  res.send(expenses);
};

const getById = (req, res) => {
  const { id } = req.params;

  const expense = expensesService.getById(id);

  if (!expense) {
    res.sendStatus(STATUS_CODE.NOT_FOUND);

    return;
  }

  res.send(expense);
};

const create = (req, res) => {
  const {
    userId,
    ...params
  } = req.body;

  const user = userService.getById(userId);

  if (!user) {
    res.sendStatus(STATUS_CODE.BAD_REQUEST);

    return;
  }

  const newExpense = {
    id: +new Date(),
    ...params,
    userId,
  };

  const expense = expensesService.add(newExpense);

  res.statusCode = STATUS_CODE.CREATED_SUCCESS;

  res.send(expense);
};

const remove = (req, res) => {
  const { id } = req.params;

  if (!expensesService.getById(id)) {
    res.sendStatus(STATUS_CODE.NOT_FOUND);

    return;
  }

  expensesService.remove(id);

  res.sendStatus(STATUS_CODE.NO_CONTENT);
};

const update = (req, res) => {
  const { id } = req.params;

  const expense = expensesService.getById(id);

  if (!expense) {
    res.sendStatus(STATUS_CODE.NOT_FOUND);

    return;
  }

  const updatedExpense = expensesService.update(id, req.body);

  res.send(updatedExpense);
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
};
