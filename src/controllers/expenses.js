'use strict';

const expensesService = require('../services/expenses');
const userService = require('../services/users');

function getOne(req, res) {
  const { expenseId } = req.params;
  const foundExpenses = expensesService.getExpenseById(expenseId);

  if (!foundExpenses) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpenses);
}

function getAll(req, res) {
  const expenses = expensesService.getAllExpenses(req.query);

  res.send(expenses);
};

function add(req, res) {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  const foundUser = userService.getUserById(userId);

  if (!foundUser) {
    res.sendStatus(400);

    return;
  }

  if (!userId || !spentAt || !title || !amount || !category || !note) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expensesService.createExpense(req.body);

  res.statusCode = 201;
  res.send(newExpense);
};

function remove(req, res) {
  const { expenseId } = req.params;
  const foundExpense = expensesService.getExpenseById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expensesService.removeExpense(expenseId);
  res.sendStatus(204);
};

function update(req, res) {
  const { expenseId } = req.params;
  const foundExpense = expensesService.getExpenseById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expensesService.updateExpense(expenseId, req.body);

  res.send(foundExpense);
};

module.exports = {
  getAll,
  getOne,
  add,
  remove,
  update,
};
