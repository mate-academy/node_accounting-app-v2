'use strict';

const { STATUS_MESSAGES } = require('../utils/constants');
const usersService = require('../services/users.service');
const expensesService = require('../services/expenses.service');

const getAll = (req, res) => {
  const {
    userId,
    from,
    to,
  } = req.query;

  const normalizedURL = new URL('http://localhost:3000/' + req.url);
  const categories = normalizedURL.searchParams.getAll('categories');
  let expenses = expensesService.getAll();

  if (userId) {
    expenses = expenses.filter(expense => expense.userId === Number(userId));
  }

  if (categories.length) {
    expenses = expenses
      .filter(expense => categories.includes(expense.category));
  }

  if (from && to) {
    expenses = expenses
      .filter(expense =>
        Number(new Date(expense.spentAt)) >= Number(new Date(from))
        && Number(new Date(expense.spentAt)) <= Number(new Date(to)));
  }

  res.statusCode = STATUS_MESSAGES.OPERATION_SUCCESSFUL;
  res.send(expenses);
};

const getOne = (req, res) => {
  const id = Number(req.params.id);

  if (!id) {
    res.sendStatus(STATUS_MESSAGES.BAD_REQUEST);

    return;
  }

  const expense = expensesService.getById(id);

  if (!expense) {
    res.sendStatus(STATUS_MESSAGES.NOT_FOUND);

    return;
  }

  res.statusCode = STATUS_MESSAGES.OPERATION_SUCCESSFUL;
  res.send(expense);
};

const create = (req, res) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  const user = usersService.getById(Number(userId));

  if (!user) {
    res.sendStatus(STATUS_MESSAGES.BAD_REQUEST);

    return;
  }

  const newExpense = {
    id: Number(new Date()),
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  const expense = expensesService.add(newExpense);

  res.statusCode = STATUS_MESSAGES.NEW_RESOURCE_CREATED;
  res.send(expense);
};

const update = (req, res) => {
  const id = Number(req.params.id);

  if (!id || !req.body) {
    res.sendStatus(STATUS_MESSAGES.BAD_REQUEST);

    return;
  }

  const expense = expensesService.getById(id);

  if (!expense) {
    res.sendStatus(STATUS_MESSAGES.NOT_FOUND);

    return;
  }

  const updatedExpense = expensesService.updateById(id, req.body);

  res.statusCode = STATUS_MESSAGES.OPERATION_SUCCESSFUL;
  res.send(updatedExpense);
};

const remove = (req, res) => {
  const id = Number(req.params.id);

  if (!id) {
    res.sendStatus(STATUS_MESSAGES.BAD_REQUEST);

    return;
  }

  const expense = expensesService.getById(id);

  if (!expense) {
    res.sendStatus(STATUS_MESSAGES.NOT_FOUND);

    return;
  }

  expensesService.remove(id);

  res.sendStatus(STATUS_MESSAGES.ITEM_DELETED);
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
};
