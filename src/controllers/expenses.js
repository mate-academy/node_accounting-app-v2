'use strict';

const expensesService = require('../services/expenses.js');
const usersService = require('../services/users.js');

const getAll = (req, res) => {
  const query = req.query;

  const expenses = expensesService.getAll(query);

  res.send(expenses);
};

const getOne = (req, res) => {
  const { expenseId } = req.params;

  if (!expenseId) {
    res.sendStatus(404);

    return;
  }

  const getExpensesById = expensesService.getById(expenseId);

  if (!getExpensesById) {
    res.sendStatus(404);

    return;
  }

  res.send(getExpensesById);
};

const add = (req, res) => {
  const { userId } = req.body;

  const getUsersById = usersService.getById(userId);

  if (!getUsersById) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expensesService.create(expense);

  res.statusCode = 201;
  res.send(newExpense);
};

const remove = (req, res) => {
  const { expenseId } = req.params;

  if (!expenseId) {
    res.sendStatus(404);

    return;
  }

  const getExpensesById = expensesService.getById(expenseId);

  if (!getExpensesById) {
    res.sendStatus(404);

    return;
  }

  expensesService.remove(expenseId);
  res.sendStatus(204);
};

const update = (req, res) => {
  const { expenseId } = req.params;

  if (!expenseId) {
    res.sendStatus(400);

    return;
  }

  const getExpensesById = expensesService.getById(expenseId);

  if (!getExpensesById) {
    res.sendStatus(404);

    return;
  }

  const data = req.body;

  const updatedExpense = expensesService.update({
    expenseId,
    data,
  });

  res.send(updatedExpense);
};

module.exports = {
  getAll,
  getOne,
  add,
  remove,
  update,
};
