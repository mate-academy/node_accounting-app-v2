'use strict';

const expensesService = require('./services/expenses');

const getAll = (req, res) => {
  const expens = expensesService.getAll();

  if (!expens) {
    res.sendStatus(400);

    return;
  }

  res.send(expens);
};

const getOne = (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    res.sendStatus(400);

    return;
  }

  const foundExpens = expensesService.getById(userId);

  if (!foundExpens) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpens);
};

const add = (req, res) => {
  const { name } = req.body;

  if (!name) {
    req.sendStatus(422);

    return;
  }

  const newExpens = expensesService.create(name);

  res.statusCode(201);
  res.send(newExpens);
};

const remove = (req, res) => {
  const { expensId } = req.params;

  const foundExpens = expensesService.getById(expensId);

  if (!foundExpens) {
    res.statusCode(404);

    return;
  }

  expensesService(expensId);
  res.sendStatus(204);
};

const update = (req, res) => {
  const { expensId } = req.params;
  const foundExpens = expensesService.getById(expensId);

  if (!foundExpens) {
    res.sendStatus(404);

    return;
  }

  const { ...params } = req.body;

  Object.assign(foundExpens, { params });

  res.send(foundExpens);
};

module.exports = {
  getAll,
  getOne,
  add,
  remove,
  update,
};
