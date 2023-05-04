'use strict';

const expenseService = require('../services/expensesService');
const usersService = require('../services/usersService');

const getAll = (req, res) => {
  const query = req.query;

  const visibleExpenses = expenseService.getAllExpenses(query);

  res.send(visibleExpenses);
};

const getOne = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expenseService.getExpenseById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpense);
};

const create = (req, res) => {
  const expenseBody = req.body;
  const foundUser = usersService.getUserById(expenseBody.userId);

  if (Object.values(expenseBody).length < 6 || !foundUser) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expenseService.createExpense(expenseBody);

  res.statusCode = 201;
  res.send(newExpense);
};

const remove = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expenseService.getExpenseById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expenseService.removeExpense(expenseId);
  res.sendStatus(204);
};

const update = (req, res) => {
  const expense = req.body;
  const { expenseId } = req.params;
  const foundExpense = expenseService.getExpenseById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  const updatedExpense = expenseService.updateExpense(expenseId, expense);

  res.send(updatedExpense);
};

module.exports = {
  getAll,
  getOne,
  create,
  remove,
  update,
};
