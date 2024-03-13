'use strict';

const STATUS_CODES = require('../constants/statuses');
const expensesService = require('./../services/expenses.service');
const usersService = require('./../services/users.service');

const get = (req, res) => {
  if (req.query.from && req.query.to) {
    res.send(expensesService.getByDate(req.query.from, req.query.to));

    return;
  }

  if (req.query.userId && req.query.categories) {
    res.send(expensesService
      .getByCategory(+req.query.userId, req.query.categories));

    return;
  }

  if (req.query.userId) {
    res.send(expensesService.getByUserId(+req.query.userId));

    return;
  }

  res.send(expensesService.getAll());
};

const create = (req, res) => {
  const expense = req.body;

  if (!usersService.getById(expense.userId)) {
    res.sendStatus(STATUS_CODES.BAD_REQUEST);

    return;
  }

  const newExpense = expensesService.create(expense);

  res.statusCode = STATUS_CODES.CREATED;
  res.send(newExpense);
};

const getOne = (req, res) => {
  const { id } = req.params;

  if (!id || !isFinite(id)) {
    res.sendStatus(STATUS_CODES.BAD_REQUEST);

    return;
  }

  const expense = expensesService.getById(+id);

  if (!expense) {
    res.sendStatus(STATUS_CODES.NOT_FOUND);

    return;
  }

  res.send(expense);
};

const remove = (req, res) => {
  const { id } = req.params;

  if (!id || !isFinite(id)) {
    res.sendStatus(STATUS_CODES.BAD_REQUEST);

    return;
  }

  if (expensesService.getById(+id)) {
    expensesService.remove(+id);

    res.sendStatus(STATUS_CODES.NO_CONTENT);

    return;
  }

  res.sendStatus(STATUS_CODES.NOT_FOUND);
};

const update = (req, res) => {
  const { id } = req.params;
  const body = req.body;

  if (!id || !isFinite(id) || !body) {
    res.sendStatus(STATUS_CODES.BAD_REQUEST);

    return;
  }

  if (!expensesService.getById(+id)) {
    res.sendStatus(STATUS_CODES.NOT_FOUND);

    return;
  }

  const expense = expensesService.update(+id, body);

  res.send(expense);
};

module.exports = {
  get,
  getOne,
  create,
  remove,
  update,
};
