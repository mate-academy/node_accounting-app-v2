'use strict';

const { expensesService } = require('../services/expenses.service.js');
const { userService } = require('../services/user.service.js');

const get = (req, res) => {
  res.send(expensesService.getAll(req.query));
};

const getOne = (req, res) => {
  const { id } = req.params;

  const expense = expensesService.getById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

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

  if (!userId || !spentAt || !title || !amount || !category || !note) {
    res.sendStatus(422);

    return;
  }

  if (
    !userService.getById(userId)
    || !(new Date(spentAt) instanceof Date)
    || typeof title !== 'string'
    || typeof amount !== 'number'
    || typeof category !== 'string'
    || typeof note !== 'string'
  ) {
    res.sendStatus(422);

    return;
  }

  const expense = expensesService.create(req.body);

  res.statusCode = 201;

  res.send(expense);
};

const update = (req, res) => {
  const { id } = req.params;
  const {
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  const expense = expensesService.getById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  if (
    (spentAt && !(new Date(spentAt) instanceof Date))
    || (title && typeof title !== 'string')
    || (amount && typeof amount !== 'number')
    || (category && typeof category !== 'string')
    || (note && typeof note !== 'string')
  ) {
    res.sendStatus(422);

    return;
  }

  const updatedUser = expensesService.update(id, req.body);

  res.send(updatedUser);
};

const remove = (req, res) => {
  const { id } = req.params;

  if (!expensesService.getById(id)) {
    res.sendStatus(404);

    return;
  }

  expensesService.remove(id);

  res.sendStatus(204);
};

module.exports.expensesController = {
  get,
  getOne,
  create,
  update,
  remove,
};
