'use strict';

const {
  getAllExpenses,
  createExpense,
  getAllExspensesId,
  findExpenseById,
  removeExpense,
  updateExpense,
} = require('../services/expenseService.js');

const {
  getAllUsersId,
} = require('../services/userService.js');

const getExpenses = (req, res) => {
  const { userId, categories, from, to } = req.query;
  const expensesToReturn = getAllExpenses(userId, categories, from, to, res);

  res.statusCode = 200;
  res.send(expensesToReturn);
};

const postExpense = (req, res) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  if (!title || typeof title !== 'string') {
    res.statusCode = 400;

    return res.send();
  }

  const allUsersId = getAllUsersId();

  if (!allUsersId.includes(userId)) {
    res.statusCode = 400;

    return res.send();
  }

  const newExpense = createExpense(
    userId,
    spentAt,
    title,
    amount,
    category,
    note);

  res.statusCode = 201;
  res.send(newExpense);
};

const getExpenseById = (req, res) => {
  const id = +req.params.id;

  if (id === undefined) {
    res.statusCode = 400;

    return res.send();
  }

  const allExspensesId = getAllExspensesId();

  if (!allExspensesId.includes(id)) {
    res.statusCode = 404;

    return res.send();
  }

  const foundExpense = findExpenseById(id);

  res.statusCode = 200;
  res.send(foundExpense);
};

const deleteExpense = (req, res) => {
  const id = +req.params.id;

  if (id === undefined) {
    res.statusCode = 400;

    return res.send();
  }

  const allExpensesId = getAllExspensesId();

  if (!allExpensesId.includes(id)) {
    res.statusCode = 404;

    return res.send();
  }

  removeExpense(id);
  res.statusCode = 204;
  res.send();
};

const patchExpense = (req, res) => {
  const id = +req.params.id;
  const {
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  if (id === undefined) {
    res.statusCode = 400;

    return res.send();
  }

  const allExpensesId = getAllExspensesId();

  if (!allExpensesId.includes(id)) {
    res.statusCode = 404;

    return res.send();
  }

  const updatedExpense = updateExpense(
    id,
    spentAt,
    title,
    amount,
    category,
    note);

  res.statusCode = 200;
  res.send(updatedExpense);
};

module.exports = {
  getExpenses,
  postExpense,
  getExpenseById,
  deleteExpense,
  patchExpense,
};
