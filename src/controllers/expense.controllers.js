'use strict';

const expenseServices = require('../services/expense.services');
const userServices = require('../services/user.service');
const codeStuses = require('../variables');

const getAll = (req, res) => {
  const { userId, categories, from, to } = req.query;

  res.statusCode = codeStuses.SUCCESS_CODE_STATUS;

  res.send(expenseServices.getAll({
    userId, categories, from, to,
  }));
};

const get = (req, res) => {
  const { id } = req.params;

  const choosedExpense = expenseServices.getById(id);

  if (!choosedExpense) {
    res.sendStatus(codeStuses.NOT_FOUND_CODE_STATUS);

    return;
  }

  res.send(choosedExpense);
};

const create = (req, res) => {
  const data = req.body;

  if (!userServices.getById(data.userId)) {
    res.sendStatus(codeStuses.BAD_REQUEST_CODE_STATUS);

    return;
  }

  const newExpense = expenseServices.create(data);

  res.status(201).send(newExpense);
};

const remove = (req, res) => {
  const { id } = req.params;

  if (!expenseServices.getById(id)) {
    res.sendStatus(codeStuses.NOT_FOUND_CODE_STATUS);

    return;
  }

  expenseServices.remove(id);

  res.sendStatus(codeStuses.UNDERSTANDING_CODE_STATUS);
};

const update = (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const choosedExpense = expenseServices.getById(id);

  if (!choosedExpense) {
    res.sendStatus(codeStuses.NOT_FOUND_CODE_STATUS);

    return;
  }

  const updatedExpense = expenseServices.update(choosedExpense, data);

  res.send(updatedExpense);
};

module.exports = {
  get,
  getAll,
  create,
  remove,
  update,
};
