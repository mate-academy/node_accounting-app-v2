'use strict';

const expenseService = require('./../serveces/expense.serveces');

const get = (req, res) => {
  if (!Object.keys(req.query).length) {
    res.send(expenseService.getAll());

    return;
  }

  res.send(expenseService.getSome(req.query));
};

const getOne = (req, res) => {
  const { id } = req.params;

  if (isNaN(+id)) {
    res.sendStatus(400);

    return;
  }

  const expense = expenseService.getById(+id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.send(expense);
};

const create = (req, res) => {
  if (!expenseService.isValidCreateBody(req.body)) {
    res.sendStatus(400);

    return;
  }

  res.statusCode = 201;
  res.send(expenseService.create(req.body));
};

const remove = (req, res) => {
  const { id } = req.params;

  if (isNaN(+id)) {
    res.sendStatus(400);
  }

  const expense = expenseService.getById(+id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  expenseService.remove(+id);
  res.sendStatus(204);
};

const update = (req, res) => {
  const { id } = req.params;

  if (isNaN(+id) || !expenseService.isValidUpdateBody(req.body)) {
    res.sendStatus(400);

    return;
  }

  if (!expenseService.getById(+id)) {
    res.sendStatus(404);

    return;
  }

  res.send(expenseService.update(+id, req.body));
};

module.exports = {
  get,
  getOne,
  create,
  remove,
  update,
};
