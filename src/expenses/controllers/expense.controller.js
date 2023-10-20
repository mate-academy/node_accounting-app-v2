'use strict';

const expenseService = require('../services/expense.service.js');
const userService = require('../../users/services/user.service.js');
const statusesConstants = require('../../statusesConstants.js');
const helper = require('../../helper.js');

const getAll = (req, res) => {
  res.send(expenseService.getAll(req.query));
};

const getById = (req, res) => {
  const id = Number(req.params.id);

  const expense = expenseService.getById(id);

  if (!expense) {
    res.sendStatus(statusesConstants.NOT_FOUND);

    return;
  }

  res.send(expense);
};

const create = (req, res) => {
  if (!userService.getById(Number(req.body.userId))) {
    res.sendStatus(statusesConstants.BAD_REQUEST);

    return;
  }

  const expense = expenseService.create(
    req.body
  );

  res.statusCode = statusesConstants.CREATED;

  res.send(expense);
};

const update = (req, res) => {
  const id = Number(req.params.id);
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
  } = req.body;

  const expense = expenseService.getById(id);

  if (!expense) {
    res.sendStatus(statusesConstants.NOT_FOUND);

    return;
  }

  if (helper.isExpense(
    userId,
    spentAt,
    title,
    amount,
    category)) {
    res.sendStatus(statusesConstants.BAD_REQUEST);

    return;
  }

  const updatedExpense = expenseService.update({
    id,
    ...req.body,
  });

  res.send(updatedExpense);
};

const remove = (req, res) => {
  const id = Number(req.params.id);

  if (!expenseService.getById(id)) {
    res.sendStatus(statusesConstants.NOT_FOUND);

    return;
  }

  expenseService.remove(id);

  res.sendStatus(statusesConstants.NO_CONTENT);
};

module.exports = {
  get: getAll,
  getOne: getById,
  create,
  update,
  remove,
};
