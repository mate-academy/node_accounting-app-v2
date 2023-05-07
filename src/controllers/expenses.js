'use strict';

const expensesService = require('../servises/expenses.js');
const usersService = require('../servises/users.js');

function getAll(req, res) {
  const {
    userId,
    categories,
    from,
    to,
  } = req.query;

  const expenses = expensesService
    .getFiltered(userId, categories, from, to);

  res.send(expenses);
}

function create(req, res) {
  const {
    userId,
    title,
    spentAt,
    amount,
    category,
    note,
  } = req.body;

  const foundUser = usersService.getById(userId);

  const hasAllFields = userId
  && title
  && spentAt
  && amount
  && category
  && note;

  if (!foundUser || !hasAllFields) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expensesService.create(req.body);

  res.statusCode = 201;
  res.send(newExpense);
}

function getById(req, res) {
  const { expenseId } = req.params;

  const foundExpense = expensesService.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpense);
}

function remove(req, res) {
  const { expenseId } = req.params;

  const foundExpense = expensesService.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expensesService.remove(expenseId);
  res.sendStatus(204);
}

function update(req, res) {
  const { expenseId } = req.params;
  const foundExpense = expensesService.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  const newExpense = expensesService.update(expenseId, req.body);

  res.send(newExpense);
}

module.exports = {
  getAll,
  create,
  remove,
  update,
  getById,
};
