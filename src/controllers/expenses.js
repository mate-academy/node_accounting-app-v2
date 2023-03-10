'use strict';

const expensesService = require('../services/expenses.js');
const usersService = require('../services/users.js');

const getAll = (req, res) => {
  const queryParams = req.query;

  if (queryParams) {
    const filteredExpenses = expensesService.getFilteredExpenses(queryParams);

    res.send(filteredExpenses);

    return;
  }

  const expenses = expensesService.getExpenses();

  res.send(expenses);
};

const getOne = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expensesService.getExpense(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;
  res.send(foundExpense);
};

const add = (req, res) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  if (!userId || !spentAt || !title || !amount || !category || !note) {
    res.sendStatus(400);

    return;
  }

  const user = usersService.getUser(userId);

  if (!user) {
    res.sendStatus(400);

    return;
  }

  const expense = expensesService.createExpense(
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  );

  res.statusCode = 201;
  res.send(expense);
};

const remove = (req, res) => {
  const { expenseId } = req.params;
  const expense = expensesService.getExpense(expenseId);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  expensesService.deleteExpense(expenseId);
  res.sendStatus(204);
};

const update = (req, res) => {
  const { expenseId } = req.params;
  const expense = expensesService.getExpense(expenseId);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  const updatedExpense = expensesService.updateExpense({
    id: expenseId,
    data: req.body,
  });

  res.statusCode = 200;
  res.send(updatedExpense);
};

module.exports = {
  add,
  getAll,
  getOne,
  remove,
  update,
};
