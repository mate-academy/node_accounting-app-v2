'use strict';

const expensesService = require('../services/expensesService');
const usersService = require('../services/usersService');
const {
  BAD_REQUEST,
  NOT_FOUND,
  CREATED,
  SUCCESS,
  NO_CONTENT,
} = require('../utils/statusCodes');

const timestampRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;

const hasPostData = ({
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
}) => {
  return typeof userId !== 'number'
    || typeof spentAt !== 'string'
    || typeof title !== 'string'
    || typeof amount !== 'number'
    || typeof category !== 'string'
    || typeof note !== 'string'
    || !usersService.getById(userId)
    || !timestampRegex.test(spentAt);
};

const getAll = async(req, res) => {
  res.status(SUCCESS).json(expensesService.getAll(req.query));
};

const post = async(req, res) => {
  if (hasPostData(req.body)) {
    res.status(BAD_REQUEST).end();

    return;
  }

  const newExpense = expensesService.addExpense(req.body);

  res.status(CREATED).json(newExpense);
};

const getById = async(req, res) => {
  const { id } = req.params;

  if (Number.isNaN(Number(id))) {
    res.status(BAD_REQUEST).end();

    return;
  }

  const expense = expensesService.getById(Number(id));

  if (!expense) {
    res.status(NOT_FOUND).end();

    return;
  }

  res.status(SUCCESS).json(expense);
};

const remove = async(req, res) => {
  const { id } = req.params;

  if (!expensesService.deleteById(Number(id))) {
    res.status(NOT_FOUND).end();

    return;
  }

  res.status(NO_CONTENT).end();
};

const update = async(req, res) => {
  const { id } = req.params;

  if (Number.isNaN(Number(id))) {
    res.status(BAD_REQUEST).end();

    return;
  }

  const expense = expensesService.updateById({
    ...req.body,
    id: Number(id),
  });

  if (!expense) {
    res.status(NOT_FOUND).end();

    return;
  }

  res.status(SUCCESS).json(expense);
};

module.exports = {
  getAll,
  post,
  getById,
  remove,
  update,
};
