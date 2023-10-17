'use strict';

const {
  getExpenseById,
  createExpense,
  deleteExpense,
  updateExpense,
  getFilteredExpenses,
} = require('../services/expensesService');
const {
  NOT_EXIST_CODE,
  INVALID_PARAMETERS_CODE,
  SUCCESSFUL_DELETION_CODE,
  SUCCESSFUL_CREATION_CODE,
} = require('../utils/constants');
const { validateId } = require('../utils/validateId');
const { getUserById } = require('../services/usersService');
const { prepareIdFromReq } = require('../utils/prepareIdFromReq');

function get(req, res) {
  const userId = +req.query.userId;
  const user = req.query.userId ? getUserById(userId) : true;

  if (!user) {
    res.sendStatus(INVALID_PARAMETERS_CODE);

    return;
  }

  const expenses = getFilteredExpenses(
    {
      ...req.query,
      userId,
    },
  );

  res.send(expenses);
}

function getOne(req, res) {
  const id = prepareIdFromReq(req);

  if (validateId(id)) {
    res.sendStatus(INVALID_PARAMETERS_CODE);

    return;
  }

  const expense = getExpenseById(id);

  if (!expense) {
    res.sendStatus(NOT_EXIST_CODE);

    return;
  }

  res.send(expense);
}

function post(req, res) {
  const dataToPost = {
    ...req.body,
  };

  if (
    !getUserById(dataToPost.userId)
    || !dataToPost.spentAt
    || !dataToPost.title
    || !dataToPost.amount
    || !dataToPost.category
  ) {
    res.sendStatus(INVALID_PARAMETERS_CODE);

    return;
  }

  const createdExpense = createExpense(dataToPost);

  res
    .status(SUCCESSFUL_CREATION_CODE)
    .send(createdExpense);
}

function remove(req, res) {
  const id = prepareIdFromReq(req);

  if (validateId(id)) {
    res.sendStatus(INVALID_PARAMETERS_CODE);

    return;
  }

  const expense = getExpenseById(id);

  if (!expense) {
    res.sendStatus(NOT_EXIST_CODE);

    return;
  }

  deleteExpense(id);
  res.sendStatus(SUCCESSFUL_DELETION_CODE);
}

function patch(req, res) {
  const id = prepareIdFromReq(req);

  const dataToUpdate = {
    ...req.body,
    id,
  };

  if (validateId(id)) {
    res.sendStatus(INVALID_PARAMETERS_CODE);

    return;
  }

  const expense = getExpenseById(id);

  if (!expense) {
    res.sendStatus(NOT_EXIST_CODE);

    return;
  }

  const updatedExpense = updateExpense(dataToUpdate);

  res.send(updatedExpense);
}

module.exports = {
  get,
  getOne,
  post,
  remove,
  patch,
};
