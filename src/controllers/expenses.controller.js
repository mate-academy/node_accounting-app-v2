'use strict';

const expensesService = require('../services/expenses.services');
const userService = require('../services/users.services');
const { expensesFilter } = require('../utils/expensesFilter');
const idGenerator = require('../utils/idGenerator');

const getAll = (req, res) => {
  const {
    userId,
    from,
    to,
    categories,
  } = req.query;

  const expenses = expensesFilter(userId, from, to, categories);

  res.send(expenses);
};

const getById = (req, res) => {
  const { id } = req.params;
  const searcedExpense = expensesService.getById(+id);

  if (!id) {
    res.sendStatus(400);

    return;
  }

  if (!searcedExpense) {
    res.sendStatus(404);

    return;
  }

  res.status(200).send(searcedExpense);
};

const post = (req, res) => {
  const { userId, ...rest } = req.body;

  if (!userService.getById(userId)) {
    return res.sendStatus(400);
  }

  const newExpense = {
    id: idGenerator(expensesService.getAll()),
    userId,
    ...rest,
  };

  expensesService.add(newExpense);

  res.status(201).send(newExpense);
};

const update = (req, res) => {
  const { id } = req.params;
  const expense = expensesService.getById(+id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  const hasAllValues = Object.values(req.body)
    .every(value => value !== undefined);

  if (!hasAllValues) {
    res.sendStatus(400);

    return;
  }

  const updateExpense = expensesService.update(expense, req.body);

  res.send(updateExpense);
};

const deleteById = (req, res) => {
  const { id } = req.params;

  const expense = expensesService.getById(+id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  expensesService.deleteById(+id);

  res.sendStatus(204);
};

module.exports = {
  getAll,
  getById,
  post,
  update,
  deleteById,
};
