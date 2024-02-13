'use strict';

const expenseService = require('../services/expense.service');
const userService = require('../services/user.service');

const getAll = (req, res) => {
  const query = req.query;

  res.json(expenseService.readAll(query));
};

const get = (req, res) => {
  const { id } = req.params;
  const expense = expenseService.read(+id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.json(expenseService.read(expense.id));
};

const create = (req, res) => {
  const body = req.body;
  const user = userService.read(+body.userId);

  if ((!body.hasOwnProperty('userId')
    || !body.hasOwnProperty('spentAt')
    || !body.hasOwnProperty('title')
    || !body.hasOwnProperty('amount')
    || !body.hasOwnProperty('category')
    || !body.hasOwnProperty('note'))
    || !user) {
    res.sendStatus(400);

    return;
  }

  res.status(201).json(expenseService.create(body));
};

const remove = (req, res) => {
  const { id } = req.params;
  const expense = expenseService.read(+id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  expenseService.remove(expense.id);

  res.sendStatus(204);
};

const update = (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const expense = expenseService.read(+id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.json(expenseService.update(expense.id, body));
};

module.exports = {
  getAll,
  get,
  create,
  remove,
  update,
};
