'use strict';

const expenseService = require('../services/expencesServices');
const userService = require('../services/usersServices');

function getAll(req, res) {
  const searchParams = req.query;

  if (!searchParams) {
    res.sendStatus(400);

    return;
  }

  const expenses = expenseService.getAll(searchParams);

  res.statusCode = 200;
  res.send(expenses);
}

function getById(req, res) {
  const { expenseId } = req.params;

  if (!expenseId) {
    res.sendStatus(400);

    return;
  }

  const foundExpense = expenseService.findById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpense);
}

function create(req, res) {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  const foundUser = userService.findById(userId);

  const isAllDataValid = (
    typeof userId !== 'string'
    || typeof spentAt !== 'string'
    || typeof title !== 'string'
    || typeof amount !== 'number'
    || typeof category !== 'string'
    || typeof note !== 'string'
  );

  if (!foundUser
    || !title
    || !amount
    || !category
    || !userId
    || !isAllDataValid) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expenseService.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.statusCode = 201;
  res.send(newExpense);
}

function remove(req, res) {
  const { expenseId } = req.params;

  const foundExpense = expenseService.findById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expenseService.remove(expenseId);
  res.sendStatus(204);
}

function update(req, res) {
  const { expenseId } = req.params;
  const { title } = req.body;

  const foundExpense = expenseService.findById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expenseService.update({
    expenseId, title,
  });

  res.send(foundExpense);
}

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
};
