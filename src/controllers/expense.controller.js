'use strict';

const expenseService = require('../services/expense.service');
const userService = require('../services/user.service');

const validateInput = (data, requiredFields) => {
  for (const field of requiredFields) {
    if (!data[field]) {
      return false;
    }
  }

  return true;
};

const findExpenseById = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expenseService.getExpenseById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return null;
  }

  return foundExpense;
};

const getAll = (req, res) => {
  const expenses = expenseService.getAll(req.query);

  res.send(expenses);
};

const getOne = (req, res) => {
  const foundExpense = findExpenseById(req, res);

  if (!foundExpense) {
    return;
  }

  res.send(foundExpense);
};

const add = (req, res) => {
  const requiredFields = [
    'userId',
    'spentAt',
    'title',
    'amount',
    'category',
    'note'];

  if (!validateInput(req.body, requiredFields)) {
    return res.sendStatus(400);
  }

  const foundUser = userService.getUserById(req.body.userId);

  if (!foundUser) {
    return res.sendStatus(400);
  }

  const newExpense = expenseService.createExpense(req.body);

  res.status(201).send(newExpense);
};

const remove = (req, res) => {
  const foundExpense = findExpenseById(req, res);

  if (!foundExpense) {
    return;
  }

  expenseService.removeExpense(foundExpense.id);
  res.sendStatus(204);
};

const update = (req, res) => {
  const foundExpense = findExpenseById(req, res);

  if (!foundExpense) {
    return;
  }

  expenseService.updateExpense(foundExpense.id, req.body);
  res.send(foundExpense);
};

module.exports = {
  getAll,
  getOne,
  add,
  remove,
  update,
};
