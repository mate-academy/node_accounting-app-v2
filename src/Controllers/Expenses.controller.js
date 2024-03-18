'use strict';

const {
  postExpenses,
  getAllExpenses,
  getExpense,
  deleteExpense,
  patchExpense,
} = require('../Services/Expenses.services');
const { getUser } = require('../Services/User.services');
const {
  BAD_REQUEST,
  CREATED,
  NOT_FOUND,
  OK,
  NO_CONTENT,
} = require('../StatusCodes/StatusCodes');

const createExpenseControll = (req, res) => {
  const { title, userId } = req.body;

  if (!title || !getUser(userId)) {
    res.sendStatus(BAD_REQUEST);

    return;
  }

  res.status(CREATED).send(postExpenses(req.body));
};

const getAllExpensesControll = (req, res) => {
  const { userId, categories, from, to } = req.query;

  res.status(OK).send(getAllExpenses(userId, categories, from, to));
};

const getExpenseByIdControll = (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(BAD_REQUEST);

    return;
  }

  if (!getExpense(id)) {
    res.sendStatus(NOT_FOUND);

    return;
  }

  res.status(OK).send(getExpense(id));
};

const deleteExpenseControll = (req, res) => {
  const { id } = req.params;

  if (!getExpense(id)) {
    res.sendStatus(NOT_FOUND);

    return;
  }

  res.status(NO_CONTENT).send(deleteExpense(id));
};

const updateExpenseControll = (req, res) => {
  const { id } = req.params;
  const newExpense = req.body;

  if (!getExpense(id)) {
    res.sendStatus(NOT_FOUND);

    return;
  }

  res.status(OK).send(patchExpense(id, newExpense));
};

module.exports = {
  createExpenseControll,
  getAllExpensesControll,
  getExpenseByIdControll,
  deleteExpenseControll,
  updateExpenseControll,
};
