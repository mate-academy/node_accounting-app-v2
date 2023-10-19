'use strict';

const expenseService = require('../services/expense.service.js');
const userService = require('../../users/services/user.service.js');

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
    res.sendStatus(404);

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
    res.sendStatus(400);

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

  res.statusCode = 201;

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
    res.sendStatus(404);

    return;
  }

  if (typeof userId !== 'number'
    && typeof spentAt !== 'object'
    && typeof title !== 'string'
    && typeof amount !== 'number'
    && typeof category !== 'string'
  ) {
    res.sendStatus(404);

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
    res.sendStatus(404);

    return;
  }

  expenseService.remove(id);

  res.sendStatus(204);
};

module.exports = {
  get: getAll,
  getOne: getById,
  create,
  update,
  remove,
};
