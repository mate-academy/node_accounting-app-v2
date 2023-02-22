'use strict';

const expensesService = require('../services/expenses');
const usersService = require('../services/users');

const getAll = (req, res) => {
  const searchParams = req.query;

  const expenses = expensesService.getAll(searchParams);

  res.send(expenses);
};

const getOne = (req, res) => {
  const { expenseId } = req.params;

  const wantedExpense = expensesService.getExpenseById(expenseId);

  if (!wantedExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(wantedExpense);
};

const add = (req, res) => {
  const
    {
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    } = req.body;

  const isAllDataProvided = userId
    && spentAt
    && title
    && amount
    && category
    && note;

  const user = usersService.getUserById(userId);

  if (!user || !isAllDataProvided) {
    res.sendStatus(400);

    return;
  }

  const expenseData = req.body;

  const newExpense = expensesService.createExpense(expenseData);

  res.statusCode = 201;
  res.send(newExpense);
};

const update = (req, res) => {
  const { expenseId } = req.params;
  const { title } = req.body;
  const wantedExpense = expensesService.getExpenseById(expenseId);

  if (!wantedExpense) {
    res.sendStatus(404);

    return;
  }

  if (!title) {
    res.sendStatus(400);

    return;
  }

  const dataToUpdate = { title };

  const updatedExpense = expensesService.patchExpense(expenseId, dataToUpdate);

  res.send(updatedExpense);
};

const remove = (req, res) => {
  const { expenseId } = req.params;
  const wantedExpense = expensesService.getExpenseById(expenseId);

  if (!wantedExpense) {
    res.sendStatus(404);

    return;
  }

  expensesService.deleteExpense(expenseId);

  res.sendStatus(204);
};

module.exports = {
  getAll,
  getOne,
  add,
  update,
  remove,
};
