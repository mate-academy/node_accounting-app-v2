'use strict';

const expensesServices = require('../services/expenses');
const usersServices = require('../services/users');

function getAll(req, res) {
  const queryParams = req.query;

  const expenses = expensesServices.getAll(queryParams);

  res.statusCode = 200;
  res.send(expenses);
}

function getById(req, res) {
  const { expenseId } = req.params;

  if (!expenseId) {
    res.sendStatus(400);

    return;
  }

  const foundExpense = expensesServices.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;
  res.send(foundExpense);
}

function add(req, res) {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
  } = req.body;

  const foundUser = usersServices.getById(userId);

  const isAllDataProvided = userId
    && spentAt
    && title
    && amount
    && category;

  const isAllDataValid = foundUser
    && typeof spentAt === 'string'
    && typeof title === 'string'
    && typeof amount === 'number'
    && typeof category === 'string';

  if (!isAllDataValid || !isAllDataProvided) {
    res.sendStatus(400);

    return;
  }

  const expenseData = req.body;

  const newExpense = expensesServices.create(expenseData);

  res.statusCode = 201;
  res.send(newExpense);
}

function remove(req, res) {
  const { expenseId } = req.params;

  const expenseToRemove = expensesServices.getById(expenseId);

  if (!expenseToRemove) {
    res.sendStatus(404);

    return;
  }

  expensesServices.remove(expenseId);
  res.sendStatus(204);
}

function update(req, res) {
  const { expenseId } = req.params;
  const { title } = req.body;

  const expense = expensesServices.getById(expenseId);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  if (typeof title !== 'string') {
    res.sendStatus(400);

    return;
  }

  const dataToUpdate = { title };

  const updatedExpense = expensesServices.update(
    expenseId,
    dataToUpdate
  );

  res.statusCode = 200;
  res.send(updatedExpense);
}

module.exports = {
  getAll,
  getById,
  add,
  remove,
  update,
};
