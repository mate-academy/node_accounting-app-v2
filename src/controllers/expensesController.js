'use strict';

const expensesService = require('../services/expensesService');
const usersService = require('../services/usersService');

const timestampRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;

const get = async(req, res) => {
  res.status(200).json(expensesService.getAll(req.query));
};

const post = async(req, res) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  if (typeof userId !== 'number'
      || typeof spentAt !== 'string'
      || typeof title !== 'string'
      || typeof amount !== 'number'
      || typeof category !== 'string'
      || typeof note !== 'string'
      || !usersService.getById(userId)
      || !timestampRegex.test(spentAt)) {
    res.status(400).end();

    return;
  }

  res.status(201).json(expensesService.addExpense(req.body));
};

const getOne = async(req, res) => {
  const { id } = req.params;

  if (Number.isNaN(+id)) {
    res.status(400).end();

    return;
  }

  const expense = expensesService.getById(+id);

  if (!expense) {
    res.status(404).end();

    return;
  }

  res.status(200).json(expense);
};

const deleteOne = async(req, res) => {
  const { id } = req.params;

  if (!expensesService.deleteById(+id)) {
    res.status(404).end();

    return;
  }

  res.status(204).end();
};

const patchOne = async(req, res) => {
  const { id } = req.params;

  if (Number.isNaN(+id)) {
    res.status(400).end();

    return;
  }

  // eslint-disable-next-line object-curly-newline
  const expense = expensesService.updateById({ ...req.body, id: +id });

  if (!expense) {
    res.status(404).end();

    return;
  }

  res.status(200).json(expense);
};

module.exports = {
  get,
  post,
  getOne,
  deleteOne,
  patchOne,
};
