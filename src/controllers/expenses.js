'use strict';

const expanseServise = require('../services/expenses');
const userServise = require('../services/users');

const add = (req, res) => {
  const { userId, spentAt, title, amount, category } = req.body;

  const foundUser = userServise.getById(userId);

  const isValidData = foundUser
    && typeof spentAt === 'string'
    && typeof title === 'string'
    && typeof amount === 'number'
    && typeof category === 'string';

  if (!isValidData) {
    res.sendStatus(400);

    return;
  }

  const userData = req.body;

  const newExpanse = expanseServise.create(userData);

  res.statusCode = 201;
  res.send(newExpanse);
};

const getAll = (req, res) => {
  const queryParams = req.query;

  const expenses = expanseServise.getAll(queryParams);

  res.send(expenses);
};

const getOne = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expanseServise.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;
  res.send(foundExpense);
};

const update = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expanseServise.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  const receivedData = req.body;

  expanseServise.update(expenseId, receivedData);
  res.send(foundExpense);
};

const remove = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expanseServise.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expanseServise.remove(expenseId);
  res.sendStatus(204);
};

module.exports = {
  add,
  getAll,
  getOne,
  update,
  remove,
};
