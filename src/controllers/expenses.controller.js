'use strict';

const { getUserById } = require('../services/users.service');
const {
  addExpense,
  deleteExpense,
  getExpense,
  getExpenses,
  updateExpenseById,
} = require('../services/expenses.service');
const STATUS_CODES = require('../constants/statusCodes');

const getAllExpenses = (req, res) => {
  const { userId, from, to, categories } = req.query;
  let preparedExpenses = getExpenses();

  if (userId) {
    preparedExpenses = preparedExpenses
      .filter(expense => expense.userId === Number(userId));
  }

  if (from) {
    const fromDate = new Date(from);

    preparedExpenses = preparedExpenses.filter(expense =>
      new Date(expense.spentAt) > fromDate
    );
  }

  if (to) {
    const toDate = new Date(to);

    preparedExpenses = preparedExpenses.filter(expense =>
      new Date(expense.spentAt) < toDate
    );
  }

  if (categories) {
    const selectedCategories = Array.isArray(categories)
      ? categories
      : [categories];

    preparedExpenses = preparedExpenses.filter((expense) => {
      return selectedCategories.includes(expense.category);
    });
  }

  res.send(preparedExpenses);
};

const getExpenseById = (req, res) => {
  const { id } = req.params;

  const foundExpense = getExpense(id);

  if (!foundExpense) {
    res.sendStatus(STATUS_CODES.NOT_FOUND);

    return;
  }

  res.send(foundExpense);
};

const createExpense = (req, res) => {
  const foundUser = getUserById(req.body.userId);

  if (req.body.userId && !foundUser) {
    res.sendStatus(STATUS_CODES.BAD_REQUEST);

    return;
  }

  if (!req.body.title) {
    res.sendStatus(STATUS_CODES.BAD_REQUEST);

    return;
  }

  const newExpense = addExpense({
    ...req.body,
  });

  res.statusCode = STATUS_CODES.CREATED;

  res.send(newExpense);
};

const removeExpense = (req, res) => {
  const { id } = req.params;
  const foundExpense = getExpense(id);

  if (!foundExpense) {
    res.sendStatus(STATUS_CODES.NOT_FOUND);

    return;
  }

  deleteExpense(id);
  res.sendStatus(STATUS_CODES.NO_CONTENT);
};

const updateExpense = (req, res) => {
  const { id } = req.params;
  const expense = getExpense(id);

  if (!expense) {
    res.sendStatus(STATUS_CODES.NOT_FOUND);

    return;
  }

  const { body } = req;

  updateExpenseById(id, body);

  res.send(expense);
};

module.exports = {
  getAllExpenses,
  getExpenseById,
  createExpense,
  removeExpense,
  updateExpense,
};
