'use strict';

const expenseService = require('../services/expense.service.js');
const userService = require('../../users/services/user.service.js');
const statusesConstants = require('../../statusesConstants.js');

const getAll = (req, res) => {
  res.send(expenseService.getAll(
    Number(req.query.userId),
    req.query.categories,
    req.query.from ? new Date(req.query.from) : undefined,
    req.query.to ? new Date(req.query.to) : undefined,
  ));
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

const defineParamsType = (body) => {
  return {
    ...body,
    userId: body.userId === undefined
      ? undefined
      : Number(body.userId),
    spentAt: body.spentAt === undefined
      ? undefined
      : new Date(body.spentAt),
    amount: body.amount === undefined
      ? undefined
      : Number(body.amount),
  };
};

const create = (req, res) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = defineParamsType(req.body);

  if (!userService.getById(userId)) {
    res.sendStatus(statusesConstants.BAD_REQUEST);

    return;
  }

  const expense = expenseService.create(
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
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
    note,
  }
    = defineParamsType(req.body);

  const expense = expenseService.getById(id);

  if (!expense) {
    res.sendStatus(statusesConstants.NOT_FOUND);

    return;
  }

  if (typeof userId !== 'number'
    && typeof spentAt !== 'object'
    && typeof title !== 'string'
    && typeof amount !== 'number'
    && typeof category !== 'string'
  ) {
    res.sendStatus(statusesConstants.NOT_FOUND);

    return;
  }

  const updatedExpense = expenseService.update(
    id,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  );

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
