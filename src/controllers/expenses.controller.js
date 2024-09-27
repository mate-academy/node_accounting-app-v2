'use strict';

const expensesService = require('../services/expenses.service');
const { filterExpensesByQuery } = require('../helpers/filterExpensesByQuery');
const { getIsUserExist } = require('../services/users.service');
const responseCodes = require('../constants/responseCodes');

const REQUIRED_KEYS_TO_CREATE
  = ['userId', 'spentAt', 'title', 'amount', 'category'];

const REQUIRED_KEYS_TO_UPDATE
  = ['spentAt', 'title', 'amount', 'category', 'note'];

const getAll = (req, res) => {
  let expenses = expensesService.getAll();

  if (req.query && expenses.length) {
    expenses = filterExpensesByQuery(expenses, req.query);
  }

  res.send(expenses);
};

const getOne = (req, res) => {
  const { id } = req.params;

  const expense = expensesService.getById(+id);

  if (!expense) {
    res.sendStatus(responseCodes.NOT_FOUND);

    return;
  }

  res.send(expense);
};

const add = (req, res) => {
  const expenses = req.body;

  const isObjectValid = REQUIRED_KEYS_TO_CREATE
    .every(key => Boolean(expenses[key]));

  if (!isObjectValid) {
    res.sendStatus(responseCodes.BAD_REQUEST);

    return;
  }

  const isUser = getIsUserExist(expenses.userId);

  if (!isUser) {
    res.sendStatus(responseCodes.BAD_REQUEST);

    return;
  }

  const newExpense = expensesService.add(expenses);

  res.statusCode = responseCodes.CREATED;
  res.send(newExpense);
};

const update = (req, res) => {
  const { id } = req.params;
  const expenses = req.body;

  if (!expenses) {
    res.sendStatus(responseCodes.BAD_REQUEST);

    return;
  }

  const isDataValid = Object.keys(expenses)
    .every(key => REQUIRED_KEYS_TO_UPDATE.includes(key));

  if (!isDataValid) {
    res.sendStatus(responseCodes.BAD_REQUEST);

    return;
  }

  const updatedExpense = expensesService.update(+id, expenses);

  if (!updatedExpense) {
    res.sendStatus(responseCodes.NOT_FOUND);

    return;
  }

  res.statusCode = responseCodes.SUCCESS;
  res.send(updatedExpense);
};

const remove = (req, res) => {
  const { id } = req.params;

  const isExpenseDeleted = expensesService.remove(+id);

  if (!isExpenseDeleted) {
    res.sendStatus(responseCodes.NOT_FOUND);

    return;
  }

  res.sendStatus(204);
};

module.exports = {
  getAll,
  getOne,
  add,
  update,
  remove,
};
