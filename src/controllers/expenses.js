'use strict';

const userService = require('../services/users');
const expensesService = require('../services/expenses');

const getAllFilterd = (req, res) => {
  const filteredExpenses = expensesService.getFilteredExpenses(req.query);

  res.send(filteredExpenses);
};

const getOne = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expensesService.getById(Number(expenseId));

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

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

  const foundUser = userService.getById(Number(userId));

  if (!foundUser) {
    res.sendStatus(400);

    return;
  }

  if (!userId || !spentAt || !title || !amount || !category || !note) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expensesService.create(req.body);

  res.statusCode = 201;
  res.send(newExpense);
};

const remove = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expensesService.getById(Number(expenseId));

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expensesService.remove(Number(expenseId));
  res.sendStatus(204);
};

const update = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expensesService.getById(Number(expenseId));

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  const expense = expensesService.update({
    id: Number(expenseId), ...req.body,
  });

  res.send(expense);
};

module.exports = {
  getAllFilterd,
  getOne,
  add,
  remove,
  update,
};
