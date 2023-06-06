'use strict';

const expensesService = require('../services/expenses');
const usersService = require('../services/users');

const getAllFiltered = (req, res) => {
  const expenses = expensesService.filterExpenses(req.query);

  res.send(expenses);
};

const getOne = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expensesService.getExpenseById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpense);
};

const add = (req, res) => {
  const {
    userId,
    title,
  } = req.body;

  const checkOnUser = usersService.getUserById(userId);

  if (!checkOnUser || !title) {
    res.sendStatus(400);

    return;
  }

  const newExpence = expensesService.createExpense(req.body);

  res.statusCode = 201;
  res.send(newExpence);
};

const remove = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expensesService.getExpenseById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expensesService.removeExpense(expenseId);
  res.sendStatus(204);
};

const update = (req, res) => {
  const { expenseId } = req.params;
  const {
    ...data
  } = req.body;
  const foundExpense = expensesService.getExpenseById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expensesService.updateExpense({
    id: expenseId,
    ...data,
  });

  res.send(foundExpense);
};

module.exports = {
  getAllFiltered,
  getOne,
  add,
  remove,
  update,
};
