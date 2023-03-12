'use strict';

const expensesService = require('../services/expenses');
const userService = require('../services/users');

const getByFilter = (req, res) => {
  const query = req.query;
  const expenses = expensesService.getFilteredExpenses(query);

  res.send(expenses);
};

const getById = (req, res) => {
  const { id } = req.params;
  const foundExpense = expensesService.getById(id);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpense);
};

const create = (req, res) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  const foundUser = userService.getById(userId);

  const isAllDataProvided = (
    foundUser
    && userId
    && spentAt
    && title
    && amount
    && category
  );

  if (!isAllDataProvided) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expensesService.create(
    userId,
    spentAt,
    title,
    amount,
    category,
    note
  );

  res.statusCode = 201;
  res.send(newExpense);
};

const update = (req, res) => {
  const { id } = req.params;
  const newData = req.body;

  const foundExpense = expensesService.getById(id);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expensesService.update({
    id,
    newData,
  });
  res.send(foundExpense);
};

const remove = (req, res) => {
  const { id } = req.params;
  const foundExpense = expensesService.getById(id);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expensesService.remove(id);
  res.sendStatus(204);
};

module.exports = {
  getByFilter,
  getById,
  create,
  update,
  remove,
};
