'use strict';

const expenseService = require('../services/expenses.js');
const userService = require('../services/users.js');

function getAll(req, res) {
  const expenses = expenseService.getAll(req.query);

  res.send(expenses);
}

function getOne(req, res) {
  const { expenseId } = req.params;
  const foundExpense = expenseService.getById(+expenseId);

  if (!foundExpense) {
    res.send(404);

    return;
  }

  res.send(foundExpense);
}

function validData(
  spentAt,
  title,
  amount,
  category,
  note,
) {
  return new Date(spentAt).toString() !== 'Invalid Date'
  || typeof title === 'string'
  || typeof amount === 'number'
  || typeof category === 'string'
  || typeof note === 'string';
}

function addExpense(req, res) {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  if (!userService.getById(userId) || !validData(
    spentAt,
    title,
    amount,
    category,
    note,
  )
  ) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expenseService.create(
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  );

  res.statusCode = 201;
  res.send(newExpense);
}

function updateExpense(req, res) {
  const { expenseId } = req.params;
  const foundExpense = expenseService.getById(+expenseId);

  if (!foundExpense) {
    res.send(404);

    return;
  }

  const {
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  if (!validData(
    spentAt,
    title,
    amount,
    category,
    note,
  )
  ) {
    res.sendStatus(400);

    return;
  }

  const updatedExpense = expenseService.update(
    +expenseId,
    spentAt,
    title,
    amount,
    category,
    note,
  );

  res.send(updatedExpense);
}

function removeExpense(req, res) {
  const { expenseId } = req.params;
  const foundExpense = expenseService.getById(+expenseId);

  if (!foundExpense) {
    res.send(404);

    return;
  }

  expenseService.remove(+expenseId);

  res.sendStatus(204);
}

module.exports = {
  getAll,
  getOne,
  addExpense,
  updateExpense,
  removeExpense,
};
