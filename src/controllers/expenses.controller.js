'use strict';

const expensesService = require('../services/expenses.service');
const { filterExpensesByQuery } = require('../services/filterExpensesByQuery');
const { isUserExist } = require('../services/users.service');

const REQUIRED_KEYS_TO_CREATE
  = ['userId', 'spentAt', 'title', 'amount', 'category'];

const REQUIRED_KEYS_TO_UPDATE
  = ['spentAt', 'title', 'amount', 'category', 'note'];

const get = (req, res) => {
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
    res.sendStatus(404);

    return;
  }

  res.send(expense);
};

const add = (req, res) => {
  const expenses = req.body;

  const isObjectValid = (object, keys) => {
    return keys.every(key => Boolean(object[key]));
  };

  if (!isObjectValid(expenses, REQUIRED_KEYS_TO_CREATE)) {
    res.sendStatus(400);

    return;
  }

  const isUser = isUserExist(expenses.userId);

  if (!isUser) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expensesService.add(expenses);

  res.statusCode = 201;
  res.send(newExpense);
};

const update = (req, res) => {
  const { id } = req.params;
  const expenses = req.body;

  if (!req.body) {
    res.sendStatus(400);

    return;
  }

  const isDataValid = Object.keys(expenses)
    .every(key => REQUIRED_KEYS_TO_UPDATE.includes(key));

  if (!isDataValid) {
    res.sendStatus(400);

    return;
  }

  const updatedExpense = expensesService.update(+id, expenses);

  if (!updatedExpense) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;
  res.send(updatedExpense);
};

const remove = (req, res) => {
  const { id } = req.params;

  const isExpenseDeleted = expensesService.remove(+id);

  if (!isExpenseDeleted) {
    res.sendStatus(404);

    return;
  }

  res.sendStatus(204);
};

module.exports = {
  get,
  getOne,
  add,
  update,
  remove,
};
