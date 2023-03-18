'use strict';

const usersServices = require('../services/users');
const expensesServices = require('../services/expenses');

function getAll(req, res) {
  const queryParams = req.query;

  const expenses = expensesServices.getAll(queryParams);

  res.send(expenses);
}

function getById(req, res) {
  const { expenseId } = req.params;
  const foundExpense = expensesServices.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

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

  const isDataInvalid = !foundUser
    || typeof spentAt !== 'string'
    || typeof title !== 'string'
    || typeof amount !== 'number'
    || typeof category !== 'string';

  if (isDataInvalid) {
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
  const foundExpense = expensesServices.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expensesServices.remove(expenseId);
  res.sendStatus(204);
}

function update(req, res) {
  const { expenseId } = req.params;
  const foundExpense = expensesServices.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  const { title } = req.body;

  if (typeof title !== 'string') {
    res.sendStatus(400);

    return;
  }

  expensesServices.update({
    id: expenseId,
    title,
  });

  res.send(foundExpense);
}

module.exports = {
  getAll,
  getById,
  add,
  remove,
  update,
};
