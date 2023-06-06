'use strict';

const usersService = require('../services/users');
const expenseService = require('../services/expenses');

const getAll = (req, res) => {
  const filteredExpenses = expenseService.filterExpenses(req.query);

  res.send(filteredExpenses);
};

const getOne = (req, res) => {
  const { expenseId } = req.params;

  const foundExpense = expenseService.getById(expenseId);

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
  } = req.body;

  const users = usersService.getAllUsers();
  const allUsersId = users.map(({ id }) => id);
  const hasUser = allUsersId.includes(userId);
  const hasAllData = userId && title && spentAt;

  if (!hasUser || !hasAllData) {
    res.sendStatus(400);

    return;
  }

  const expense = expenseService.createExpense(req.body);

  res.statusCode = 201;
  res.send(expense);
};

const update = (req, res) => {
  const { expenseId } = req.params;

  const foundExpense = expenseService.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  Object.assign(foundExpense, req.body);

  res.send(foundExpense);
};

const remove = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expenseService.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expenseService.removeExpense(expenseId);

  res.sendStatus(204);
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
};
