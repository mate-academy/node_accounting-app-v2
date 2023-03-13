'use strict';

const expenseService = require('../services/expenses');
const userService = require('../services/users');

const getAll = (req, res) => {
  const { userId, categories, from, to } = req.query;

  const expenses = expenseService.getAll(
    userId,
    categories,
    from,
    to,
  );

  res.send(expenses);
};

const getOne = (req, res) => {
  const { expenseId } = req.params;

  if (!expenseId) {
    res.sendStatus(400);

    return;
  }

  const foundedExpense = expenseService.getById(expenseId);

  if (!foundedExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundedExpense);
};

const createOne = (req, res) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  const foundedUser = userService.getById(userId);

  const isRequiredParams = (
    foundedUser
    && userId
    && spentAt
    && title
    && amount
    && category
    && note
  );

  if (!isRequiredParams) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expenseService.createOne(
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  );

  res.statusCode = 201;
  res.send(newExpense);
};

const deleteOne = (req, res) => {
  const { expenseId } = req.params;

  if (!expenseId) {
    res.sendStatus(400);

    return;
  }

  const foundingExpense = expenseService.getById(expenseId);

  if (!foundingExpense) {
    res.sendStatus(404);

    return;
  }

  expenseService.deleteOne(expenseId);

  res.sendStatus(204);
};

const updateOne = (req, res) => {
  const { expenseId } = req.params;
  const requiredParams = req.body;

  if (!expenseId) {
    res.sendStatus(400);

    return;
  }

  const foundedExpense = expenseService.getById(expenseId);

  if (!foundedExpense) {
    res.sendStatus(404);

    return;
  }

  const updatedExpense = expenseService.updateOne({
    expenseId,
    requiredParams,
  });

  res.send(updatedExpense);
};

module.exports = {
  getAll,
  getOne,
  createOne,
  deleteOne,
  updateOne,
};
