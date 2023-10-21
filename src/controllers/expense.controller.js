/* eslint-disable no-console */
'use strict';

const {
  STATUS_CODE_OK,
  STATUS_CODE_CREATED,
  STATUS_CODE_NO_CONTENT,
  STATUS_CODE_BAD_REQUEST,
  STATUS_CODE_NOT_FOUND,
} = require('../constants');

const expenseService = require('../services/expense.service');
const userService = require('../services/user.service');

const getAll = (req, res) => {
  const {
    userId,
    categories,
    from,
    to,
  } = req.query;

  let filteredExpenses = expenseService.getAll();

  if (userId) {
    filteredExpenses = filteredExpenses
      .filter(expense => expense.userId === +userId);
  }

  if (categories) {
    filteredExpenses = filteredExpenses.filter(
      ({ category }) => categories.includes(category)
    );
  }

  if (from) {
    filteredExpenses = filteredExpenses.filter(
      ({ spentAt }) => new Date(spentAt).valueOf() >= new Date(from).valueOf()
    );
  }

  if (to) {
    filteredExpenses = filteredExpenses.filter(
      ({ spentAt }) => new Date(spentAt).valueOf() <= new Date(to).valueOf()
    );
  }

  res.statusCode = STATUS_CODE_OK;
  res.send(filteredExpenses);
};

const getById = (req, res) => {
  const expenseId = Number(req.params.id);

  const expense = expenseService.getById(expenseId);

  if (!expense) {
    res.sendStatus(STATUS_CODE_NOT_FOUND);

    return;
  }

  const user = userService.getById(expense.userId);

  if (!user && !expense.userId) {
    res.sendStatus(STATUS_CODE_BAD_REQUEST);

    return;
  }

  res.statusCode = STATUS_CODE_OK;
  res.send(expense);
};

const update = (req, res) => {
  const expenseId = Number(req.params.id);
  const body = req.body;

  const expense = expenseService.getById(expenseId);

  if (!expense || !body) {
    res.sendStatus(STATUS_CODE_NOT_FOUND);

    return;
  }

  const user = userService.getById(expense.userId);

  if (!user) {
    res.sendStatus(STATUS_CODE_BAD_REQUEST);

    return;
  }

  const updatedExpense = expenseService.update(
    expenseId,
    body,
  );

  res.statusCode = STATUS_CODE_OK;
  res.send(updatedExpense);
};

const create = (req, res) => {
  const {
    title,
    amount,
    category,
    userId,
  } = req.body;

  if (!title || !amount || !category || !userId) {
    res.sendStatus(STATUS_CODE_BAD_REQUEST);

    return;
  }

  if (!userService.getById(+userId)) {
    res.sendStatus(STATUS_CODE_BAD_REQUEST);

    return;
  }

  const expense = expenseService.create(req.body);

  res.statusCode = STATUS_CODE_CREATED;
  res.send(expense);
};

const remove = (req, res) => {
  const expenseId = Number(req.params.id);

  if (!expenseService.getById(+expenseId)) {
    res.sendStatus(STATUS_CODE_NOT_FOUND);

    return;
  }

  expenseService.deleteExpense(+expenseId);

  res.sendStatus(STATUS_CODE_NO_CONTENT);
};

module.exports = {
  update,
  getAll,
  getById,
  create,
  remove,
};
