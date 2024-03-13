'use strict';

const expenseServices = require('../services/expense.service');
const userServices = require('../services/user.service');
const codeStatuses = require('../variables');

const getAll = (req, res) => {
  const {
    userId,
    categories,
    from,
    to,
  } = req.query;

  res.send(expenseServices.getAll({
    userId,
    categories,
    from,
    to,
  }));
};

const get = (req, res) => {
  const {
    expenseId,
  } = req.params;

  const choosedExpense = expenseServices.getById(expenseId);

  if (!choosedExpense) {
    res.sendStatus(codeStatuses.NOT_FOUND_CODE_STATUS);

    return;
  }

  res.send(choosedExpense);
};

const update = (req, res) => {
  const {
    expenseId,
  } = req.params;
  const data = req.body;
  const choosedExpense = expenseServices.getById(expenseId);

  if (!choosedExpense) {
    res.sendStatus(codeStatuses.NOT_FOUND_CODE_STATUS);

    return;
  }

  const updatedExpense = expenseServices.update(choosedExpense, data);

  res.send(updatedExpense);
};

const remove = (req, res) => {
  const { expenseId } = req.params;

  if (!expenseServices.getById(expenseId)) {
    res.sendStatus(codeStatuses.NOT_FOUND_CODE_STATUS);

    return;
  }

  expenseServices.remove(expenseId);

  res.sendStatus(codeStatuses.UNDERSTANDING_CODE_STATUS);
};

const create = (req, res) => {
  const data = req.body;

  if (!userServices.getById(data.userId)) {
    res.sendStatus(codeStatuses.BAD_REQUEST_CODE_STATUS);

    return;
  }

  const newExpense = expenseServices.create(data);

  res.status(codeStatuses.CREATED_CODE_STATUS).send(newExpense);
};

module.exports = {
  getAll,
  get,
  update,
  remove,
  create,
};
