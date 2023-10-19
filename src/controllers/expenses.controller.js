'use strict';

const status = require('../utils/constants');
const expensesService = require('../services/expenses.services');
const userService = require('../services/users.services');
const { expensesFilter } = require('../utils/expensesFilter');
const idGenerator = require('../utils/idGenerator');

const REQUIRED_KEYS_TO_UPDATE
  = ['spentAt', 'title', 'amount', 'category', 'note'];

const getAll = (req, res) => {
  const expenses = expensesFilter(req.query);

  res.send(expenses);
};

const getById = (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(status.BAD_REQUEST);

    return;
  }

  const searcedExpense = expensesService.getById(+id);

  if (!searcedExpense) {
    res.sendStatus(status.NOT_FOUND);

    return;
  }

  res.status(status.OK).send(searcedExpense);
};

const post = (req, res) => {
  const { userId, ...rest } = req.body;

  if (!userService.getById(userId)) {
    return res.sendStatus(status.BAD_REQUEST);
  }

  const newExpense = {
    id: idGenerator(expensesService.getAll()),
    userId,
    ...rest,
  };

  expensesService.add(newExpense);

  res.status(status.CREATED).send(newExpense);
};

const update = (req, res) => {
  const { id } = req.params;
  const expense = expensesService.getById(+id);

  if (!expense) {
    res.sendStatus(status.NOT_FOUND);

    return;
  }

  const isDataValid = Object.keys(req.body)
    .every(key => REQUIRED_KEYS_TO_UPDATE.includes(key));

  if (!isDataValid) {
    res.sendStatus(res.BAD_REQUEST);

    return;
  }

  const updateExpense = expensesService.update(expense, req.body);

  res.send(updateExpense);
};

const deleteById = (req, res) => {
  const { id } = req.params;

  const expense = expensesService.getById(+id);

  if (!expense) {
    res.sendStatus(status.NOT_FOUND);

    return;
  }

  expensesService.deleteById(+id);

  res.sendStatus(status.NO_CONTENT);
};

module.exports = {
  getAll,
  getById,
  post,
  update,
  deleteById,
};
