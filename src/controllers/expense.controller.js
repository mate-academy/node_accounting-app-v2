'use strict';

const expenseService = require('../services/expense.service');
const userService = require('../services/user.service');

const getAll = (req, res) => {
  const query = req.query;

  res.json(expenseService.readAll(query));
};

const get = (req, res) => {
  const { id } = req.query;

  if (!expenseService.read(id)) {
    res.sendStatus(404);

    return;
  }

  res.json(expenseService.read(id));
};

const create = (req, res) => {
  const body = req.body;

  if ((!body.hasOwnProperty('userId')
    || !body.hasOwnProperty('spentAt')
    || !body.hasOwnProperty('title')
    || !body.hasOwnProperty('amount')
    || !body.hasOwnProperty('category')
    || !body.hasOwnProperty('note'))
    || !userService.read(body.userId)) {
    res.sendStatus(400);

    return;
  }

  res.status(201).json(expenseService.create(body));
};

const remove = (req, res) => {
  const { id } = req.query;

  if (!expenseService.read(id)) {
    res.sendStatus(404);

    return;
  }

  expenseService.remove(id);

  res.sendStatus(204);
};

const update = (req, res) => {
  const { id } = req.query;
  const body = req.body;

  if (!expenseService.read(id)) {
    res.sendStatus(404);

    return;
  }

  res.json(expenseService.update(id, body));
};

module.exports = {
  getAll,
  get,
  create,
  remove,
  update,
};
