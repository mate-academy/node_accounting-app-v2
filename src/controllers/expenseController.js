'use strict';

const expenseServices = require('../services/expenseServices');
const userServices = require('../services/userServices');

function getAllExpenses(req, res) {
  const {
    userId,
    categories,
    from,
    to,
  } = req.query;

  const filteredExpenses = expenseServices
    .getExpenses(userId, categories, from, to);

  res.send(filteredExpenses);
}

function getExpenseByUserId(req, res) {
  const { userId } = req.params;

  if (!userId) {
    res.sendStatus(400);

    return;
  }

  const foundExpense = expenseServices.getExpenseByUserId(userId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.status(200).send(foundExpense);
}

function createExpense(req, res) {
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
}

function removeExpense(req, res) {
  const { id } = req.params;

  const isExpenseExist = expenseServices.getExpenseById(id);

  if (!isExpenseExist) {
    res.sendStatus(404);

    return;
  }

  expenseServices.deleteExpense(id);
  res.sendStatus(204);
}

function updateExpense(req, res) {
  const { id } = req.params;

  const foundExpense = expenseServices.getExpenseById(id);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expenseServices.updateExpense(foundExpense, req.body);

  res.status(200).send(foundExpense);
}

module.exports = {
  getAllExpenses,
  getExpenseByUserId,
  createExpense,
  removeExpense,
  updateExpense,
};
