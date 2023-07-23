'use strict';

const expenseService = require('../services/expenses');
const userService = require('../services/users');
const utils = require('../utils/utils.js');

const getByQuery = (req, res) => {
  const filteredExpenses = expenseService.getByParams(req.query);

  res.send(filteredExpenses);
};

const getById = (req, res) => {
  const { expenseId } = req.params;

  if (isNaN(Number(expenseId))) {
    res.sendStatus(400);

    return;
  }

  const expense = expenseService.getById(expenseId);

  if (!expense) {
    res.sendStatus(404);

    // eslint-disable-next-line no-useless-return
    return;
  }

  res.send(expense);
};

const createNew = (req, res) => {
  const reqData = req.body;
  const isDateInvalid = new Date(reqData.spentAt).toString() === 'Invalid Date';
  const requiredFields = ['userId', 'spentAt', 'title', 'amount', 'category'];

  const isHasRequiredFields = requiredFields
    .every(field => field in reqData && !utils.isEmpty(reqData[field]));

  if (isDateInvalid
    || !isHasRequiredFields
    || !userService.getById(reqData.userId)
  ) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expenseService.create(req.body);

  res.status(201);
  res.send(newExpense);
};

const removeById = (req, res) => {
  const { expenseId } = req.params;

  const isSuccess = expenseService.remove(expenseId);

  if (!isSuccess) {
    res.sendStatus(404);

    // eslint-disable-next-line no-useless-return
    return;
  }

  res.sendStatus(204);
};

const editById = (req, res) => {
  const { expenseId } = req.params;
  const dataToEdit = req.body;
  const notAllowedPropsToEdit = ['id', 'userId'];

  const hasNotAllowedProps = Object.entries(dataToEdit)
    .some(([key]) => notAllowedPropsToEdit.includes(key));

  const isSomeFieldsEmpty = Object.entries(dataToEdit)
    .some(([key, value]) => utils.isEmpty(value));

  if (isSomeFieldsEmpty || hasNotAllowedProps) {
    res.sendStatus(400);

    return;
  }

  if (!expenseService.getById(expenseId)) {
    res.sendStatus(404);

    // eslint-disable-next-line no-useless-return
    return;
  }

  const editedExpense = expenseService.edit(expenseId, dataToEdit);

  res.send(editedExpense);
};

module.exports = {
  getByQuery,
  createNew,
  getById,
  removeById,
  editById,
};
