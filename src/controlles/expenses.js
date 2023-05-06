'use strict';

const { expensesService } = require('../services/expensesService.js');
const { userService } = require('../services/usersService.js');

const getAll = (req, res) => {
  const expenses = expensesService.getAll(req.query);

  res.send(expenses);
};

const getById = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expensesService.getExpenseById(+expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpense);
};

const create = (req, res) => {
  const {
    userId,
    title,
  } = req.body;

  const user = userService.getUserById(+userId);

  if (!title || !user) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expensesService.create(req.body);

  res.statusCode = 201;
  res.send(newExpense);
};

const remove = (req, res) => {
  const { expenseId } = req.params;
  const isRemoved = expensesService.remove(+expenseId);

  if (!isRemoved) {
    res.sendStatus(404);

    return;
  }

  res.sendStatus(204);
};

const update = (req, res) => {
  const expense = req.body;
  const { expenseId } = req.params;
  const foundExpense = expensesService.getExpenseById(+expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  const updatedExpense = expensesService.update(+expenseId, expense);

  res.send(updatedExpense);
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
};
