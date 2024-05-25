'use strict';

const userService = require('../services/userService');
const expenseService = require('../services/expenseService');

const getAll = (req, res) => {
  res.send(expenseService.getAll(req.query));
};

const create = (req, res) => {
  const { userId, spentAt, title, amount, category } = req.body;

  if (
    !userService.getById(userId) ||
    !spentAt ||
    !title ||
    !amount ||
    !category
  ) {
    return res.sendStatus(400);
  }

  res.status(201);
  res.send(expenseService.create(req.body));
};

const get = (req, res) => {
  const { id } = req.params;

  const expense = expenseService.getById(id);

  if (!expense) {
    return res.sendStatus(404);
  }

  res.send(expense);
};

const update = (req, res) => {
  const { id } = req.params;

  const expense = expenseService.getById(id);

  if (!expense) {
    return res.sendStatus(404);
  }

  res.send(expenseService.updateById(id, req.body));
};

const remove = (req, res) => {
  const { id } = req.params;

  if (!expenseService.getById(id)) {
    return res.sendStatus(404);
  }

  expenseService.removeById(id);
  res.sendStatus(204);
};

module.exports = {
  create,
  getAll,
  get,
  update,
  remove,
};
