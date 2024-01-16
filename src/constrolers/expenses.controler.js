'use strict';

const {
  getExpenses,
  createExpense,
  removeExpense,
  getOneExpense,

} = require('../services/expenses.sevices');
const { findUser } = require('../services/users.services');

const getAllExpenses = (req, res) => {
  const { userId, categories, from, to } = req.query;
  const userIdToNum = Number(userId);

  const expenses = getExpenses(userIdToNum, categories, from, to);

  if (userId || categories || from || to) {
    if (!expenses.length) {
      res.sendStatus(404);

      return;
    }
  }
  res.status(200).send(expenses);
};

const addExpense = (req, res) => {
  const { userId,
    spentAt,
    title,
    amount,
    category,
    note } = req.body;
  const isExist = !spentAt || !title || !amount || !category;
  const userIdToNum = Number(userId);
  const user = findUser(userIdToNum);

  if (isExist || !user) {
    res.sendStatus(400);

    return;
  }

  const expense = createExpense(userId,
    spentAt,
    title,
    amount,
    category,
    note,);

  res.status(201).send(expense);
};

const deleteExpense = (req, res) => {
  const { id } = req.params;

  const idToNum = Number(id);

  if (isNaN(idToNum) || idToNum <= 0 || !isFinite(idToNum)) {
    res.sendStatus(400);
  }

  const expense = getOneExpense(idToNum);

  if (!expense) {
    res.status(404);

    return;
  }

  removeExpense(idToNum);
  res.sendStatus(204);
};

const getExpense = (req, res) => {
  const { id } = req.params;
  const idToNum = Number(id);

  const expense = getOneExpense(idToNum);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.status(200).send(expense);
};

const updateExpense = (req, res) => {
  const { id } = req.params;
  const newInformation = req.body;
  const idToNum = Number(id);

  if (isNaN(idToNum) || idToNum <= 0 || !isFinite(idToNum)) {
    res.sendStatus(400);

    return;
  }

  const expense = getOneExpense(idToNum);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  Object.assign(expense, newInformation);

  res.status(200).send(expense);
};

module.exports = {
  getAllExpenses,
  addExpense,
  deleteExpense,
  getExpense,
  updateExpense,
};
