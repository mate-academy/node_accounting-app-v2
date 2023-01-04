'use strict';

const { usersService } = require('../services/users');
const { expensesService } = require('../services/expenses');

const getAll = (req, res) => {
  const { userId, category, from, to } = req.query;
  const expenses = expensesService.getAll(userId, category, from, to);

  res.send(expenses);
};

const findOne = (req, res) => {
  const { expenseId } = req.params;

  const foundExpense = expensesService.findExpenseById(Number(expenseId));

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpense);
};
const addOne = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;
  const foundUser = usersService.findUserById(userId);

  if (!foundUser) {
    res.sendStatus(400);

    return;
  }

  if (typeof userId !== 'number' || typeof spentAt !== 'string'
    || typeof title !== 'string' || typeof amount !== 'number'
    || typeof category !== 'string' || typeof note !== 'string'
    || Object.keys(req.body).length < 6) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expensesService.addOne(req.body);

  res.statusCode = 201;
  res.send(newExpense);
};

const updateOne = (req, res) => {
  const { expenseId } = req.params;
  const newParams = req.body;

  if (!expenseId || !newParams) {
    res.sendStatus(400);

    return;
  }

  const foundExpense = expensesService.findExpenseById(Number(expenseId));

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  const updatedExpense = expensesService.updateOne(foundExpense, newParams);

  res.send(updatedExpense);
};

const deleteOne = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expensesService.findExpenseById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expensesService.deleteOne(expenseId);

  res.sendStatus(204);
};

module.exports.expensesController = {
  getAll,
  findOne,
  addOne,
  updateOne,
  deleteOne,
};
