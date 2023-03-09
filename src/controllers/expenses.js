'use strict';

const expensesServices = require('../services/expenses');
const { getUserById } = require('../services/users');

function getAll(req, res) {
  const params = req.query;
  const expenses = expensesServices.getFilteredExpenses(params);

  res.sendStatus = 200;
  res.send(expenses);
}

function getOne(req, res) {
  const { expenseId } = req.params;

  if (!expenseId) {
    res.sendStatus(400);

    return;
  }

  const foundExpense = expensesServices.getExpenseById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;
  res.send(foundExpense);
}

function addNewExpense(req, res) {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
  } = req.body;

  const foundUser = getUserById(userId);

  const isSomeDataMissed = (!foundUser
    || !userId
    || !spentAt
    || !title
    || !amount
    || !category
  );

  if (isSomeDataMissed) {
    res.sendStatus(400);

    return;
  }

  const expenseData = req.body;
  const newExpense = expensesServices.createExpense(expenseData);

  res.statusCode = 201;
  res.send(newExpense);
}

function deleteExpense(req, res) {
  const { expenseId } = req.params;

  if (!expenseId) {
    res.sendStatus(400);

    return;
  }

  const expenseToDelete = expensesServices.getExpenseById(expenseId);

  if (!expenseToDelete) {
    res.sendStatus(404);

    return;
  }

  expensesServices.deleteExpense(expenseId);
  res.sendStatus(204);
}

function updateExpense(req, res) {
  const { expenseId } = req.params;
  const { title } = req.body;

  if (!expenseId) {
    res.sendStatus(400);

    return;
  }

  const expenseToUpdate = expensesServices.getExpenseById(expenseId);

  if (!expenseToUpdate) {
    res.sendStatus(404);

    return;
  }

  const dataToUpdate = { title };
  const updatedExpense = expensesServices.updateExpense(
    expenseId,
    dataToUpdate,
  );

  res.statusCode = 200;
  res.send(updatedExpense);
}

module.exports = {
  getAll,
  getOne,
  addNewExpense,
  deleteExpense,
  updateExpense,
};
