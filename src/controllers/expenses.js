'use strict';

const expensesServices = require('../services/expenses');
const userService = require('../services/users');

const getMany = (req, res) => {
  const getQuery = req.query;

  if (!getQuery) {
    res.statusMessage = 'Required parameter is not passed';
    res.sendStatus(400);

    return;
  }

  const expenses = expensesServices.getMany(getQuery);

  if (!expenses) {
    res.statusMessage = 'Expected entity doesn\'t exist';
    res.sendStatus(404);

    return;
  }

  res.send(expenses);
};

const getOne = (req, res) => {
  const { expensesId } = req.params;

  const expense = expensesServices.getOne(expensesId);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.send(expense);
};

const add = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;
  const foundUser = userService.getById(userId);

  const isAllFieldsValid = typeof userId !== 'number'
    || typeof spentAt !== 'string'
    || typeof title !== 'string'
    || typeof amount !== 'number'
    || typeof category !== 'string'
    || typeof note !== 'string'
    || !foundUser;

  if (isAllFieldsValid) {
    res.statusMessage = 'Required parameter is not passed';
    res.sendStatus(400);

    return;
  }

  const newExpenseBody = req.body;
  const newExpense = expensesServices.add(newExpenseBody);

  res.statusCode = 201;
  res.send(newExpense);
};

const remove = (req, res) => {
  const { expensesId } = req.params;
  const expense = expensesServices.getOne(expensesId);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  expensesServices.remove(expensesId);
  res.sendStatus(204);
};

const update = (req, res) => {
  const { expensesId: id } = req.params;
  const foundExpense = expensesServices.getOne(id);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  const fieldsForUpdate = req.body;

  expensesServices.update({
    id, fieldsForUpdate,
  });

  res.send(foundExpense);
};

module.exports = {
  getMany, getOne, add, remove, update,
};
