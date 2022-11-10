'use strict';

const { takeUsers } = require('./userControllers');

let {
  epxenses,
  expensesId,
} = require('../services/expensesServices');

const {
  existUser,
  expensByCategory,
  expensByDate,
  wantedExpense,
  changedExpenseIndex,
  deletedExpenseIndex,
} = require('../services/expensesServices');

function cleanExpensesArray() {
  epxenses = [];
};

const createExpense = (req, res) => {
  const { body: { userId } } = req;
  const users = takeUsers();

  if (existUser(users, userId)) {
    const newExpense = {
      id: ++expensesId,
      ...req.body,
    };

    epxenses.push(newExpense);

    res.status(201).json(newExpense);

    return;
  };

  res.sendStatus(400);
};

const getAllExpenses = (req, res) => {
  const { query: { category, from, to } } = req;

  if (category) {
    res.status(200).json(expensByCategory(epxenses, category));

    return;
  };

  if (from || to) {
    res.status(200).json(expensByDate(epxenses, from, to));

    return;
  };
  res.status(200).json(epxenses);
};

const getExpenseById = (req, res) => {
  const { params: { id } } = req;

  const searchExpense = wantedExpense(epxenses, id);

  if (!searchExpense) {
    res.sendStatus(404);
  };

  res.json(searchExpense);
};

const updateExpense = (req, res) => {
  const {
    params: { id },
    body: { title },
  } = req;
  const changedIndex = changedExpenseIndex(epxenses, id);

  if (changedIndex !== -1) {
    epxenses[changedIndex].title = title;
    res.status(200).json(epxenses[changedIndex]);

    return;
  };

  res.sendStatus(404);
};

const deleteExpense = (req, res) => {
  const {
    params: { id },
  } = req;
  const expenseIndex = deletedExpenseIndex(epxenses, id);

  if (expenseIndex !== -1) {
    epxenses.splice(expenseIndex, 1);
    res.sendStatus(204);

    return;
  };

  res.sendStatus(404);
};

module.exports = {
  cleanExpensesArray,
  createExpense,
  getAllExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
};
