'use strict';

const {
  getFilteredExpenses,
  getAllExpenses,
  findIndexOfExpense,
  patchExpense,
  removeExpense,
  addNewExpense,
  isUserIdExists,
  getExpenseById,
} = require('../services/expensesService.js');
const {
  generateUniqueID,
  checkId,
  checkIfItemFound,
} = require('../helpers.js');

const getExpenses = (req, res) => {
  const { userId, categories, from, to } = req.query;
  const expenses = getAllExpenses();

  if (userId || categories || from || to) {
    res.status(200).send(getFilteredExpenses(userId, categories, from, to));

    return;
  }

  if (!expenses) {
    res.status(200).send([]);

    return;
  }

  res.status(200).send(expenses);
};

const createExpense = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;
  const body = [...Object.values(req.body)];

  if (body.some((value) => value === undefined) || !isUserIdExists(userId)) {
    res.sendStatus(400);

    return;
  }

  const newExpense = {
    id: generateUniqueID(),
    userId: Number(userId),
    spentAt,
    title,
    amount: Number(amount),
    category,
    note,
  };

  addNewExpense(newExpense);

  res.status(201).send(newExpense);
};

const getExpense = (req, res) => {
  const { id } = req.params;

  checkId(res, id);

  const foundExpense = getExpenseById(id);

  checkIfItemFound(res, foundExpense);

  res.status(200).send(foundExpense);
};

const deleteExpense = (req, res) => {
  const { id } = req.params;

  checkId(res, id);

  const foundIndex = findIndexOfExpense(id);

  if (foundIndex === -1) {
    res.sendStatus(404);

    return;
  }

  removeExpense(foundIndex);

  res.sendStatus(204);
};

const modifyExpense = (req, res) => {
  const { id } = req.params;

  checkId(res, id);

  const foundExpense = getExpenseById(id);

  checkIfItemFound(res, foundExpense);

  patchExpense(req.body, id);

  res.status(200).send(foundExpense);
};

module.exports = {
  getExpenses,
  createExpense,
  getExpense,
  deleteExpense,
  modifyExpense,
};
