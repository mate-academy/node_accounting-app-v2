'use strict';

const expensesService = require('../services/expenses');

const getAll = (req, res) => {
  const { userId, category, from, to } = req.query;
  let expenses = expensesService.getAll();

  if (userId) {
    expenses = expensesService.getAllByUserId(userId);
  }

  if (category) {
    expenses = expensesService.getAllByCategory(category);
  }

  if (from && to) {
    expenses = expensesService.getAllByTimeFrame(from, to);
  }

  res.send(expenses);
};

const getOne = (req, res) => {
  const { expenseId } = req.params;
  const requestedExpense = expensesService.getOne(expenseId);

  if (!requestedExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(requestedExpense);
};

const remove = (req, res) => {
  const { expenseId } = req.params;
  const requestedExpense = expensesService.getOne(expenseId);

  if (!requestedExpense) {
    res.sendStatus(404);

    return;
  }

  expensesService.remove(expenseId);

  res.sendStatus(204);
};

const update = (req, res) => {
  const { expenseId } = req.params;

  const requestedExpense = expensesService.getOne(expenseId);

  if (!requestedExpense) {
    res.sendStatus(404);

    return;
  }

  const updatedExpense = expensesService.update(
    expenseId,
    req.body,
    requestedExpense
  );

  res.send(updatedExpense);
};

module.exports = {
  getAll,
  getOne,
  remove,
  update,
};
