'use strict';

const userServices = require('../services/users');
const expenseServices = require('../services/expenses');

const getAll = (req, res) => {
  const hasFilteredExpenses = expenseServices.getAll(req.query);

  res.send(hasFilteredExpenses);
};

const getOne = (req, res) => {
  const { expenseId } = req.params;

  if (isNaN(+expenseId)) {
    res.sendStatus(400);

    return;
  }

  const foundExpense = expenseServices.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpense);
};

const add = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  const foundUser = userServices.getById(userId);

  if (!foundUser) {
    res.sendStatus(400);

    return;
  }

  const isString = (str) => typeof str === 'string';
  const isNumber = (num) => typeof num === 'number';
  const hasInvalidDataTypes
    = ![spentAt, title, category, note].every(isString)
    || ![userId, amount].every(isNumber);

  if (hasInvalidDataTypes) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expenseServices.create(
    userId, spentAt, title, amount, category, note
  );

  res.status(201);
  res.send(newExpense);
};

const remove = (req, res) => {
  const { expenseId } = req.params;
  const filteredExpenses = expenseServices.getById(expenseId);

  if (!filteredExpenses) {
    res.sendStatus(404);

    return;
  }

  expenseServices.remove(expenseId);
  res.sendStatus(204);
};

const update = (req, res) => {
  const { expenseId } = req.params;
  const foundExpenses = expenseServices.getById(expenseId);

  if (!foundExpenses) {
    res.sendStatus(404);

    return;
  }

  const params = req.body;

  expenseServices.update({
    expenseId, params,
  });
  res.send(foundExpenses);
};

module.exports = {
  getAll,
  getOne,
  add,
  remove,
  update,
};
