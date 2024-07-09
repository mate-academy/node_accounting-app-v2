'use strict';

const expensesService = require('../services/expensesService');
const usersService = require('../services/usersService');

const codeStatus = require('../codeStatuses');

const getAll = (req, res) => {
  const { userId, categories, from, to } = req.query;

  res.statusCode = codeStatus.SUCCESS;

  res.send(
    expensesService.getAll({
      userId,
      categories,
      from,
      to,
    }),
  );
};

const get = (req, res) => {
  const { id } = req.params;

  const choosedExpense = expensesService.getById(id);

  if (!choosedExpense) {
    res.sendStatus(codeStatus.NOT_FOUND);

    return;
  }

  res.send(choosedExpense);
};

const create = (req, res) => {
  const data = req.body;

  if (!usersService.getUserById(data.userId)) {
    res.sendStatus(codeStatus.BAD_REQUEST);

    return;
  }

  const newExpense = expensesService.create(data);

  res.status(201).send(newExpense);
};

const remove = (req, res) => {
  const { id } = req.params;

  if (!expensesService.getById(id)) {
    res.sendStatus(codeStatus.NOT_FOUND);

    return;
  }

  expensesService.remove(id);

  res.sendStatus(codeStatus.UNDERSTOOD);
};

const update = (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const choosedExpense = expensesService.getById(id);

  if (!choosedExpense) {
    res.sendStatus(codeStatus.NOT_FOUND);

    return;
  }

  const updatedExpense = expensesService.update(choosedExpense, data);

  res.send(updatedExpense);
};

module.exports = {
  get,
  getAll,
  create,
  remove,
  update,
};
