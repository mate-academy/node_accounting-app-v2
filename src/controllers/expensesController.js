'use strict';

const expensesService = require('./../services/expensesService');
const usersService = require('./../services/usersService');

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
    res.sendStatus(400);

    return;
  }

  const newExpense = expensesService.create(expense);

  res.statusCode = 201;
  res.send(newExpense);
};

const getOne = (req, res) => {
  const { id } = req.params;

  if (!id || !isFinite(id)) {
    res.sendStatus(400);

    return;
  }

  const expense = expensesService.getById(+id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.send(expense);
};

const remove = (req, res) => {
  const { id } = req.params;

  if (!id || !isFinite(id)) {
    res.sendStatus(400);

    return;
  }

  if (expensesService.getById(+id)) {
    expensesService.remove(+id);

    res.sendStatus(204);

    return;
  }

  res.sendStatus(404);
};

const update = (req, res) => {
  const { id } = req.params;
  const body = req.body;

  if (!id || !isFinite(id) || !body) {
    res.sendStatus(400);

    return;
  }

  if (!expensesService.getById(+id)) {
    res.sendStatus(404);

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
