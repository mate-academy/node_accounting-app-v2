'use strict';

const {
  getExpenses,
  createExpense,
  removeExpense,
  getOneExpense,

} = require('../services/expenses.sevices');

const getAllExpenses = (req, res) => {
  const expenses = getExpenses();

  res.status(200).send(expenses);
};

const addExpense = (req, res) => {
  const { userId,
    spentAt,
    title,
    amount,
    category,
    note } = req.body;
  const isExist = !userId || !spentAt || !title || !amount || !category;

  if (isExist) {
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
  removeExpense(idToNum);
  res.sendStatus(204);
};

const getExpense = (req, res) => {
  const { id } = req.params;
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

  res.status(200).send(expense);
};

const updateExpense = (req, res) => {
  const { id } = req.params;
  const newInformation = req.body;
  const idToNum = Number(id);
  const valuesLength = Object.values(newInformation);

  if (isNaN(idToNum) || idToNum <= 0 || !isFinite(idToNum) || !valuesLength) {
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
