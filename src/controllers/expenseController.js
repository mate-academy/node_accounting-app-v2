'use strict';

const expenseServices = require('../services/expenseServices');
const userServices = require('../services/userServices');

const getAllExpenses = (req, res) => {
  const {
    userId,
    categories,
    from,
    to,
  } = req.query;

  const filteredExpenses = expenseServices
    .getExpenses(userId, categories, from, to);

  res.send(filteredExpenses);
};

const getExpenseByUserId = (req, res) => {
  const { expenseId } = req.params;

  const foundExpense = expenseServices.getExpenseByUserId(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.status(200).send(foundExpense);
};

const createExpense = (req, res) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  const foundUser = userServices.getByUserId(userId);

  if (!foundUser || !userId || !spentAt || !title
    || !amount || !category || !note) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expenseServices.createExpense({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.status(201).send(newExpense);
};

const removeExpense = (req, res) => {
  const { expenseId } = req.params;

  const isExpenseExist = expenseServices.getExpenseById(expenseId);

  if (!isExpenseExist) {
    res.sendStatus(404);

    return;
  }

  expenseServices.deleteExpense(expenseId);
  res.sendStatus(204);
};

const updateExpense = (req, res) => {
  const { expenseId } = req.params;

  const foundExpense = expenseServices.getExpenseById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expenseServices.updateExpense(expenseId, req.body);

  res.send(foundExpense);
};

module.exports = {
  getAllExpenses,
  getExpenseByUserId,
  createExpense,
  removeExpense,
  updateExpense,
};
