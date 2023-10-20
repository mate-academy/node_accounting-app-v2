'use strict';

const {
  getExpenseById,
  createExpense,
  deleteExpense,
  updateExpense,
  getAllExpenses,
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
const { validateUserDataToPost } = require('../utils/validateUserDataToPost');
const { ensureArray } = require('../utils/ensureArray');

function getAll(req, res) {
  const userId = Number(req.query.userId);

  if (userId && !getUserById(userId)) {
    res.sendStatus(INVALID_PARAMETERS_CODE);

    return;
  }

  const categories = ensureArray(req.query.categories);
  const expenses = Object.values(req.query).length
    ? getFilteredExpenses({
      ...req.query, userId, categories,
    })
    : getAllExpenses();

  res.send(expenses);
}

function getById(req, res) {
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
  const dataToPost = req.body;

  if (
    !getUserById(dataToPost.userId)
    || !validateUserDataToPost(dataToPost)
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
  getAll,
  getById,
  post,
  remove,
  patch,
};
